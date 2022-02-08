import { sendStatement } from "@/utils/xapi/xAPIWrapper";
import xAPIMapper from "@/utils/xapi/xAPIMapper";

describe('xAPI', () => {
  it('should send xAPI Statement to LRS with proper arguments', () => {

    const spy = jest.spyOn(xAPIMapper, 'sendStatement')
      .mockImplementation(() => Promise.resolve({})
      );

    const actorObj = {
      first_name: "John",
      last_name: "Doe",
      email: "john.doe@email.com"
    }
    const verbObj = {
      id: "http://example.com/verbs/tested",
      display: "tested"
    }
    
    const objectId = "http://example.com/objectId"

    return sendStatement(actorObj, verbObj, objectId).then(() => {
      //Get the args passed to sendStatement
      const args = spy.mock.calls[0][0];
      const { actor, verb, object } = args.statement;

      expect(spy).toHaveBeenCalled();
      expect(actor.name).toBe('John Doe');
      expect(actor.mbox).toBe('mailto:john.doe@email.com');
      expect(verb.id).toBe('http://example.com/verbs/tested');
      expect(object.id).toBe('http://example.com/objectId');
    });
  })
})
