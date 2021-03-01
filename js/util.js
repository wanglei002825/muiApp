/**
 * 通用方法
 */
UtilJs = {

	//页面显示动画
	choiceAniShow: function() {
		var aniShow = "pop-in";
		//只有ios支持的功能需要在Android平台隐藏；
		if(mui.os.android) {
			var list = document.querySelectorAll('.ios-only');
			if(list) {
				for(var i = 0; i < list.length; i++) {
					list[i].style.display = 'none';
				}
			}
			//Android平台暂时使用slide-in-right动画
			if(parseFloat(mui.os.version) < 4.4) {
				aniShow = "slide-in-right";
			}
		}
		return aniShow;
	},
	/**
	 * 等待层对象
	 */
	loadObj: null,

	/**
	 * 打开等待层
	 */
	openLoad: function(message) {
			if(message == '' || message == null || typeof(message) == "undefined") {
				UtilJs.loadObj = plus.nativeUI.showWaiting("加载中，请等待...");
			} else {
				UtilJs.loadObj = plus.nativeUI.showWaiting(message);
			}
	},
	/**
	 * 关闭等待层
	 */
	closeLoad: function() {
		if(UtilJs.loadObj!=null){
			UtilJs.loadObj.close();
		}
	},
	/**
	 * 可自动关闭的提示语
	 */
	messageAutoShutdownAlert: function(message) {
		if('' != message && null != message && typeof(message) != "undefined") {
			plus.nativeUI.toast("您上传的不是图片，请重新添加照片");
		}
	},
	/**
	 * 创建用户缓存
	 */
	createState: function(loginInfo, callback) {
		var state = UtilJs.getState();
		state.loginName = loginInfo.loginName;
		state.password = loginInfo.password;
		state.sessionid = loginInfo.sessionid;
		state.id = loginInfo.id;
		state.name = loginInfo.name;
		UtilJs.setState(state);
		return callback();
	},

	/**
	 * 获取当前状态
	 **/
	getState: function() {
		var stateText = localStorage.getItem('$state') || "{}";
		return JSON.parse(stateText);
	},

	/**
	 * 设置当前状态
	 **/
	setState: function(state) {
		state = state || {};
		localStorage.setItem('$state', JSON.stringify(state));
		//var settings = owner.getSettings();
		//settings.gestures = '';
		//owner.setSettings(settings);
	},

	/**
	 * 获取应用本地配置
	 **/
	setSettings: function(settings) {
		settings = settings || {};
		localStorage.setItem('$settings', JSON.stringify(settings));
	},
	/*
	 * 设置应用本地配置
	 **/
	getSettings: function() {
		var settingsText = localStorage.getItem('$settings') || "{}";
		return JSON.parse(settingsText);
	},

	/**
	 * 错误处理
	 */
	handleAjaxError: function(apiName, type) {
		console.log(apiName + type);
		if(type == "timeout") {
			return plus.nativeUI.toast(apiName + "连接超时，请查看网络");
		} else {
			return plus.nativeUI.toast(apiName + "异常:" + type);
		}
	}
};
/**
 * 公用下拉菜单
 */
SelectUtilJs = {
	/**
	 * 地区选择监听 (areaCodeTagId:元素DOM ID)
	 */
	citySelectMonitor: function(areaCodeTagId) {
		//级联示例
		var cityPicker = new mui.PopPicker({
			layer: 2
		});
		//获取江苏省的地区信息
		var jangSuCityData = new Array();;
		for(var i = 0; i < cityData3.length; i++) {
			if(cityData3[i].value == '320000') {
				jangSuCityData = (cityData3[i].children);
			}
		}
		cityPicker.setData(jangSuCityData);
		var areaCodeInput = document.getElementById(areaCodeTagId);
		var areaCodeShowInput = document.getElementById(areaCodeTagId+'Show');
		areaCodeShowInput.addEventListener('tap', function(event) {
			cityPicker.show(function(items) {
				areaCodeShowInput.value = items[0].text + " " + items[1].text;
				areaCodeInput.value = items[1].value;
				//返回 false 可以阻止选择框的关闭
				//return false;
			});
		}, false);
	},
	/**
	 * 	时间选择监听
	 *  (timeSelectId:元素DOM ID)
	 */
	timeSelectMonitor: function(timeSelectId) {
		document.getElementById(timeSelectId).addEventListener('tap', function() {
			var optionsJson = this.getAttribute('data-options') || '{}';
			var options = JSON.parse(optionsJson);
			var id = this.getAttribute('id');
			/*
			 * 首次显示时实例化组件
			 * 示例为了简洁，将 options 放在了按钮的 dom 上
			 * 也可以直接通过代码声明 optinos 用于实例化 DtPicker
			 */
			var picker = new mui.DtPicker(options);
			picker.show(function(rs) {
				/*
				 * rs.value 拼合后的 value
				 * rs.text 拼合后的 text
				 * rs.y 年，可以通过 rs.y.vaue 和 rs.y.text 获取值和文本
				 * rs.m 月，用法同年
				 * rs.d 日，用法同年
				 * rs.h 时，用法同年
				 * rs.i 分（minutes 的第二个字母），用法同年
				 */
				document.getElementById(timeSelectId).value = rs.text;
				/* 
				 * 返回 false 可以阻止选择框的关闭
				 * return false;
				 */
				/*
				 * 释放组件资源，释放后将将不能再操作组件
				 * 通常情况下，不需要示放组件，new DtPicker(options) 后，可以一直使用。
				 * 当前示例，因为内容较多，如不进行资原释放，在某些设备上会较慢。
				 * 所以每次用完便立即调用 dispose 进行释放，下次用时再创建新实例。
				 */
				picker.dispose();
			});
		}, false);
	}
};
/**
 * 图片公用方法
 */
ImgUtilJs = {

	/**
	 * 图片转canvas压缩
	 */
	compress: function(source_img_obj, quality, output_format) {
		var mime_type = "image/jpeg";
		if(output_format != undefined && output_format == "png") {
			mime_type = "image/png";
		}
		var cvs = document.createElement('canvas');
		//naturalWidth真实图片的宽度
		cvs.width = source_img_obj.naturalWidth;
		cvs.height = source_img_obj.naturalHeight;
		var ctx = cvs.getContext("2d").drawImage(source_img_obj, 0, 0);
		var newImageData = cvs.toDataURL(mime_type, quality / 100);
		var result_image_obj = new Image();
		result_image_obj.src = newImageData;
		return result_image_obj;
	},

	/**
	 * dataURL转换为Blob对象
	 */
	dataURLtoBlob: function(dataurl) {
		var arr = dataurl.split(','),
			mime = arr[0].match(/:(.*?);/)[1],
			bstr = atob(arr[1]),
			n = bstr.length,
			u8arr = new Uint8Array(n);
		while(n--) {
			u8arr[n] = bstr.charCodeAt(n);
		}
		return new Blob([u8arr], {
			type: mime
		});
	},

	/**
	 * 将以base64的图片url数据转换为Blob
	 * @param urlData
	 *            用url方式表示的base64图片数据
	 */
	convertBase64UrlToBlob: function(urlData) {

		var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte

		//处理异常,将ascii码小于0的转换为大于0
		var ab = new ArrayBuffer(bytes.length);
		var ia = new Uint8Array(ab);
		for(var i = 0; i < bytes.length; i++) {
			ia[i] = bytes.charCodeAt(i);
		}

		return new Blob([ab], {
			type: 'image/png'
		});
	}

};

/**
 * Ajax 请求封装
 */
AjaxUtilJs = {
	sendHttpRequestOfData: function(data, api, callbackFun) {
		data['mobileLogin'] = true;
		mui.ajax({
			type: api.type,
			//url: Config.serverUrl + 'a/' + api.url + '?__ajax=true',
			url: Config.serverUrl + api.url,
			async: true,
			data: data,
			dataType: "jsonp",
			jsonp: "jsoncallback", 
			timeout: 15000,
			success: function(data) {
				var reg = /<[^>]+>/g;
				if(reg.test(data)) {
				  console.log('data----',data);
				  console.log('dataeval----',eval('(' + data + ')'));
				} else { 
					callbackFun(eval('(' + data + ')'));
				}
			},
			error: function(xhr, type, errorThrown) {
				UtilJs.closeLoad();
				UtilJs.handleAjaxError(api.name, type);
			}
		});
	}
};

DateUtilJs = {
	/* 	对Date的扩展，将 Date 转化为指定格式的String
 		月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
 		年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
 		例子：
 		DateUtilJs.Format(new Date(),"yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
 		DateUtilJs.Format(new Date(),"yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18*/
	Format: function(dateObj, fmt) {
		// author: meizz
		var o = {
			"M+": dateObj.getMonth() + 1, // 月份
			"d+": dateObj.getDate(), // 日
			"h+": dateObj.getHours(), // 小时
			"m+": dateObj.getMinutes(), // 分
			"s+": dateObj.getSeconds(), // 秒
			"q+": Math.floor((dateObj.getMonth() + 3) / 3), // 季度
			"S": dateObj.getMilliseconds()
				// 毫秒
		};
		if(/(y+)/.test(fmt))
			fmt = fmt.replace(RegExp.$1, (dateObj.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(fmt))
				fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
		return fmt;

	}

};

GuanzCommon = {
	AddToGuanz : function(eventDetail,guanzlx){
		mui.ajax({
			type: "post",
			url: app.config() + 'addToGuanz',
			async: true,
			data: {
				guanlid:eventDetail,
				guanzlx:guanzlx, //关注类型：1、突发事件，2、路网预警，3、重点路段
				userCode:plus.storage.getItem('userCode'),
				userName:plus.storage.getItem('userName')
			},
			dataType: "jsonp",
			jsonp: "jsoncallback",
			timeout: 20000,
			success: function(data) {
				var data = JSON.parse(data);
				if(data == '1'){
					$("#" + eventDetail + " svg use").attr("xlink:href", "#icon-aixin1");
					mui.toast("添加关注成功，请在重点关注查看!");
				} else if(data == '0'){
					mui.toast("您已添加关注，请在重点关注查看!");
				}
			},
			error: function(xhr, type, errorThrown) {
				
			}
		});
	},
	
	removeGuanz : function(eventDetail,guanzlx){
		mui.ajax({
			type: "post",
			url: app.config() + 'removeGuanz',
			async: true,
			data: {
				guanlid:eventDetail,
				guanzlx:guanzlx, //关注类型：1、突发事件，2、路网预警，3、重点路段
				userCode:plus.storage.getItem('userCode'),
				userName:plus.storage.getItem('userName')
			},
			dataType: "jsonp",
			jsonp: "jsoncallback",
			timeout: 20000,
			success: function(data) {
				var data = JSON.parse(data);
				if(data == '1'){
					$("#" + eventDetail + " svg use").attr("xlink:href", "#icon-aixin");
					mui.toast("取消关注成功");
				} else if(data == '0'){
					mui.toast("取消关注失败，请重新取消关注");
				}
			},
			error: function(xhr, type, errorThrown) {
				
			}
		});
	},
	
}