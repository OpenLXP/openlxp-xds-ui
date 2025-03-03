import * as Xapi from '@/utils/xapi';

export function mockSendStatement() {
  jest
    .spyOn(Xapi, 'sendStatement')
    .mockImplementation(() => Promise.resolve({}));
}
