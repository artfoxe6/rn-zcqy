

/**
 * 检查登陆状态
 */
function checkLoginStatus() {

}
/**
 *  登陆服务器
 */
function loginServer() {
    alert("21dwqdwqd");
}

/**
 * 注册帐号
 */
function register() {

}
/**
 * 检查ajax返回的数据
 * @param  {[type]} jdata [description]
 * @return {[type]}       [description]
 */
function i_error(jdata) {
	if( jdata ){
		if( jdata.substr(0,3) == '400' ) {
			return false;
		}else{
			return true;
		}
	}
	
}
export {loginServer,i_error} ;