import * as Xapi from '@/utils/xapi';
import * as XapiEvents from '@/utils/xapi/events';

function keepFreshAndMock(nsObj, mockedFnName, mockImpl) {
  if (nsObj[mockedFnName].mockRestore) {
    nsObj[mockedFnName].mockRestore();
  }
  jest.spyOn(nsObj, mockedFnName).mockImplementation(mockImpl);
}

export function mockSendStatement() {
  keepFreshAndMock(Xapi, 'sendStatement', () => Promise.resolve({}));
}

export function mockXapiEvents() {
  keepFreshAndMock(XapiEvents, 'searched', jest.fn());
  keepFreshAndMock(XapiEvents, 'saved', jest.fn());
  keepFreshAndMock(XapiEvents, 'curated', jest.fn());
  keepFreshAndMock(XapiEvents, 'shared', jest.fn());
  keepFreshAndMock(XapiEvents, 'explored', jest.fn());
  keepFreshAndMock(XapiEvents, 'viewed', jest.fn());
}
