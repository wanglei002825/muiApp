
var subpages = ['view/jtzl/home.html', 
	'view/yxdt/home.html','view/ysjj/home.html',
	'view/hygl/home.html','view/aqjg/home.html',
    'view/gzfw/home.html','view/wenjck/home.html'];
var subpage_style = {
	top: '45px',
	bottom: '51px'
};
 
activeTab = subpages[0]  ;

IndexJs={


	initialize : function() {
		//加载监听事件
		//IndexJs.eventListener();
		
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
				title.innerHTML = this.querySelector('.mui-tab-label').innerHTML;
				
				// 查找指定标识的WebviewObject窗口
				var _subView = plus.webview.getWebviewById(targetTab);
				// 每次刷新文件查看页面
				if (this.querySelector('.mui-tab-label').innerHTML == '文件查看') {
					mui.fire(_subView, 'showWenjck', null);
				}
				
				//关闭当前页面（预告警使用：如果不关闭，加入页面存在，点击预告警的时候，不能调到指标栏目）
				plus.webview.close(activeTab);
				
				
				if(!_subView) {
					_subView = plus.webview.create(targetTab, targetTab, subpage_style);
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
			 //自定义事件，模拟点击“首页选项卡”
			document.addEventListener('gohome', function() {
				var defaultTab = document.getElementById("defaultTab");
				//模拟首页点击
				mui.trigger(defaultTab, 'tap');
				//切换选项卡高亮
				var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
				if (defaultTab !== current) {
					current.classList.remove('mui-active');
					defaultTab.classList.add('mui-active');
				}
			});
	},
	/**
	 * 自定义监听事件
	 */
	eventListener : function(){
		//返回上一页
		window.addEventListener('backLogin',function(event){
//			mui.back();
		});
	},
	
	//返回业务逻辑：非首页其他模块第一个页面点击返回则返回到首页页面，首页返回则返回登录页面，其余字页面返回返回到父页面
	backListener : function(){
		 //当前激活选项
		var title = document.getElementById("title");
		var subpage_style = {
			top: '45px',
			bottom: '51px'
		};
			
		var oldBack = mui.back;
		mui.back = function(){
			var nowself = plus.webview.currentWebview();
			var nowselfId = nowself.id;
			if('index' == nowselfId){
				var homeTab = document.getElementById("shouyTab");
				//切换选项卡高亮
				var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
				var currentName = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active>.mui-tab-label").innerHTML;
				if (homeTab !== current) {//不是首页返回,则返回到首页页面
					//模拟首页点击
					mui.trigger(homeTab, 'tap');
					current.classList.remove('mui-active');
					homeTab.classList.add('mui-active');
					
					title.innerHTML = "交通总览";
					
					var webview = plus.webview.getWebviewById('view/jtzl/home.html'); 
					mui.toast(!webview)
				    if(!webview) {
						webview = plus.webview.create('view/jtzl/home.html', 'view/jtzl/home.html', subpage_style);
						nowself.append(webview);
					}
			    	webview.show();
			    	if("运行动态" == currentName){
			    		plus.webview.getWebviewById('view/yxdt/home.html').hide('none');
			    	} else if("运输经济" == currentName){
			    		plus.webview.getWebviewById('view/ysjj/home.html').hide('none');
			    	} else if("行业管理" == currentName){
			    		plus.webview.getWebviewById('view/slyx/home.html').hide('none');
			    	} else if("安全监管" == currentName){
			    		plus.webview.getWebviewById('view/xzjd/home.html').hide('none');
			    	} else if("公众服务" == currentName){
			    		plus.webview.getWebviewById('view/gzfw/home.html').hide('none');
			    	} else if("文件查看" == currentName){
			    		plus.webview.getWebviewById('view/wenjck/home.html').hide('none');
			    	}
				} else if (homeTab == current) {//首页返回，则返回到登录页面
					oldBack();
				}
			}
		};
	},
	
};


$(function() {
	IndexJs.initialize();
});	

//监听自定义事件
window.addEventListener("changeSubMenu", function(e) {
	document.getElementById("title").innerHTML = e.detail.menuName;
	activeTab = e.detail.id;
	var tabId = '';
	if(activeTab == 'view/jtzl/home.html'){
		tabId = 'shouyTab';
	}else if(activeTab == 'view/yxdt/home.html'){
		tabId = 'yunxdtTab';
	}else if(activeTab == 'view/ysjj/home.html'){
		tabId = 'yunsjjTab';
	}else if(activeTab == 'view/aqjg/home.html'){
		tabId = 'anqjgTab';
	}
	////模拟点击
	mui.trigger(document.getElementById(tabId),'tap');
	var current = document.querySelector(".mui-bar-tab>.mui-tab-item.mui-active");
	var homeTab = document.getElementById(tabId);
	current.classList.remove('mui-active');
	homeTab.classList.add('mui-active');	
	
});