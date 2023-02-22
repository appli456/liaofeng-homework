import axios, { AxiosRequestConfig } from "axios";

class NetworkProvider {
  static baseUrl = 'https://api.github.com/search/repositories?q=stars:%3E1&sort=stars&order=desc&type=Repositories';
  request(config?: AxiosRequestConfig) {
    return axios.request({
      url: NetworkProvider.baseUrl,
      method: 'GET',
      responseType: 'json',
      ...config,
    });
  }
}

const networkProvider = new NetworkProvider();
export default networkProvider;
export { NetworkProvider };
