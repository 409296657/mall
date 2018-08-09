<!-- 公共方法 -->
<script type="text/javascript">
const util = {
	setCookie: function (name, value, days) { //存储cookie
		let d = new Date;
		let ds = ds ? ds : 0.5;
		let vs = value;
		d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * ds);
		if (typeof value == 'object') vs = JSON.stringify(value)
		window.document.cookie = name + "=" + vs + ";path=/;expires=" + d.toGMTString();
	},

	getCookie: function(name){ //获取cookie
		let v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
		let vs = v ? v[2] : null;
		if(typeof vs == 'string'){
			try {
				let obj = JSON.parse(vs);
				if (typeof obj == 'object' && obj) {
					return obj;
				}else {
					return vs;
				}
			}catch(e){
				return vs;
			}
		}
	},

	deleteCookie:function(name) { //清除cookie
		this.setCookie(name, '', -1);
	},

	isvalidPhone:function(str) {//验证手机号码是否正确
	  const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
	  return reg.test(str)
	},

	

}

export default util;
</script>
