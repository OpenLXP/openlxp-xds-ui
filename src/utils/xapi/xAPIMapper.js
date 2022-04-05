<<<<<<< HEAD
import { endpoint, key, secret } from '@/config/xAPIConfig';
import XAPI from "@xapi/xapi";

let xapiInstance = null;

class XAPIMapper {

  constructor() {
    const auth = XAPI.toBasicAuth(key, secret);

    if (!xapiInstance) { xapiInstance = this; }
    if (endpoint) {
      this.xapiInstance = new XAPI({
        endpoint: endpoint,
        auth: auth
      });
    }

    return xapiInstance;
  }

  sendStatement = ({ statement }) => {
    return this.xapiInstance?.sendStatement({ statement }).catch((err) => console.error(err));
  }
}

export default (new XAPIMapper);
=======
import { endpoint, key, secret } from '@/config/xAPIConfig';
import XAPI from "@xapi/xapi";

let xapiInstance = null;

class XAPIMapper {

  constructor() {
    const auth = XAPI.toBasicAuth(key, secret);

    if (!xapiInstance) { xapiInstance = this; }
    if (endpoint) {
      this.xapiInstance = new XAPI({
        endpoint: endpoint,
        auth: auth
      });
    }

    return xapiInstance;
  }

  sendStatement = ({ statement }) => {
    return this.xapiInstance?.sendStatement({ statement }).catch((err) => console.error(err));
  }
}

export default (new XAPIMapper);
>>>>>>> 2eec44bdb58fe8e42955ef22f25b5a308bdb9985
