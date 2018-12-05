// 验证


/**
 *验证手机号码
 *
 * @export
 * @param {*} data
 * @returns
 */
export function verifyPhone(data){
    const reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/;

    return reg.test(data);
}


/**
 *验证 - 密码 (请输入6~20个英文字母、数字或符号（除空格）)
 *
 * @export
 * @param {*} data
 * @returns
 */
export function verifyPwd ( data ){
	const reg = /^[0-9A-Za-z!#$%^&*]{6,20}$/;

	return reg.test(data);
}