import { axiosInstance } from '@/config/axiosConfig';
import { sendStatement } from '@/utils/xapi';
import { statementsUrl } from '@/config/endpoints.js';

jest.mock('@/config/axiosConfig', () => ({
  axiosInstance: {
    post: jest.fn(() => Promise.resolve({ data: 'mocked response' })),
  },
}));
describe('sendStatement', () => {
  const originalWindowLocation = window.location;

  beforeAll(() => {
    // Mock window.location
    delete window.location;
    window.location = { href: 'https://example.com' };
  });

  afterAll(() => {
    // Restore window.location
    window.location = originalWindowLocation;
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call console.error if verb is missing', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    await sendStatement({});
    expect(consoleSpy).toHaveBeenCalledWith('no verb object');
  });

  it('should call console.error if object is missing', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    await sendStatement({
      actor: { first_name: 'Jane', last_name: 'Doe' },
      verb: {
        id: 'http://adlnet.gov/expapi/verbs/attempted',
        display: 'attempted',
      },
    });
    expect(consoleSpy).toHaveBeenCalledWith('no object object');
  });

  it('should call console.error if resultExtName is missing', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    await sendStatement({
      actor: { first_name: 'Jane', last_name: 'Doe' },
      verb: {
        id: 'http://adlnet.gov/expapi/verbs/attempted',
        display: 'attempted',
      },
      object: { definitionName: 'Test Content' },
    });
    expect(consoleSpy).toHaveBeenCalledWith('no resultExtName');
  });

  it('should call console.error if resultExtValue is missing', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    await sendStatement({
      actor: { first_name: 'Jane', last_name: 'Doe' },
      verb: {
        id: 'http://adlnet.gov/expapi/verbs/attempted',
        display: 'attempted',
      },
      object: { definitionName: 'Test Content' },
      resultExtName: 'score',
    });
    expect(consoleSpy).toHaveBeenCalledWith('no resultExtValue');
  });

  it('should default object.id to window.location.href if none is provided', async () => {
    await sendStatement({
      actor: { first_name: 'John', last_name: 'Doe' },
      verb: { id: 'http://adlnet.gov/expapi/verbs/viewed', display: 'viewed' },
      object: { definitionName: 'Test Content' },
      resultExtName: 'score',
      resultExtValue: '100',
    });

    expect(axiosInstance.post).toHaveBeenCalledTimes(1);

    const [[url, payload]] = axiosInstance.post.mock.calls;
    expect(url).toBe(statementsUrl);
    expect(payload).toHaveLength(1);

    const statement = payload[0];
    expect(statement.object.id).toBe('https://example.com');
  });

  it('should create and forward a statement with the correct structure', async () => {
    await sendStatement({
      actor: { first_name: 'John', last_name: 'Doe' },
      verb: {
        id: 'http://adlnet.gov/expapi/verbs/launched',
        display: 'launched',
      },
      object: {
        id: 'https://mysite.com/content/123',
        definitionName: 'My Content',
        description: 'This is a test content',
      },
      resultExtName: 'someKey',
      resultExtValue: 'someValue',
    });

    expect(axiosInstance.post).toHaveBeenCalledTimes(1);

    const [[url, payload]] = axiosInstance.post.mock.calls;

    // Check URL
    expect(url).toBe(statementsUrl);

    // The payload to the LRS is an array with 1 statement
    expect(Array.isArray(payload)).toBe(true);
    expect(payload).toHaveLength(1);

    const statement = payload[0];

    // Basic statement structure checks
    expect(statement).toHaveProperty('actor');
    expect(statement).toHaveProperty('verb');
    expect(statement).toHaveProperty('object');
    expect(statement).toHaveProperty('context');
    expect(statement).toHaveProperty('timestamp');

    // Check actor structure
    expect(statement.actor.account.homePage).toBe('https://ecc.gov');
    expect(statement.actor.account.name).toBe('ECC User');
    expect(statement.actor.objectType).toBe('Agent');

    // Check verb structure
    expect(statement.verb.id).toBe('http://adlnet.gov/expapi/verbs/launched');
    expect(statement.verb.display['en-US']).toBe('launched');

    // Check object structure
    expect(statement.object.id).toBe('https://mysite.com/content/123');
    expect(statement.object.definition.name['en-US']).toBe('My Content');
    expect(statement.object.definition.description['en-US']).toBe(
      'This is a test content'
    );
    expect(statement.object.objectType).toBe('Activity');

    // Check result
    expect(statement.result.extensions.someKey).toBe('someValue');
  });
});
