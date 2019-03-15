/*
* @Author: Venus-Lin
* @Date:   2018-10-12 23:32:08
* @Last Modified by:   Venus-Lin
* @Last Modified time: 2018-10-17 16:30:55
*/
import config from './config'

export function get(url,data){
	return request(url,'GET',data)
}

export function post(url,data){
	return request(url,'POST',data)
}


function request(url,method,data){
	return new Promise((resolve,reject)=>{
		wx.request({
			data,
			method,
			header: {'content-type': 'application/x-www-form-urlencoded'},
			url:config.host+url,
			success:function(res){
				if(res.data.code === 0){
					resolve(res.data)
				}
				else{
					reject(res.data)
				}
			}
		})

	})
}