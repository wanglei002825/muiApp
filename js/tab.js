window.onload = function (){
	var windowWidth = document.body.clientWidth; //window 宽度;
	var wrap = document.getElementById('wrap');
	var tabClick = wrap.querySelectorAll('.tabClick')[0];
	var tabLi = tabClick.getElementsByTagName('li');
	
	var tabBox =  wrap.querySelectorAll('.tabBox')[0];
	var tabList = tabBox.querySelectorAll('.tabList');
	
	var lineBorder = wrap.querySelectorAll('.lineBorder')[0];
	var lineDiv = lineBorder.querySelectorAll('.lineDiv')[0];
	
	var tar = 0;
	var endX = 0;
	var dist = 0;
	
	tabBox.style.overflow='hidden';
	tabBox.style.position='relative';
	tabBox.style.width=windowWidth*tabList.length+"px";
	
	for(var i = 0 ;i<tabLi.length; i++ ){
		  tabList[i].style.width=windowWidth+"px";
		  tabList[i].style.float='left';
		  tabList[i].style.float='left';
		  tabList[i].style.padding='0';
		  tabList[i].style.margin='0';
		  tabList[i].style.verticalAlign='top';
		  tabList[i].style.display='table-cell';
	}
	
	for(var i = 0 ;i<tabLi.length; i++ ){
		tabLi[i].start = i;
		tabLi[i].onclick = function(){
			var star = this.start;
			for(var i = 0 ;i<tabLi.length; i++ ){
				tabLi[i].className='';
			};
			tabLi[star].className='active';
			init.lineAnme(lineDiv,windowWidth/tabLi.length*star)
			init.translate(tabBox,windowWidth,star);
			endX= -star*windowWidth;
		}
	}
	
	function OnTab(star){
		if(star<0){
			star=0;
		}else if(star>=tabLi.length){
			star=tabLi.length-1
		}
		for(var i = 0 ;i<tabLi.length; i++ ){
			tabLi[i].className='';
		};
		
		 tabLi[star].className='active';
		init.translate(tabBox,windowWidth,star);
		endX= -star*windowWidth;
	};
	
	tabBox.addEventListener('touchstart',chstart,false);
	tabBox.addEventListener('touchmove',chmove,false);
	tabBox.addEventListener('touchend',chend,false);
	//按下
	function chstart(ev){
		ev.preventDefault;
		// var touch = ev.touches[0];
		// tar=touch.pageX;
		// tabBox.style.webkitTransition='all 0s ease-in-out';
		// tabBox.style.transition='all 0s ease-in-out';
	};
	//滑动
	function chmove(ev){
		var stars = wrap.querySelector('.active').start;
		ev.preventDefault;
		/* var touch = ev.touches[0];
		var distance = touch.pageX-tar;
		dist = distance;
		init.touchs(tabBox,windowWidth,tar,distance,endX);
		init.lineAnme(lineDiv,-dist/tabLi.length-endX/4); */
	};
	//离开
	function chend(ev){
		/* var str= tabBox.style.transform;
		var strs = JSON.stringify(str.split(",",1));  
		endX = Number(strs.substr(14,strs.length-18)); 
		
		if(endX>0){
			init.back(tabBox,windowWidth,tar,0,0,0.3);
			endX=0
		}else if(endX<-windowWidth*tabList.length+windowWidth){
			endX=-windowWidth*tabList.length+windowWidth
			init.back(tabBox,windowWidth,tar,0,endX,0.3);
		}else if(dist<-windowWidth/3){
			 OnTab(tabClick.querySelector('.active').start+1);
			 init.back(tabBox,windowWidth,tar,0,endX,0.3);
		}else if(dist>windowWidth/3){
			 OnTab(tabClick.querySelector('.active').start-1);
		}else{
			 OnTab(tabClick.querySelector('.active').start);
		}
		var stars = wrap.querySelector('.active').start;
		init.lineAnme(lineDiv,stars*windowWidth/3); */
	};
};

var init={
	translate:function(obj,windowWidth,star){
		obj.style.webkitTransform='translate3d('+-star*windowWidth+'px,0,0)';
		obj.style.transform='translate3d('+-star*windowWidth+',0,0)px';
		obj.style.webkitTransition='all 0.3s ease-in-out';
		obj.style.transition='all 0.3s ease-in-out';
	},
	touchs:function(obj,windowWidth,tar,distance,endX){
		obj.style.webkitTransform='translate3d('+(distance+endX)+'px,0,0)';
		obj.style.transform='translate3d('+(distance+endX)+',0,0)px';
	},
	lineAnme:function(obj,stance){
		obj.style.webkitTransform='translate3d('+stance+'px,0,0)';
		obj.style.transform='translate3d('+stance+'px,0,0)';
		obj.style.webkitTransition='all 0.1s ease-in-out';
		obj.style.transition='all 0.1s ease-in-out';
	},
	back:function(obj,windowWidth,tar,distance,endX,time){
		obj.style.webkitTransform='translate3d('+(distance+endX)+'px,0,0)';
		obj.style.transform='translate3d('+(distance+endX)+',0,0)px';
		obj.style.webkitTransition='all '+time+'s ease-in-out';
		obj.style.transition='all '+time+'s ease-in-out';
	},
}