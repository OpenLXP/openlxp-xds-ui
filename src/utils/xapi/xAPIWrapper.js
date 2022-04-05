<<<<<<< HEAD
import xAPIMapper from "./xAPIMapper";

/**
 * @description takes in an actor (user), verb, object
 * @param object
 * @param object
 * @param object
 * @returns {Promise}
 */
export const sendStatement = (actor, verb, objectId) => {

  const statement =  {
    actor: {
      name: `${actor.first_name} ${actor.last_name}`,
      mbox: `mailto:${actor.email}`
    },
    verb: {
      id: `http://example.com/verbs/${verb.display}`,
      display: {
          "en-GB": verb.display
      }
    },
    object: {
      id: objectId
    }
  }

  return xAPIMapper.sendStatement({statement});
}
=======
import xAPIMapper from "./xAPIMapper";

/**
 * @description takes in an actor (user), verb, object
 * @param object
 * @param object
 * @param object
 * @param string
 * @param string
 * @returns {Promise}
 */

export const sendStatement = (actor, verb, obj, resultExtName, resultExtValue) => {

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
      id: obj.id,
      definition: {
        name: {
          "en-US": obj.definitionName
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

  obj.description && (statement['object']['definition']['description'] = {
    "en-US": obj.description
  })

  return xAPIMapper.sendStatement({ statement });
}
>>>>>>> 2eec44bdb58fe8e42955ef22f25b5a308bdb9985
