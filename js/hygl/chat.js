
function loadtongxl() {
	queryTongxl('');
}

function loadxiaoxtz() {
	// 先加载列表
	getContactListData();
	//createWebSocket(wsUrl);
}

/**
 * 查询通讯录
 */
function queryTongxl(USERNAME) {
	mui.ajax(app.config() + '/tongxlDataByUserName', {
		data: {"USERNAME":USERNAME},
		dataType: 'json', //服务器返回json格式数据
		type: 'post', //HTTP请求类型
		async: false,
		timeout: 10000, //超时时间设置为10秒；
		success: function(data) {
			var html = '';
			if(!isNull(data)) {
				if(data.bum != null &&　JSON.stringify(data.bum)!='{}'){
					var i = 0;
					$.each(data.bum,function(key, item){
						if (i== 0) {
							html += '<li class="mui-table-view-cell mui-collapse"><a class="mui-navigate-right">'+item+'</a>';
						} else {
							html += '<li class="mui-table-view-cell mui-collapse"><a class="mui-navigate-right">'+item+'</a>';
						}
						html += '<ul class="mui-table-view mui-table-view-chevron">';
						html += buildBumTongxl(data[item],data,item);
						html += '</ul></li>';
						i++;
					});
				}
			}
			$('#tongxl_id').empty().html(html);
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});
}

function buildBumTongxl(bumTongxls,data,item){
	var result = "";
	if(bumTongxls != null && bumTongxls != ''){
		$.each(bumTongxls,function(key, item){
			var tongxlxqcs = "'"+item.USERNAME+"','"+item.BANGDH+"','"+item.MOBILE+"','"+item.MOBILEOTHER+"','"+item.DUANH+"'";
			result += "<li class='mui-table-view-cell mui-media' onclick=tongxlxq("+tongxlxqcs+")>";
			result += '<img class="mui-media-object mui-pull-left" src="../../images/chat/yongh.jpg">';
			result += '<div class="mui-media-body">' + item.USERNAME;
			if(item.ZHIW != null && item.ZHIW != ''){
				result += "<p class='mui-ellipsis'>"+item.ZHIW+"</p>";
			}
			result += '</div></li>';
		});
	}
	return result;
}

function buildDianh(item){
	var result = "";
	//办公
	if(item.BANGDH != null && item.BANGDH != ''){
		result += "<svg class='icon' aria-hidden='true' onclick=phoneCall('"+item.BANGDH+"')>";
		result += "<use xlink:href='#icon-dianhua'></use></svg>";
	}
	//移动电话
	if(item.MOBILE != null && item.MOBILE != ''){
		result += "<svg class='icon' aria-hidden='true' onclick=phoneCall('"+item.MOBILE+"')>";
		result += "<use xlink:href='#icon-shouji'></use></svg>";
	}
	//短号
	if(item.DUANH != null && item.DUANH != ''){
		result += "<svg class='icon' aria-hidden='true' onclick=phoneCall('"+item.DUANH+"')>";
		result += "<use xlink:href='#icon-dianhua1'></use></svg>";
	}
	return result;
}

function tongxlxq(USERNAME,BANGDH,MOBILE,MOBILEOTHER,DUANH){
	mui.openWindow({
		id:'tongxlxq',
		url:'tongxlxq.html',
		extras:{
			'USERNAME':USERNAME,  //扩展参数
			'BANGDH':BANGDH,  //扩展参数
			'MOBILE':MOBILE,  //扩展参数
			'MOBILEOTHER':MOBILEOTHER,  //扩展参数
			'DUANH':DUANH  //扩展参数
		}
	});
}


function createWebSocket(wsUrl) {
	//判断当前浏览器是否支持WebSocket
    if ('WebSocket' in window) {
    	try {
			websocket = new WebSocket(wsUrl);
		    init();
		} catch(e) {
		    console.log('catch');
		    reconnect(wsUrl);
		}
    } else {
        mui.alert('当前浏览器不支持不支持websocket协议！')
	}
	
}

function init() {
	
	// 监听Socket的关闭 
	websocket.onclose = function() {
		console.log('Socket连接关闭', event);  
		reconnect(wsUrl);
	};
	
	// 监听Socket错误
	websocket.onerror = function() {
		console.log("Socket连接失败");
		reconnect(wsUrl);
	};
	
	// 打开Socket
	websocket.onopen = function() {
		console.log("连接成功");
		//心跳检测重置
		heartCheck.start();
	};
	
	websocket.onmessage = function(event) {
		//心跳检测重置
		heartCheck.start();
		//拿到任何消息都说明当前连接是正常的
		console.log('接收到消息' + event.data);
		if (event.data!='ping' && event.data != app.getState().user_id) {
			getContactListData();
		}
	}
}

/**
 * 如果网络断开的话，会执行reconnect方法，
 * 使用了一个定时器，1秒后会重新创建一个新的websocket链接，
 * 重新调用createWebSocket函数
 * @param {Object} url
 */
function reconnect(url) {
	if(lockReconnect) {
		return;
	};
	lockReconnect = true;//没连接上会一直重连，设置延迟避免请求过多
  	tt && clearTimeout(tt);
	tt = setTimeout(function () {
        createWebSocket(url);
        lockReconnect = false;
  	}, 1000);
}

//心跳检测
var heartCheck = {
    timeout: 540000,//9分钟
    timeoutObj: null,
    serverTimeoutObj: null,
    start: function(){
    	console.log('心跳检测start');
    	var self = this;
        this.timeoutObj && clearTimeout(this.timeoutObj);
        this.serverTimeoutObj && clearTimeout(this.serverTimeoutObj);
        this.timeoutObj = setTimeout(function(){
    		//这里发送一个心跳，后端收到后，返回一个心跳消息
    		//onmessage拿到返回的心跳就说明连接正常
    		var data = {};
            data['CONTENTTYPE'] = 'ping';
            websocket.send(JSON.stringify(data));
    		self.serverTimeoutObj = setTimeout(function() {
    			//如果超过一定时间还没重置，说明后端主动断开了
	            websocket.close();//如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
      		}, self.timeout);
    	}, this.timeout)
	}
};

//添加newId自定义事件监听
window.addEventListener('show',function(event){
 	// 获取通讯录
	getContactListData();
});

/**
 * 获取通讯录方法
 */
function getContactListData() {
	mui.ajax({
		type: "post",
		url: app.config() + '/queryContactListData',
		async: false,
		data: {
			//USER_ID: app.getState().user_id
			USER_ID: '1'
		},
		dataType: "json",
		timeout: 10000,//超时时间设置为10秒；
		success: function(data) {
			if(data != null) {
				if(data.conList != null && "" != data.conList) {
					var html = buildHtml(data.conList);
					if(html != "") {
						$("#contactlist_id").empty();
						$("#contactlist_id").append(html);
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

function buildHtml(data) {
	var html = "";
	for(var i = 0; i < data.length; i++) {
		var email = data[i].EMAIL;
		if (typeof(email) == "undefined") {
			email = "";
		}
		if(data[i].USER_NAME == "测试"){
			continue;
		}
		if(data[i].USER_NAME == "测试2"){
			data[i].USER_NAME = "信息中心";
		}
		html += '	<li class="mui-table-view-cell mui-media" id="'+data[i].USER_ID+'" onclick="toChat(\''+data[i].USER_ID+'\');" >';
		html += '	<div class="mui-slider-handle">';
		html += '		<img class="mui-media-object mui-pull-left toux_img" src="../../images/chat/tx1.jpg">';
		html += '		<div class="mui-media-body">';
		html += '			<div class="mui-table">';
		html += '				<div class="mui-table-cell mui-col-xs-8">';
		html += '					<h4 class="mui-ellipsis">'+data[i].USER_NAME+'</h4>';
		html += '					<p class="mui-h5 mui-ellipsis">'+email+'</p>';
		html += '				</div>';
		html += '				<div class="mui-table-cell mui-col-xs-4 mui-text-right">';
		html += '					<span class="mui-h6">'+data[i].NAME+'</span>';
		if (data[i].UNREAD!=0) {
		html += '					<span class="mui-badge mui-badge-danger">'+data[i].UNREAD+'</span>';
		}
		html += '				</div>';
		html += '			</div>';
		html += '		</div>';
		html += '	</div>';
		html += '</li>';
	}
	return html;
}

/**
 * 打开聊天记录页面
 */
function toChat(userid) {
	var tip = mainMv.tip;
	if(isNull(tip)){
		tip = "";
	}
	// 点击通讯录时，同时将未读信息变为已读信息
	mui.ajax({
		type: "post",
		url: app.config() + '/updateMsgReadstate',
		async: false,
		data: {
			SENDUSERID:userid,
			RECEIVEUSERID: app.getState().user_id
		},
		dataType: "json",
		timeout: 10000,//超时时间设置为10秒；
		success: function(data) {
			if(data != null) {
				if(data.result) {
					// 获取聊天接收用户
					var receiveUserName = $('#' + userid).find('h4').html();
					mui.openWindow({
						id:'chat_view',
						url:'chat_view.html',
						extras:{
							'userid':userid,  //扩展参数
							'receiveUserName':receiveUserName,
							'tip':tip
						}
					});
				}
			}
		},
		error: function(xhr, type, errorThrown) {
			//异常处理；
			console.log(type);
		}
	});
}

/**
 * 监听返回刷新
 */
window.addEventListener('contact_refresh', function(e){//执行刷新
	// 刷新通讯录
	getContactListData();
	// 重新连接websocket
	createWebSocket(wsUrl);
});

// 搜索事件,获取搜索关键词
function enterSearch(event){
	if(event.keyCode == 13) {//用户点击回车的事件号为13
		plus.nativeUI.showWaiting("正在搜索中,请稍候...");
		var keyword = document.getElementById('searchInput').value;
	    queryTongxl(keyword);
	    plus.nativeUI.closeWaiting();
	}
}