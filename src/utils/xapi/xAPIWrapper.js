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
      id: verb.id,
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
