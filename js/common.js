
// HashMap对象
function HashMap()
{
	// 定义长度
	var length = 0;
	// 创建一个对象
	var obj = new Object();

	/**
	 * 判断Map是否为空
	 */
	this.isEmpty = function()
	{
		return length == 0;
	};

	/**
	 * 判断对象中是否包含给定Key
	 */
	this.containsKey = function(key)
	{
		return (key in obj);
	};

	/**
	 * 判断对象中是否包含给定的Value
	 */
	this.containsValue = function(value)
	{
		for ( var key in obj)
		{
			if (obj[key] == value)
			{
				return true;
			}
		}
		return false;
	};

	/**
	 * 向map中添加数据
	 */
	this.put = function(key, value)
	{
		if (!this.containsKey(key))
		{
			length++;
		}
		obj[key] = value;
	};

	/**
	 * 根据给定的Key获得Value
	 */
	this.get = function(key)
	{
		return this.containsKey(key) ? obj[key] : null;
	};

	/**
	 * 根据给定的Key删除一个值
	 */
	this.remove = function(key)
	{
		if (this.containsKey(key) && (delete obj[key]))
		{
			length--;
		}
	};

	/**
	 * 获得Map中的所有Value
	 */
	this.values = function()
	{
		var _values = new Array();
		for ( var key in obj)
		{
			_values.push(obj[key]);
		}
		return _values;
	};

	/**
	 * 获得Map中的所有Key
	 */
	this.keySet = function()
	{
		var _keys = new Array();
		for ( var key in obj)
		{
			_keys.push(key);
		}
		return _keys;
	};

	/**
	 * 获得Map的长度
	 */
	this.size = function()
	{
		return length;
	};

	/**
	 * 清空Map
	 */
	this.clear = function()
	{
		length = 0;
		obj = new Object();
	};
};


// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S") ==> 2006-7-2 8:9:4.18
Date.prototype.Format = function(fmt)
{ // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for ( var k in o)
		if (new RegExp("(" + k + ")").test(fmt))
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
};

Date.prototype.addDays = function(d)
{
    this.setDate(this.getDate() + d);
    return this;
};
Date.prototype.cutDays = function(d)
{
    this.setDate(this.getDate() - d);
    return this;
};
Date.prototype.cutHours = function(h)
{
    this.setHours(this.getHours() - h);
    return this;
};
Date.prototype.addWeeks = function(w)
{
    this.addDays(w * 7);
    return this;
};

Date.prototype.addMonths= function(m)
{
    var d = this.getDate();
    this.setMonth(this.getMonth() + m);
    if (this.getDate() < d)
        this.setDate(0);
    return this;
};

Date.prototype.addYears = function(y)
{
    var m = this.getMonth();
    this.setFullYear(this.getFullYear() + y);
    return this;
};

String.prototype.format = function(args) {
	var result = this;
    if (arguments.length > 0) {    
        if (arguments.length == 1 && typeof (args) == "object") {
            for (var key in args) {
                if(args[key]!=undefined){
                    var reg = new RegExp("({" + key + "})", "g");
                    result = result.replace(reg, args[key]);
                }
            }
        }
        else {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] != undefined) {
                    var reg = new RegExp("({[" + i + "]})", "g");
                    result = result.replace(reg, arguments[i]);
                }
            }
        }
    }
    return result;
};


//数组函数
Array.prototype.OrderByAsc = function (func) {
    var m = {};
    for (var i = 0; i < this.length; i++) {
        for (var k = 0; k < this.length; k++) {
            if (func(this[i]) < func(this[k])) {
                m = this[k];
                this[k] = this[i];
                this[i] = m;
            }
        }
    }
    return this;
};

Array.prototype.OrderByDesc = function (func) {
    var m = {};
    for (var i = 0; i < this.length; i++) {
        for (var k = 0; k < this.length; k++) {
            if (func(this[i]) > func(this[k])) {
                m = this[k];
                this[k] = this[i];
                this[i] = m;
            }
        }
    }
    return this;
};

Array.prototype.Contains = function (item) {
	for (var i = 0; i < this.length; i++)
	{
		if(this[i] == item)return true;
	}
	return false;
};
//字符串函数 
String.prototype.replaceAll  = function(s1,s2){
	return this.replace(new RegExp(s1,"gm"),s2);
};
Views = new HashMap();
View = function(name){
	if(Views.get(name) == null)
	{
		Views.put(name,{});
	}
	return Views.get(name);
};
//扩展jquery ajax方法
;(function($){
	if(!$.request)$.request = {};
	$.request.post = function(o){
		var defaults = {
			url : 'about:blank',
			params : '',
			before:undefined,
			success : undefined
		};
		var option = $.extend(defaults, o);
		$.ajax({
			type : "POST",
			url : option.url,
			data : option.params,
			headers:{
		        "sessionId":$.cookie('sessionId')
		    },
			dataType : "json",
			beforeSend: function(req) {
				if(o.before)o.before(req);
			},
			complete:function(XMLHttpRequest, textStatus){
			},
			success : function(result){
				if(option.success && typeof option.success == 'function'){
					option.success(result);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
			}
		});
	};
	$.request.get = function(o){
		var defaults = {
			url : 'about:blank',
			params : '',
			before:undefined,
			success : undefined
		};
		var option = $.extend(defaults, o);
		$.ajax({
			type : "GET",
			url : option.url,
			data : option.params,
			headers:{
		        "sessionId":$.cookie('sessionId')
		    },
			dataType : "json",
			beforeSend: function(req) {
				if(o.before)o.before(req);
			},
			complete:function(XMLHttpRequest, textStatus){
			},
			success : function(result){
				if(option.success && typeof option.success == 'function'){
					option.success(result);
				}
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
			}
		});
	};
	$.request.param = function(name){
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
		var r = window.location.search.substr(1).match(reg); 
		if (r != null) return unescape(r[2]); return null; 
	};	
	$.request.cross = function(o) {
		var s = document.createElement('script');
		s.type = 'text/javascript';
		s.src = o.url;
		var tags = document.getElementsByTagName(o.tag);
		if (typeof (o.onsuccess) == 'function') {
			if (document.all) {
				s.onreadystatechange = function() {
					if (/(complete|loaded)/.test(this.readyState)) {
						o.onsuccess();
						s.onreadystatechange = null;
						s.parentNode.removeChild(s);
					}
				};
			} else {
				s.onerror = function() {
					o.onerror();
				};
				s.onload = function() {
					o.onsuccess();
					s.onload = null;
					s.parentNode.removeChild(s);
				};
			}
		}
		tags[0].appendChild(s);
	};
})(jQuery);

/**
 * 同环比颜色获取
 * @param {Object} param
 * @param {Object} id
 */
function getcolor(param, id){
	if (param == '0') { //正增长
		$('#'+id).css('color', '#ffa0a1');
	} else if (param == '1') { //负增长
		$('#'+id).css('color', '#57D92A');
	}
}

/**
 * 获取数字颜色
 * @param {Object} value
 */
function getNumberColor(value){
	var view_color;
	if(value > 0){
		view_color = echart_desc_color_green;
	} else if(value == 0) {
		view_color = echart_desc_color_black;
	} else {
		view_color = echart_desc_color_red;
	}
	return view_color;
}

/**
 * 获取文本图层
 * @param x			x轴位置
 * @param y			也轴位置
 * @param text		要显示的内容(可以是数组，但不建议使用)
 * @param fill		字体颜色 
 * @param textAlign	文字对齐方式 
 * @param textFont	文字样式 
 */
function getTextGraphic(x,y,text,fill,textAlign,textFont,z){
	/*value = text.replace(/[^0-9]/ig,"");
	danw = text.replace(/[0-9]/ig,"");
	text = zeroCheck(value,danw);*/
	var style = {
        text: text,
	    fill:fill,
	    textAlign: textAlign, 
	    textFont : textFont ,
/*	    left: 'center', // 相对父元素居中
        top: 'middle',  // 相对父元素居中*/
	    x: x,
	    y: y
	};
	if(isNull(z)){
		z = 0;
	}
	var graphic = {
		type: 'text',
		style:style,
		z: z
	}
	return graphic;
}

/**
 * 获取图层组
 * 该 group 元素为根的元素树可以共同定位（共同移动）
 */
function getGroup(){
	var group = {
/*		left:'center',
		top:'center',*/
		type: 'group',	
		children:[],
		width:0,
		height :0
	}
	return group;
}

/**
 * 将图层添加进图层组
 * @param group
 * @param graphic
 */
function setGraphicToGroup(group,graphic){
	group.children.push(graphic);
}

//获取url中的参数
function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
	var r = window.location.search.substr(1).match(reg); //匹配目标参数
	if(r != null) return unescape(r[2]);
	return null; //返回参数值
}

/**
 * 判断为空
 * @param par
 */
function isNull(par){
	if(par == 0 ){
		return false;
	}else{
		if(par == null || par == '' || par == undefined || par == 'undefined'  || JSON.stringify(par) == '{}'){
			return true;
		}else{
			return false;
		}		
	}
}

var byId = function(id) {
	return document.getElementById(id);
};

/**
 * 获取数字颜色
 * @param {Object} value
 */
function getNumberColor(value){
	var view_color;
	if(value > 0){
		view_color = echart_desc_color_green;
	} else {
		view_color = echart_desc_color_red;
	}
	return view_color;
}

/**
 *  * 根据数据值的长度，设置数值在echarts途中的位置
 * @param {Object} value			
 * @param {Object} initX		初始值(长度为1时，value值加上单位要居中)
 * @param {Object} scale		比例
 */
function setPositionByDataLen(value,initX,scale){
	var len = value.toString().length ;		
	return initX-(len*scale);
}

/**
 * 展示等待动画
 * @param {Object} methodName		需要提前加载的方法
 * @param {Object} param			参数
 */
function showRealLoading(methodName,param){
	mui.plusReady(function(){
		plus.nativeUI.showWaiting("");
		
		var data = [];
		data.push(param);
		doCallback(eval(methodName), data );
		
	  	mainMv = plus.webview.currentWebview();
	    //关闭等待框
	    plus.nativeUI.closeWaiting();
	    //显示当前页面
	    mui.currentWebview.show();
	});	
}

/**
 * 动态调用方法
 * @param fn		方法名称
 * @param args		参数(数组形式)
 */
function doCallback(fn,args){   
    fn.apply(this, args); 
} 

/**
 * 打开文件
 * @param {Object} filename
 * @param {Object} loadUrl
 */
function openFile(filename, loadUrl) {
	if(loadUrl == null) return;
	//文件下载成功 默认保存在本地相对路径的"_downloads"文件夹里面, 如"_downloads/logo.jpg"
	var relativePath = "_downloads/" + filename;
	//检查文件是否已存在
	plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
		console.log("文件存在,直接设置=" + relativePath);
		//如果文件存在,则直接设置本地文件路径
		openFileFromLocal(relativePath);
	}, function(e) {
		console.log("文件不存在,联网下载=" + relativePath);
		//如果文件不存在,联网下载图片
		openFileFromNet(loadUrl, relativePath);
	});
}

/**
 * 打开本地文件
 * @param {Object} relativePath
 */
function openFileFromLocal(relativePath) {
	//本地相对路径("_downloads/logo.jpg")转成SD卡绝对路径("/storage/emulated/0/Android/data/io.dcloud.HBuilder/.HBuilder/downloads/logo.jpg");
	var sd_path = plus.io.convertLocalFileSystemURL(relativePath);
	plus.runtime.openFile(sd_path, {}, function(e) {
		mui.alert('打开失败');
	});
	
}

/**
 * 当文件不存在则下载完再打开，如果本地存在则直接打开
 * @param {Object} loadUrl
 * @param {Object} relativePath
 */
function openFileFromNet(loadUrl, relativePath) {
	plus.nativeUI.showWaiting("正在下载，请稍等...");
	//创建下载任务
	var dtask = plus.downloader.createDownload(loadUrl, {}, function(d, status) {
		if(status == 200) {
			plus.nativeUI.closeWaiting();
			//下载成功
			console.log("下载成功=" + relativePath);
			openFileFromLocal(d.filename);
		} else {
			plus.nativeUI.closeWaiting();
			mui.alert("下载文件失败！");
			//下载失败,需删除本地临时文件,否则下次进来时会检查到图片已存在
			console.log("下载失败=" + status + "==" + relativePath);
			//dtask.abort();//文档描述:取消下载,删除临时文件;(但经测试临时文件没有删除,故使用delFile()方法删除);
			if(relativePath != null)
				delFiles(relativePath);
		}
	});
	//启动下载任务
	dtask.start();
}

/*删除指定文件*/
function delFiles(relativePath) {
	plus.io.resolveLocalFileSystemURL(relativePath, function(entry) {
		entry.remove(function(entry) {
			console.log("文件删除成功==" + relativePath);
		}, function(e) {
			console.log("文件删除失败=" + relativePath);
		});
	});
}

function show(id,isClose) {
	new ShowDiv(id,isClose);
}

function ShowDiv(id,isClose) {
	if(isNull(isClose)){
		this.cancleBtnn = document.getElementById("cancleBtn");
		this.cancleBtnn.onclick = function() {
	//					mui.toast("取消");
			_this.CloseDiv(this);
		}	
	}
	var _this = this;
	this.dialog = document.getElementById(id);
	
	//对应div的取消按钮的操作
	//this.confirmBtn = document.getElementById("confirmBtn");
	this.newMask = document.createElement("div");
	//遮罩层，用来屏蔽灰掉背部界面
	this.dialog.style.visibility = "visible";
	//确认按钮
/*	this.confirmBtn.onclick = function() {
		var address = document.getElementById("address").value;
		var port = document.getElementById("port").value;
		mui.toast("确定"+"address="+address+",port="+port);
		_this.CloseDiv(this);
	}*/
	// 创建弹出层 遮罩层 等 
	if(!document.getElementById("mask") && 1) {
		//mask div    
		this.newMask.id = "mask";
		this.newMask.style.position = "absolute";
		this.newMask.style.zIndex = "1";
		this.newMask.style.width = "100%";
		this.newMask.style.left = "0px";
		this.newMask.style.background = "gray";
		this.newMask.style.filter = "alpha(opacity=80)";
		this.newMask.style.opacity = "0.8";
		
		if(id=='yxdt_luwsj_dialog'|| id=='gaosglgczllListDiv' || id=='putglgczllListDiv' || id=='weihpdlysqyListDiv'){
			var searchHeight=document.getElementById("sliderSegmentedControl").offsetHeight;
			this.newMask.style.top = searchHeight + 'px';
			this.newMask.style.height = (document.body.offsetHeight - searchHeight )+ "px";
		}else{
			this.newMask.style.top = "0px";
			this.newMask.style.height = document.body.offsetHeight+ "px";
		}
		
		document.body.appendChild(this.newMask);
	}
	_this.mask = document.getElementById("mask");
	_this.mask.style.visibility = "visible";
	_this.mask.onclick = function() {test001(id)};
}

//点击取消按钮关闭模态框
ShowDiv.prototype.CloseDiv = function() {
	var id = this.dialog.id;
	$("#"+id).remove();	//弹出层删除
	$("#mask").remove();//遮罩层 删除
	this.dialog.style.visibility = "hidden";
	this.mask.style.visibility = "hidden";
}

function removeDialog(id){
	$("#"+id).remove();	//弹出层删除
	$("#mask").remove();//遮罩层 删除
}

function test001(id){
	//alert(id);
	removeDialog(id);
}

/**
 *  运输企业数(道路、水路、普货)
 */
function getYunsqys(type) {
	mui.ajax(app.config() + '/hyglYunsqysData', {
		data: {"type":type},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			if(data) {
				if(type == 'daol'){			//道路
					var index_value = 4 , index_title = 7;
					$("#cyzt_date_1").html(data.RIQ);
					$('#cyzt_view1_value_1').html(addCommas3(data.value_frist));
					$('#cyzt_view1_value_2').html(zeroCheck(addCommas3(data.value_second),''));
					if(data.value_second == 0){
						$('#cyzt_view1_value_3').html('-');
					} else {
						$('#cyzt_view1_value_3').html(zeroCheck(data.value_chaz,''));
					}
					$('#cyzt_view1_value_3').css('color',getNumberColor(data.value_chaz));
					for(var i=0;i<data.outList.length;i++){
						var info = data.outList[i];
						$('#cyzt_view1_value_'+index_value).html(addCommas3(info.F_NB_QIYS));
						$('#cyzt_view1_value_'+index_title).html(info.F_VC_QUHMC );
						index_value++;
						index_title++;
					}					
				}else if(type == 'shuil'){	//水路
					var index_value = 4 , index_title = 7;
					$("#cyzt_date_2").html(data.RIQ);
					$('#cyzt_view2_value_1').html(addCommas3(data.value_frist));
					$('#cyzt_view2_value_2').html(zeroCheck(addCommas3(data.value_second),''));
					if(data.value_second == 0){
						$('#cyzt_view2_value_3').html('-');
					} else {
						$('#cyzt_view2_value_3').html(zeroCheck(data.value_chaz,''));
					}
					$('#cyzt_view2_value_3').css('color',getNumberColor(data.value_chaz));
					for(var i=0;i<data.outList.length;i++){
						var info = data.outList[i];
						$('#cyzt_view2_value_'+index_value).html(addCommas3(info.F_NB_QIYS) );
						$('#cyzt_view2_value_'+index_title).html(info.F_VC_QUHMC );
						index_value++;
						index_title++;
					}					
				}else if(type == 'puh'){	//普货
					var index_value = 4 , index_title = 7;
					$("#aqjg_view3_date_1").html(data.RIQ);
					$('#aqjg_view3_value_1').html(addCommas3(data.value_frist));
					$('#aqjg_view3_value_2').html(zeroCheck(addCommas3(data.value_second),''));
					if(data.value_second == 0){
						$('#aqjg_view3_value_3').html('-');
					} else {
						$('#aqjg_view3_value_3').html(zeroCheck(data.value_chaz,''));
					}
					$('#aqjg_view3_value_3').css('color',getNumberColor(data.value_chaz));
					for(var i=0;i<data.outList.length;i++){
						var info = data.outList[i];
						$('#aqjg_view3_value_'+index_value).html(zeroCheck(addCommas3(info.F_NB_QIYS),'') );
						$('#aqjg_view3_value_'+index_title).html(info.F_VC_QUHMC );
						index_value++;
						index_title++;
					}					
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});	
}

function changZhuMenu(targetTab){
	alert(targetTab);
	var subpage_style = {
		top: '45px',
		bottom: '51px'
	};	
	var title = document.getElementById("title");
	var nowself = plus.webview.currentWebview();
	//更换标题
	//title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
	
	// 查找指定标识的WebviewObject窗口
	var _subView = plus.webview.getWebviewById(targetTab);
	if(!_subView) {
		_subView = plus.webview.create("../../"+targetTab, targetTab, subpage_style);
		nowself.append(_subView);
	}
	_subView.show();
	plus.webview.getWebviewById('view/jtzl/home.html').hide('none');
	//activeTab = targetTab;	
}

//
var isInit = null; 

//通讯录电话拨打
function phoneCall(phoneNumber){
	var btnArray=['拨打','取消'];
    mui.confirm('是否拨打'+phoneNumber+'?','提示',btnArray,function(e){
       if(e.index == 0){
          plus.device.dial(phoneNumber,false);
       }
    });
}

//判断数字是否为0,如是0,则改成"-"
function zeroCheck(value,danw){
	if('0' == value || 0 == value){
		return '-';
	} else {
		return value+danw;
	}
}

/*******数字加逗号**********/
function addCommas3(val){ 
	if (val != null) {
		var sIntNum = val.toString(),  
		bIndex = sIntNum.indexOf('.');  
		return  sIntNum.replace(/\d(?=(?:\d{3})+(?:\.|$))/g,function($0,i){  
			return bIndex < 0 || i < bIndex?($0 + ',' ): $0  
		})  
	} else {
		return "";
	}
} 

	var CLASS_ACTIVE = 'mui-active';
	/**
	 * 自动消失提示框
	 */
	function mui2Toast(message,options) {

		var toast = document.createElement('div');
		toast.classList.add('mui-toast-container2');
		toast.innerHTML = '<div class="' + 'mui-toast-message2' + '">' + message + '</div>';
		toast.addEventListener('webkitTransitionEnd', function() {
			if (!toast.classList.contains(CLASS_ACTIVE)) {
				toast.parentNode.removeChild(toast);
				toast = null;
			}
		});
		//点击则自动消失
//		toast.addEventListener('click', function() {
//	        toast.parentNode.removeChild(toast);
//	        toast = null;
//	    });
		document.body.appendChild(toast);
		toast.offsetHeight;
		toast.classList.add(CLASS_ACTIVE);
		setTimeout(function() {
			toast && toast.classList.remove(CLASS_ACTIVE);
	        toast.parentNode.removeChild(toast);
	        toast = null;			
		}, options.duration);
		
		return {
	        isVisible: function() {return !!toast;}
	    }   
	};
