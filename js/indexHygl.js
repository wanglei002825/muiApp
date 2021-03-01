
var subpages = ['view/hangygl/home.html', 
	'view/hangygl/yingy.html','view/hangygl/xiaox.html',
	'view/hangygl/wod.html'];
var subpage_style = {
	top: '0px',
	bottom: '51px'
};
 
activeTab = subpages[0]  ;

IndexJs={
	initialize : function() {
		IndexJs.initPage(); 
		
		IndexJs.backListener(); 
	},
	initPage : function(){
		    //mui初始化
			mui.init();
			
			var aniShow = {};
			
			//创建子页面，首个选项卡页面显示，其它均隐藏；
			mui.plusReady(function() {
				var self = plus.webview.currentWebview();
				// 设置默认加载首页
				var homemv = plus.webview.create(subpages[0], subpages[0], subpage_style);
				self.append(homemv);
				/*for (var i = 0; i < 6; i++) {
					var temp = {};
					var sub = plus.webview.create(subpages[i], subpages[i], subpage_style);
					if (i > 0) {
						sub.hide();
					}else{
						temp[subpages[i]] = "true";
						mui.extend(aniShow,temp);
					}
					self.append(sub);
				}*/
			});
			//当前激活选项
			var title = document.getElementById("title");
			//选项卡点击事件
			mui('.mui-bar-tab').on('tap', 'a.mui-tab-item', function(e) {
				var nowself = plus.webview.currentWebview();
				var targetTab = this.getAttribute('href');
				
				if (targetTab == activeTab) {
					return;
				}
				//更换标题
				//title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
				
				// 查找指定标识的WebviewObject窗口
				var _subView = plus.webview.getWebviewById(targetTab);
				// 每次刷新文件查看页面
				// if (this.querySelector('.mui-tab-label').innerHTML == '文件查看') {
				// 	mui.fire(_subView, 'showWenjck', null);
				// }
				
				//关闭当前页面（预告警使用：如果不关闭，加入页面存在，点击预告警的时候，不能调到指标栏目）
				plus.webview.close(activeTab);
				
				if(!_subView) {
					if('view/hangygl/wod.html' == targetTab){
						var style = {
							top: '0px',
							bottom: '51px'
						};
						_subView = plus.webview.create(targetTab, targetTab, style);
					} else {
						_subView = plus.webview.create(targetTab, targetTab, subpage_style);
					}
					
					nowself.append(_subView);
				}
				_subView.show();
				plus.webview.getWebviewById(activeTab).hide('none');
				activeTab = targetTab;
				//plus.webview.getWebviewById(targetTab).reload();
				
				
				//显示目标选项卡
				//若为iOS平台或非首次显示，则直接显示
				/*if(mui.os.ios||aniShow[targetTab]){
						plus.webview.show(targetTab);
					}else{
						//否则，使用fade-in动画，且保存变量
						var temp = {};
						temp[targetTab] = "true";
						mui.extend(aniShow,temp);
						plus.webview.show(targetTab,"fade-in",300);
					}*/
					
					//隐藏当前;
					/*plus.webview.hide(activeTab);
					//更改当前活跃的选项卡
					activeTab = targetTab;*/
			});
	},
	
	//返回业务逻辑：非首页其他模块第一个页面点击返回则返回到首页页面，首页返回则返回登录页面，其余字页面返回返回到父页面
	backListener : function(){
		 //当前激活选项
		var title = document.getElementById("title");
		var subpage_style = {
			top: '0px',
			bottom: '51px'
		};
			
		var oldBack = mui.back;
		mui.back = function(){
			var nowself = plus.webview.currentWebview();
			var nowselfId = nowself.id;
			if('indexHygl' == nowselfId){
				var homeTab = document.getElementById("shouyTab");
				//切换选项卡高亮
				var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
				var currentName = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active>.mui-tab-label").innerHTML;
				if (homeTab !== current) {//不是首页返回,则返回到首页页面
					//模拟首页点击
					mui.trigger(homeTab, 'tap');
					current.classList.remove('mui-active');
					homeTab.classList.add('mui-active');
					
					//title.innerHTML = "首页";
					
					var webview = plus.webview.getWebviewById('view/hangygl/home.html'); 
				    if(!webview) {
						webview = plus.webview.create('view/hangygl/home.html', 'view/hangygl/home.html', subpage_style);
						nowself.append(webview);
					}
			    	webview.show();
			    	if("通讯录" == currentName){
			    		plus.webview.getWebviewById('view/hangygl/tongxl.html').hide('none');
			    	} else if("即时通讯" == currentName){
			    		plus.webview.getWebviewById('view/hangygl/jistx.html').hide('none');
			    	}  else if("我的" == currentName){
			    		plus.webview.getWebviewById('view/hangygl/wod.html').hide('none');
			    	}
					
				} else if (homeTab == current) {//首页返回，则返回到登录页面
					plus.webview.getLaunchWebview().reload();//启动页（登录页）刷新
					oldBack();
				}
			}
		};
	},
	
};


$(function() {
	IndexJs.initialize();
});	