import * as Xapi from '@/utils/xapi';

export function mockSendStatement() {
  if (Xapi.sendStatement.mockRestore) {
    Xapi.sendStatement.mockRestore();
  }
  jest
    .spyOn(Xapi, 'sendStatement')
    .mockImplementation(() => Promise.resolve({}));
}
