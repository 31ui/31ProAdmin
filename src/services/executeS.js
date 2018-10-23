import request from '../utils/request';
import apiConfig from './apiConfig';

const { apix } = apiConfig;
/**
 * api String
 * url String
 * params obj
 */

async function executeS(params) {
  const reqconfig = apix[params.apixkey];

  if (reqconfig) {
    const data = params.query || {};
    const newUrl = params.url ? `${reqconfig.url}${params.url}` : reqconfig.url;
    switch (reqconfig.method.toLowerCase()) {
      case 'post' || 'put' || 'delete':
        return request(newUrl, {
          method: reqconfig.method,
          body: data,
        });
      default:
        return request(newUrl);
    }
  } else {
    const error = new Error(`没有找到[${params.apixkey}]下的对应请求配置`);
    throw error;
  }
}

export default executeS;