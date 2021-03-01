$(function() {
	//执行开始的方法
	//showpos = true;
	startTrack();

})

var showpos = false;
// Put event listeners into place
//window.addEventListener("DOMContentLoaded", function() {

// Grab elements, create settings, etc.
var canvas = document.getElementById("canvas"),
	context = canvas.getContext("2d"),
	video = document.getElementById("video"),
	videoObj = {
		"video": true
	},
	errBack = function(error) {
		if(error.PERMISSION_DENIED) {
			jAlert('用户拒绝了浏览器请求媒体的权限', '提示');
		} else if(error.NOT_SUPPORTED_ERROR) {
			jAlert('对不起，您的浏览器不支持拍照功能，请使用其他浏览器', '提示');
		} else if(error.MANDATORY_UNSATISFIED_ERROR) {
			jAlert('指定的媒体类型未接收到媒体流', '提示');
		} else {
			jAlert('系统未能获取到摄像头，请确保摄像头已正确安装。或尝试刷新页面，重试', '提示');
		}
	};

// Put video listeners into place
if(navigator.getUserMedia) { // Standard

	navigator.getUserMedia(videoObj, function(stream) {

		video.src = stream;
		video.play();

	}, errBack);

} else if(navigator.webkitGetUserMedia) { // WebKit-prefixed

	try {

		navigator.webkitGetUserMedia(videoObj, function(stream) {
			video.src = window.webkitURL.createObjectURL(stream);
			video.play();
		}, errBack);

	} catch(error) {
		alert(error);
	}

} else if(navigator.mozGetUserMedia) { // Firefox-prefixed
	navigator.mozGetUserMedia(videoObj, function(stream) {

		video.src = window.URL.createObjectURL(stream);
		video.play();
	}, errBack);
}

//张嘴
document.getElementById("mouse").addEventListener("click", function() {
	var audio = document.createElement('audio');
	var source = document.createElement('source');
	source.type = "audio/mp3";
	source.src = "mp3/alive_mouse.mp3";
	source.autoplay = "autoplay";
	source.controls = "controls";
	audio.appendChild(source);
	audio.play();
	alive_mouse();
});
//摇头
document.getElementById("head").addEventListener("click", function() {

	alive_head();
});

//眨眨眼
document.getElementById("eye").addEventListener("click", function() {
	var audio = document.createElement('audio');
	var source = document.createElement('source');
	source.type = "audio/mp3";
	source.src = "mp3/alive_eye.mp3";
	source.autoplay = "autoplay";
	source.controls = "controls";
	audio.appendChild(source);
	audio.play();
	alive_eye();
});

//}, false);
//////////////////////////////////////////////////////////////////////////////
//活体
var last_time = 0; //时间因素
var last_nose_left = 0;
var last_nose_top = 0;

//张嘴动作
var is_mouse_ok = false;
var is_alive_mouse = false;
var last_dis_eye_norse = 0;
var last_dis_mouse = 0;

//检测张嘴动作
function alive_mouse() {
	document.getElementById("tip").innerHTML = "请张合嘴巴";
	document.getElementById('result').value = "";
	is_mouse_ok = false;
	last_dis_mouse = 0;
	last_time = 0;
	last_dis_eye_norse = 100000000;
	is_alive_head = false;
	is_alive_mouse = true;
	is_alive_eye = false;

}
//摇头动作
var is_head_ok = false;
var is_alive_head = false;
var last_dis_left_right = 100000000;

function alive_head() {
	document.getElementById("tip").innerHTML = "请在水平方向左右摇头";
	document.getElementById('result').value = "";
	is_head_ok = false;
	last_dis_left_right = 100000000;
	last_time = 0;
	is_alive_head = true;
	is_alive_mouse = false;
	is_alive_eye = false;

}

//眨眼动作
var is_alive_eye = false;
var is_eye_ok = false;

function alive_eye() {

	document.getElementById("tip").innerHTML = "请眨眼";
	document.getElementById('result').value = "";
	is_eye_ok = false;
	last_dis_eye_norse = 100000000;

	last_nose_left = 0;
	last_nose_top = 0;

	last_time = 0;

	is_alive_head = false;
	is_alive_mouse = false;
	is_alive_eye = true;
}

function startTrack() {

	var videoInput = document.getElementById('video');

	var ctracker = new clm.tracker();
	ctracker.init(pModel);
	ctracker.start(videoInput);

	var canvasInput = document.getElementById('canvas');
	var cc = canvasInput.getContext('2d');
	cc.lineWidth = 3;

	function drawLoop() {
		//requestAnimationFrame(drawLoop);

		cc.clearRect(0, 0, canvasInput.width, canvasInput.height);
		//ctracker.draw(canvasInput );
		var positions = ctracker.getCurrentPosition();
		if(showpos && positions) {

			for(var p = 0; p < positions.length; p++) {
				positionString += "featurepoint " + p + " : [" + positions[p][0].toFixed(2) + "," + positions[p][1].toFixed(2) + "]<br/>";
			}
			document.getElementById('positions').innerHTML = positionString;

		}
		if(positions) {

			for(var p = 0; p < 71; p++) {
				cc.beginPath();
				cc.arc(positions[p][0].toFixed(2), positions[p][1].toFixed(2), 2, 0, Math.PI * 2, true);
				cc.closePath();
				cc.fillStyle = '#00FF00';
				cc.fill();
			}

			//cc.strokeStyle = 'red';

			//0-14 轮廓
			//7 下吧，最下

			//2 最左边
			//12 最右边

			//15-22 眉毛

			//23-27 左眼睛五个点
			//27 左眼中间
			//63-66 左眼四个点

			//28-32 右眼睛五个点
			//67-70 右眼四个点

			//33-43 鼻子
			//62 鼻中间

			//44-61 嘴巴
			//47 嘴巴上
			//53 嘴巴下

			///////////////////////////////////////////////////////////////////////////////////////////////

			//左眼中间
			for(var p = 27; p <= 27; p++) {
				cc.beginPath();
				cc.arc(positions[p][0].toFixed(2), positions[p][1].toFixed(2), 2, 0, Math.PI * 2, true);
				cc.closePath();
				cc.fillStyle = 'red';
				cc.fill();
			}

			//鼻子中间
			for(var p = 62; p <= 62; p++) {
				cc.beginPath();
				cc.arc(positions[p][0].toFixed(2), positions[p][1].toFixed(2), 2, 0, Math.PI * 2, true);
				cc.closePath();
				cc.fillStyle = 'red';
				cc.fill();
			}
			//嘴巴上
			for(var p = 57; p <= 57; p++) {
				cc.beginPath();
				cc.arc(positions[p][0].toFixed(2), positions[p][1].toFixed(2), 2, 0, Math.PI * 2, true);
				cc.closePath();
				cc.fillStyle = 'red';
				cc.fill();
			}
			//嘴巴下
			for(var p = 60; p <= 60; p++) {
				cc.beginPath();
				cc.arc(positions[p][0].toFixed(2), positions[p][1].toFixed(2), 2, 0, Math.PI * 2, true);
				cc.closePath();
				cc.fillStyle = 'red';
				cc.fill();
			}
			//////////////////////////////////////
			//head
			if(is_alive_head == true) {
				if(last_time == 0 || (new Date().getTime() - last_time > 500 && new Date().getTime() - last_time < 10000)) {
					var xdiff_left = positions[62][0] - positions[2][0];
					var ydiff_left = positions[62][1] - positions[2][1];
					var dis_left = Math.pow((xdiff_left * xdiff_left + ydiff_left * ydiff_left), 0.5);

					var xdiff_right = positions[12][0] - positions[62][0];
					var ydiff_right = positions[12][1] - positions[62][1];
					var dis_right = Math.pow((xdiff_right * xdiff_right + ydiff_right * ydiff_right), 0.5);

					var xdiff_side = positions[12][0] - positions[2][0];
					var ydiff_side = positions[12][1] - positions[2][1];
					var dis_side = Math.pow((xdiff_side * xdiff_side + ydiff_side * ydiff_side), 0.5);

					var dis_left_right = dis_left - dis_right;
					document.getElementById('result').value = dis_left_right;

					if(last_dis_left_right > 0 && dis_left_right > dis_side / 3) {

						document.getElementById('result').value = "通过";
						var msg_m = document.getElementById('result');
						if(msg_m.value == '通过') {
							//执行其他方法
							is_head_ok = true;
							is_alive_head = false;
							location.href = "http://muxiongxiong.top"
						}

					}

					last_dis_left_right = dis_left_right;
					last_time = new Date().getTime();

				}
			}

			/////////////////////////////////////
			//mouse 
			if(is_alive_mouse == true) {
				if(last_time == 0 || (new Date().getTime() - last_time > 500 && new Date().getTime() - last_time < 10000)) {

					//研究和鼻子距离
					var xdiff = positions[62][0] - positions[27][0];
					var ydiff = positions[62][1] - positions[27][1];
					var dis_eye_norse = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);

					//上嘴唇 和下嘴唇距离
					var xdiff_mouse = positions[53][0] - positions[47][0];
					var ydiff_mouse = positions[53][1] - positions[47][1];
					var dis_mouse = Math.pow((xdiff_mouse * xdiff_mouse + ydiff_mouse * ydiff_mouse), 0.5);

					//上次的眼鼻距离和这次的眼鼻距离差
					var dn = Math.abs(dis_eye_norse - last_dis_eye_norse);

					//上次的嘴距离和本次的嘴距离差
					var dm = Math.abs(dis_mouse - last_dis_mouse);

					//鼻子的位置确保变化不大
					if(last_nose_left > 0 && last_nose_top > 0 &&
						Math.abs(positions[62][0] - last_nose_left) < 5 &&
						Math.abs(positions[62][1] - last_nose_top) < 5
					) {

						document.getElementById('msg').innerHTML = dn;

						if(last_dis_eye_norse > 0 && dn < dis_eye_norse * 1 / 50) {

							if(last_dis_mouse > 0 && dm > dis_mouse / 10) {

								document.getElementById('result').value = "通过";
								var msg_mouse = document.getElementById('result');
								if(msg_mouse.value == '通过') {
									//验证摇头
									is_alive_mouse = false;
									is_mouse_ok = true;
									var audio = document.createElement('audio');
									var source = document.createElement('source');
									source.type = "audio/mp3";
									source.src = "mp3/alive_head.mp3";
									source.autoplay = "autoplay";
									source.controls = "controls";
									audio.appendChild(source);
									audio.play();

									alive_head();
								}

							}

						}
					}

					last_dis_mouse = dis_mouse;
					last_dis_eye_norse = dis_eye_norse;
					last_time = new Date().getTime();

					last_nose_left = positions[62][0];
					last_nose_top = positions[62][1];

				}
			}

			/////////////////////////////////////
			//eye 
			if(is_alive_eye == true) {
				if(last_time == 0 || (new Date().getTime() - last_time > 10)) {

					var xdiff1 = positions[62][0] - positions[27][0];
					var ydiff1 = positions[62][1] - positions[27][1];
					var dis_eye_norse1 = Math.pow((xdiff1 * xdiff1 + ydiff1 * ydiff1), 0.5);

					var xdiff2 = positions[62][0] - positions[32][0];
					var ydiff2 = positions[62][1] - positions[32][1];
					var dis_eye_norse2 = Math.pow((xdiff2 * xdiff2 + ydiff2 * ydiff2), 0.5);

					var dis_eye_norse = (dis_eye_norse1 + dis_eye_norse2);

					if(last_nose_left > 0 && last_nose_top > 0 &&
						Math.abs(positions[62][0] - last_nose_left) < 0.5 &&
						Math.abs(positions[62][1] - last_nose_top) < 0.5
					) {
						document.getElementById('msg').innerHTML = Math.abs(dis_eye_norse - last_dis_eye_norse) - dis_eye_norse * 1 / 20;

						if(last_dis_eye_norse > 0 && (Math.abs(dis_eye_norse - last_dis_eye_norse) > dis_eye_norse * 1 / 20)) {

							document.getElementById('result').value = "通过";

							is_alive_eye = false;
							is_eye_ok = true;

						}
					}

					last_nose_left = positions[62][0];
					last_nose_top = positions[62][1];

					last_dis_eye_norse = dis_eye_norse;
					last_time = new Date().getTime();

				}

			}

		}

		requestAnimationFrame(drawLoop);

	}
	drawLoop();
}