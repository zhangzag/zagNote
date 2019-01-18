import _req from './apiConfig.js';

export function pro(){
	return new Promise((resolve, reject)=>{
		_req({
		  url: '/product/getProductList',
		  data: {
			page: 1,
			limit: 10,
		  }
		})
		.then(res=>{
			resolve(res)
		})
		.catch(err=>{
			reject(err)
		})
	});
}