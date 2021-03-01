/**
 * 纯数字图
 */
function simpleNumberCharts(){
	var options = {
	    title: {
	        text: ''
	    },	
	    graphic: []//图层	
	};
	return options;
}

/**
 * 百分比图
 */
function progressBarCharts(){
	var data = dataArr ;
    var xMax = 100;
    var axisColor = '#fff';
	var options = {
	    title: {
	        text: ''
	    },
	    tooltip: {
	        show: false,
	        formatter: "{c}%"

	    },
        xAxis: [{
            axisTick: {
                show: false,
                // color:'#fff',
            },
            axisLine: {
                show: false,
            },
            axisLabel: {
                show: false
                    //color:'#fff',
            },
            splitLine: {
                show: false,
                // color:'#fff',
            }
        }],
        yAxis: [{
            type: 'category',
            data: [],
            //max:3 ,//此属性结合series中最后一个barCategoryGap属性改变柱形直接间隔

            axisTick: {
                // color:'#fff',
                show: false,
            },
            axisLine: {
                //  color:'#fff',
                show: false,
            },
            axisLabel: {
            	show: false,
                textStyle: {
                    color: 'red',
                }
            }

        }],
        graphic: [],//图层
        grid:{
        	x:'4%',
        	x2:'3%',
        	y:'5%',
        	y2:'1%',
        },//位置
        series: [{
            name: ' ',
            type: 'bar',
            barWidth: erji_series_barWidth_10,
            barGap: '-100%',
            barCategoryGap: '50%',
            silent: true,
            itemStyle: {
                normal: {
                    color: 'rgba(102, 102, 102,0.5)',
                    barBorderRadius: [0, 5, 5, 0],

                }

            },
            data: data.map(function(d) {
                return xMax
            }),
        }, {
            name: ' ',
            type: 'bar',
            barWidth: erji_series_barWidth_10,
            label: {
                normal: {
                    show: true,//是否显示图形上的文本标签
                    position: [0, '-150%'],
                    color:echart_desc_color_black,
        			fontSize:15,
                    formatter: '{b}',
                }
            },
            data: [],
        }]
	};
	return options;	
}

/**
 * 折线图
 */
var getLineOption = function() {
	var chartOption = {
		color: [erji_color_1, erji_color_2, erji_color_3, erji_color_4, erji_color_5],
		legend: {
			show: true,
			orient: 'vertical',
			x: 'right',
			y: 'top',
			itemGap: 5
		},
		grid: {
			x: '15%', //直角坐标系内绘图网格左上角横坐标，数值单位px，支持百分比（字符串），如'50%'(显示区域横向中心)
			x2: '8%', //直角坐标系内绘图网格左上角纵坐标，数值单位px，支持百分比（字符串），如'50%'(显示区域纵向中心)
			y: '20%', //直角坐标系内绘图网格右下角横坐标，数值单位px，支持百分比（字符串），如'50%'(显示区域横向中心)
			y2: '15%',
		},
		tooltip: {
			trigger: 'axis', //触发类型，默认数据触发item，可选为：'item' | 'axis'
		},
		calculable: true,
		xAxis: [{
			name: '',
			type: 'category',
			splitLine: {
				show: false,
				// 改变轴线颜色
				lineStyle: {
					// 使用深浅的间隔色
					color: ['#4A4A4A']
				}
			},
		}],
		yAxis: [{
			name: '',
			type: 'value',
			splitLine: {
				show: true,
				// 改变轴线颜色
				lineStyle: {
					// 使用深浅的间隔色
					color: ['#4A4A4A']
				}
			},
			splitArea: {
				show: false
			}
		}],
		series: [{
			type: 'line',
			smooth: true,
			itemStyle: {
				normal: {
					areaStyle: { //堆积曲线图
						color: erji_series_line_styleLineArea_Color_2,
						type: 'default'
					},
					lineStyle: {
						width: 2,
						shadowColor: 'rgba(0,0,0,0.4)'
					}
				}
			}
		}, {
			type: 'line',
			smooth: true,
			itemStyle: {
				normal: {
					areaStyle: { //堆积曲线图
						color: erji_series_line_styleLineArea_Color_3,
						type: 'default'
					},
					lineStyle: {
						width: 2,
						shadowColor: 'rgba(0,0,0,0.4)'
					}
				}
			}
		}]
	};
	return chartOption;
};

/**
 * 扇形图
 * 饼图-默认实心饼图(radius是单个，radius : '65%')
 * 空心饼图则radius两个，radius:['50%', '70%']
 */
function pieCharts(){
	var options = {
		    title : {
	        text: '',
	        subtext: '',
	        x:'center'
	    },
	    tooltip : {
	        trigger: 'item',
	        formatter: "{a} <br/>{b} : {c} ({d}%)"
	    },
    	grid: {},
    	color:colorArr,
    	calculable: false,
	    legend: {
	        orient: 'vertical',
	        data: [],
        	x: 'right',
	        y: 'top',
	        itemGap:5,
	    },
	    series : [
	        {
	            name: '',
	            type: 'pie',
	            //radius : '65%',//实心  ,半径，支持绝对值（px）和百分比，百分比计算比，min(width, height) / 2 * 75%， 传数组实现环形图，[内半径，外半径]
	            radius : ['50%', '60%'],//空心
	            center: ['35%', '35%'],
	            data:[],
	            itemStyle:{ 
	                normal:{ 
	                      label:{ 
	                        show: false, 
	                        formatter: '{d}%' 
	                      }, 
	                      labelLine :{
	                    	  show:false,
	                    	  length:-50
	                    	  } 
	                    } 
                }	            
	        }
	    ]
	};
	return options;
}

/**
 * 柱形图
 */
function barCharts(){
	var chartOption = {
		color: [erji_color_1, erji_color_2, erji_color_3, erji_color_4, erji_color_5],
		legend: {
			data: [],
			x: 'right',
            y: 'top',  
            itemGap:5,
		},
		grid: {
			x: '15%', //直角坐标系内绘图网格左上角横坐标，数值单位px，支持百分比（字符串），如'50%'(显示区域横向中心)
			x2: '8%', //直角坐标系内绘图网格左上角纵坐标，数值单位px，支持百分比（字符串），如'50%'(显示区域纵向中心)
			y: '20%', //直角坐标系内绘图网格右下角横坐标，数值单位px，支持百分比（字符串），如'50%'(显示区域横向中心)
			y2: '15%',
		},
		tooltip: {
			trigger: 'axis', //触发类型，默认数据触发item，可选为：'item' | 'axis'
		},
		calculable: true,
		xAxis: [{
			name: '',
			type: 'category',
			scale:false,
			axisLabel :{
                interval:0
            },
		}],
		yAxis: [{
			name: '',
			type: 'value',
			scale:false
		}],
		series: [{
			type: 'bar',
			data:[]
		}, {
			type: 'bar',
			data:[]
		}]
	};
	return chartOption;
}

/**
 * 横向柱形图
 */
function hxBarCharts(){
	var chartOption = {
		color: [erji_color_1, erji_color_2, erji_color_3, erji_color_4, erji_color_5],
		tooltip : {
	        trigger: 'axis',//触发类型，默认数据触发item，可选为：'item' | 'axis'
	 	}, 
		legend: {
			orient: 'horizontal',
			data: [],
			x: 'right',
            y: 'top',  
            itemGap:5,
		},
		calculable: true, 
		grid: {
			x:'15%',//直角坐标系内绘图网格左上角横坐标，数值单位px，支持百分比（字符串），如'50%'(显示区域横向中心)
    		x2:'8%',//直角坐标系内绘图网格左上角纵坐标，数值单位px，支持百分比（字符串），如'50%'(显示区域纵向中心)
    		y:'20%',//直角坐标系内绘图网格右下角横坐标，数值单位px，支持百分比（字符串），如'50%'(显示区域横向中心)
    		y2:'15%',//直角坐标系内绘图网格右下角纵坐标，数值单位px，支持百分比（字符串），如'50%'(显示区域纵向中心)
		},
		toolbox: {
			show: false,
			feature: {
				mark: {
					show: true
				},
				dataView: {
					show: true,
					readOnly: false
				},
				magicType: {
					show: true,
					type: ['bar']
				},
				restore: {
					show: true
				},
				saveAsImage: {
					show: true
				}
			}
		},
		calculable: false,
		xAxis: [{
			type: 'value',
			data: [],
			scale:false
		}],
		yAxis: [{
			name:'',
			type: 'category',
			scale:false,
			splitArea: {
				show: true
			}
		}],
		series: [{
			type: 'bar',
			data:[]
		}, {
			type: 'bar',
			data:[]
		}]
	}
	return chartOption;
}

/**
 * 仪表盘
 */
function gaugeCharts(){
	var options = {
	    tooltip : {
	        formatter: "{a} <br/>{b} : {c}%"
	    },
	    graphic: [] ,//图层	
	    series: [
	        {
	            name: '',
	            type: 'gauge',
	            splitNumber : 10, // 分割段数，默认为10 
	            pointer : {  
                    width : 5  
                }, 
                radius: '100%',
                center:['50%', '50%'],	            
	            detail: {
	            	formatter:'{value}%',
	            	fontSize:15,
	            	padding:[35,0,0,0]		//文字位置
	            },
	            axisLine: { //仪表盘轴线样式
					/* lineStyle: {
						width: 10
					} */
	            	lineStyle : { // 属性lineStyle控制线条样式  
	            		color: [[0.2, '#ff4500'],[0.4, 'orange'],[0.8, 'skyblue'],[1, 'lightgreen']],  
                        width: 15 		//轴线宽度
                    } 
				},	  
				splitLine : { // 分隔线  
                    show : true, // 默认显示，属性show控制显示与否  
                    length : 15, // 属性length控制线长  
                    lineStyle : { // 属性lineStyle（详见lineStyle）控制线条样式  
                        color : 'auto'  
                    }  
                },				
	            data: []
	        }
	    ],
	};
	return options;
}

/**
 * 字浮云
 */
function wordCloudCharts(){
	var options = {
	    tooltip: {
	        show: true
	    },
	    series: [{
	        name: '诉求热词',//数据提示窗标题
            type: 'wordCloud',
            gridSize: 2,
            sizeRange: [12, 50],
            rotationRange: [-0, 0],
            shape: 'pentagon',
            width: 800,
            height: 300,
            drawOutOfBound: true,
	        data:  []
	    }]
	};
	return options;
}

