import axios from "axios";
export default function callApi(method, url, data,params, token) {
  return axios({
    method: method,
    url: url,
    data: data,
    params:params,
    headers: {
      'x-access-token':token,
    },
  }).catch(err=>{
    console.log(err);
  });
}
