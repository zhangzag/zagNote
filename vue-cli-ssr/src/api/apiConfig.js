import axios from 'axios'
import Qs from 'qs';

let _req = axios.create({
	baseURL: 'http://113.108.163.210:9999/AKGW-api/v1',
	method: 'post',
	timeout: 20000,
	// headers: {'Content-Type': 'application/x-www-form-urlencoded'},
	headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
	transformRequest: [function (data) {
		data = Qs.stringify(data)
		return data
	}],
	withCredentials: true,
	// proxy: {
	//     host: '127.0.0.1',
	//     port: 9000,
	//     auth: : {
	//       username: 'mikeymike',
	//       password: 'rapunz3l'
	//     }
 //  	},
  	// '/api/': { target: 'http://192.168.2.254:8080/AKGW-api/v1', pathRewrite: {'^/api/': ''} }
});


export default _req;