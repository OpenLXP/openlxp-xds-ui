import xAPIMapper from "./xAPIMapper";

/**
 * @description takes in an actor (user), verb, object
 * @param object
 * @param object
 * @param object
 * @returns {Promise}
 */
export const sendStatement = (actor, verb, objectId, objectDefName) => {

  const statement = {
    actor: {
      account: {
        homePage: "http://ecc.gov",
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
        "https://w3id.org/xapi/ecc/result/extensions/searchTerm": "data"
      }
    },
    timestamp: "2022-02-09T19:55:14.140Z"
  }

  return xAPIMapper.sendStatement({ statement });
}
