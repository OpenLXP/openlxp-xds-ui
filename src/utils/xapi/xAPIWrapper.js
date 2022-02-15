import xAPIMapper from "./xAPIMapper";

/**
 * @description takes in an actor (user), verb, object
 * @param object
 * @param object
 * @param string
 * @param string
 * @param string
 * @param string
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
    timestamp: new Date().toUTCString()
  }

  return xAPIMapper.sendStatement({ statement });
}
