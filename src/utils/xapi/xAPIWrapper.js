import xAPIMapper from "./xAPIMapper";
import moment from 'moment';
/**
 * @description takes in an actor (user), verb, object
 * @param object
 * @param object
 * @param object
 * @returns {Promise}
 */
export const sendStatement = (actor, verb, objectId, objectDefName, resultExtName, resultExtValue) => {

  const statement = {
    actor: {
      account: {
        homePage: "https://ecc.gov",
        name: `${actor.first_name} ${actor.last_name}`,
      },
      objectType: "Agent"
    },
    verb: {
      id: verb.id,
      display: {
        "en-US": verb.display
      }
    },
    object: {
      id: objectId,
      definition: {
        name: {
          "en-US": objectDefName
        }
      },
      objectType: "Activity"
    },
    result: {
      extensions: {
        [resultExtName]: resultExtValue
      }
    },
    timestamp: moment.utc()
  }

  return xAPIMapper.sendStatement({ statement });
}
