	/**
	 * 根据long类型的时间戳，转换为一个String类型的描述性时间 通话记录如果发生在今天：“15：30” 发生在昨天：“昨天8:23”
	 * 发生在前天：“前天4:56” 更早： “2016/04/15”
	 * @param {Object} timeStample
	 */
	function getTime(timeStample) {
		// 得到现在的时间戳
		var now = new Date().getTime();
		var day = Math.round(now / 1000 / 60 / 60 / 24 - timeStample / 1000 / 60 / 60 / 24);
		if (day > 7) {
			var oDate = new Date(timeStample),  
            oYear = oDate.getFullYear(),  
            oMonth = oDate.getMonth()+1,  
            oDay = oDate.getDate(),  
            oHour = oDate.getHours(),  
            oMin = oDate.getMinutes(),  
            oSen = oDate.getSeconds(),  
            oTime = oYear +'/'+ getzf(oMonth) +'/'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间  
            return oTime;  
		} else {
			switch (day) {
			// 如果是0这则说明是今天,显示时间
			case 0:
				var oDate = new Date(timeStample),  
	            oHour = oDate.getHours(),  
	            oMin = oDate.getMinutes(),  
	            oTime = getzf(oHour) +':'+ getzf(oMin);//最后拼接时间  
	            return oTime;  
			// 如果是1说明是昨天,显示昨天+时间
			case 1:
				var oDate = new Date(timeStample),  
	            oHour = oDate.getHours(),  
	            oMin = oDate.getMinutes(),  
	            oTime = getzf(oHour) +':'+ getzf(oMin);//最后拼接时间  
				return "昨天" + oTime;
			// 如果是1说明是前天,显示前天+时间
			case 2:
				var oDate = new Date(timeStample),  
	            oHour = oDate.getHours(),  
	            oMin = oDate.getMinutes(),  
	            oTime = getzf(oHour) +':'+ getzf(oMin);//最后拼接时间  
				return "前天" + oDate;
			// 结果大于2就只显示年月日
			default:
				var oDate = new Date(timeStample),  
	            oHour = oDate.getHours(),  
	            oMin = oDate.getMinutes(),  
	            oTime = getzf(oHour) +':'+ getzf(oMin);//最后拼接时间 
				return getWeekOfDate(timeStample) + oDate;
			}
		}
	}
	
	  /**
	   * 补0操作
	   * @param {Object} num
	   */
      function getzf(num){  
          if(parseInt(num) < 10){  
              num = '0'+num;  
          }  
          return num;  
      }

	/**
	 * 日期转时间戳
	 * @param {Object} date
	 */
	function datetimeToLong(date) {
		var t = new Date(date).getTime();
		return t;
	}

	/**
	 * 将日期转特定格式的日期字符串
	 * @param {Object} date
	 */
	function getdate(date){
		var s = getTime(datetimeToLong(date));
		return s;
	}

	/**
	 * 星期一到星期日
	 * @param {Object} time
	 */
	function getWeekOfDate(time) {
		var date = new Date(time);
		var week;
		if(date.getDay() == 0) week = "星期日";
	    if(date.getDay() == 1) week = "星期一";
	    if(date.getDay() == 2) week = "星期二";
	    if(date.getDay() == 3) week = "星期三";
	    if(date.getDay() == 4) week = "星期四";
	    if(date.getDay() == 5) week = "星期五";
	    if(date.getDay() == 6) week = "星期六";
	    return week; 
	}
	

    /**
     * 计算两个时间相差多少分钟
     *
     * @param before
     * @param after
     * @return
     */
    function getMinByTwoDate(before, after) {
        var min = Math.abs(new Date(after)-new Date(before))/1000/60;
        return min;
    }
