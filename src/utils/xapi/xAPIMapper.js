import { axiosInstance } from '../../config/axiosConfig.js';
import { statementsUrl } from '../../config/endpoints';

class XAPIMapper {
  sendStatement = ({ statement }) => {
    return axiosInstance
      .post(statementsUrl, [statement])
      .catch((err) => console.error(err));
  };
}

export default new XAPIMapper();
