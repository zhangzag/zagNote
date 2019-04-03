import qs from "qs";
import sha256 from 'sha-256-js';

// export default function({ $axios, redirect, $store }) {
export default function({ $axios, redirect, store }) {
  // console.log(322, store.state)
  $axios.onRequest(config => {
    config.data = qs.stringify(config.data, {
      allowDots: true //Option allowDots can be used to enable dot notation
    });
    return config;
  });
 
  $axios.onResponse(response => {
    return Promise.resolve(response.data);
  });
 
  $axios.onError(error => {
    return Promise.reject(error);
  });
  
  // http request 拦截器
	$axios.interceptors.request.use(
    config => {
        if (store.state.userModule.memberIdData) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers.Authorization = sha256(store.state.userModule.memberIdData + 'akjk');
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
  );
}