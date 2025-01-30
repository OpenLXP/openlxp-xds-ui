import { axiosInstance } from '../config/axiosConfig.js';
import { statementsUrl } from '../config/endpoints.js';

// Send statement to the LRS Forwarding Endpoint
const forwardStatement = ({ statement }) => {
  return axiosInstance
    .post(statementsUrl, [statement])
    .catch((err) => console.error(err));
};

// Create a real, valid statement.
const prepareStatement = (actor, verb, obj, resultExtName, resultExtValue) => {
  const statement = {
    context: {
      platform: 'ECC dev env',
    },
    actor: {
      account: {
        homePage: 'https://ecc.gov',
        name: `${actor.first_name} ${actor.last_name}`,
      },
      objectType: 'Agent',
    },
    verb: {
      id: verb.id,
      display: {
        'en-US': verb.display,
      },
    },
    object: {
      id: obj.id,
      definition: {
        name: {
          'en-US': obj.definitionName,
        },
      },
      objectType: 'Activity',
    },
    result: {
      extensions: {
        [resultExtName]: resultExtValue,
      },
    },
    timestamp: new Date().toISOString(),
  };

  obj.description &&
    (statement['object']['definition']['description'] = {
      'en-US': obj.description,
    });
  return statement;
};

/**
 * Sends a statement to the LRS based on the context provided.
 * @param {{
 * actor:{first_name:string, last_name:string},
 * verb:{id:string, display:string},
 * object:{id?:string, definitionName:string, description?:string},
 * resultExtName:string,
 * resultExtValue:string,
 * }} context
 * @returns {Promise}
 */

export function sendStatement(context) {
  // verify there is a user object
  if (!context.actor) return console.error('no user object');

  // verify the required fields are present
  if (!context.verb) return console.error('no verb object');

  if (!context.object) return console.error('no object object');

  if (!context.resultExtName) return console.error('no resultExtName');

  if (!context.resultExtValue) return console.error('no resultExtValue');

  // get the window
  const windowLocation = window.location.href;

  // if the object has an id, use it otherwise populate it with the window location
  if (!context.object?.id) context.object.id = windowLocation;

  const statement = prepareStatement(
    context.actor,
    context.verb,
    context.object,
    context.resultExtName,
    context.resultExtValue
  );

  return forwardStatement({ statement });
}
