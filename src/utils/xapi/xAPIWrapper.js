import xAPIMapper from "./xAPIMapper";

/**
 * @description takes in an actor (user), verb, object
 * @param object
 * @param object
 * @param object
 * @returns {Promise}
 */
export const sendStatement = (actor, verb, object) => {

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
      id: object.id
    }
  }

  return xAPIMapper.sendStatement({statement})
}
