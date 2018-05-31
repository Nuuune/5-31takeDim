const nowTimestamp = () => {
  return new Date().getTime();
}

/**
 * 根据格式格式化date对象
 *
 * @param dateToFormat
 * @param format
 *
 * @return string 格式化的日期
 */
const formatDate = (dateToFormat, format) => {
  let date = {
    "M+": dateToFormat.getMonth() + 1,
    "d+": dateToFormat.getDate(),
    "h+": dateToFormat.getHours(),
    "m+": dateToFormat.getMinutes(),
    "s+": dateToFormat.getSeconds(),
    "q+": Math.floor((dateToFormat.getMonth() + 3) / 3),
    "S+": dateToFormat.getMilliseconds()
  };

  if (/(y+)/i.test(format)) {
    format = format.replace(RegExp.$1, (dateToFormat.getFullYear() + '').substr(4 - RegExp.$1.length));
  }

  for (var k in date) {
    if (new RegExp("(" + k + ")").test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
    }
  }
  return format;
}


/**
 * 将一个时间字符串格式显示友好时间（如，1分钟内，2分钟前等等）。 
 *
 * 规则：
 *   与当前时间相差60s以内(不包括60s)，显示刚刚；
 *   与当前时间相差60min以内(不包括60min)，显示XX分钟前；
 *   与当前时间相差24h以内(不包括24h)，显示XX小时前；
 *   与当前时间相差7d以内(不包括7d)，显示XX天前；
 *   与当前时间相差4w以内(不包括4w)，显示XX周前；
 *   发布时间为今年，显示MM-dd；
 *   发布时间不在今年， 显示yyyy-MM-dd;
 *
 */
const prettyTime = (time) => {
  let nowDate = new Date();
  let prettyDate = new Date(time);

  let nowTime = new Date().getTime() / 1000;
  let prettyTime = time / 1000;

  let diff = nowTime - prettyTime;
  let result = "";
  let fix = 0;

  // 刚刚：1分钟之内
  if (diff >= 0 && diff < 60) {
      result = "刚刚";
  } 
  // 分钟前：1小时之内
  else if (diff > 60 && diff < 60 * 60) {
      fix = Math.floor(diff / 60);
      result = fix + "分钟前";
  } 
  // 小时前：一天之内
  else if (diff > 60 * 60 && diff < 24 * 60 * 60) {
      fix = Math.floor(diff / (60 * 60));
      result = fix + "小时前";
  } 
  // 天前：一周之内
  else if (diff > 24 * 60 * 60 && diff < 7 * 24 * 60 * 60) {
      fix = Math.floor(diff / (24 * 60 * 60));
      result = fix + "天前";
  } 
  // 周前：一月之内
  else if (diff > 7 * 24 * 60 * 60 && diff < 28 * 24 * 60 * 60) {
      fix = Math.floor(diff / (24 * 7 * 60 * 60));
      result = fix + "周前";
  }
  // 具体日期：超过一个月，本年度内
  else if (nowDate.getFullYear() == prettyDate.getFullYear()) {
      result = formatDate(prettyDate, "MM月dd日 hh:mm");  
  } 
  // 具体日期：去年以前
  else {
      result = formatDate(prettyDate, "yyyy-MM-dd hh:mm");
  }

  return result;
}


const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatImage = (url, width, height) => {
  const size = width + "x" + height;

  return url + "?imageMogr2/auto-orient/thumbnail/!" + size + "r/gravity/Center/crop/" + size + "|imageView2/1/interlace/0/q/100";
}

/**
 * 判断变量是否为空
 *
 * @param value 变量
 * @return boolean
 */
const isEmpty = (value) => {
  //if it is json object
  if (typeof value === "object") {
    for (let t in value) {
      return false
    }
  }

  return (value == "") || (value == "null") || (value == "undefined") || (value === null) || (value === undefined) || ((toString.call(value) === '[object Array]') && value.length === 0);
}

/**
 * 判断变量是否为数字
 *
 * @param value 变量
 * @return boolean
 */
const isNumber = (value) => {
  return typeof value === 'number' && !isNaN(value)
}  


/**
 * Convert Array To Json
 */
const getWindowHeight = (cartItems) => {
  try {
    var res = wx.getSystemInfoSync();
    let height = Math.floor(res.windowHeight * 750 / res.screenWidth) + 1;

    console.log(height)
    
    return height;
  } catch (e) {
    // Do something when catch error
  }

  //console.log(res.screenHeight);

  //return res.windowHeight;
  return 0;
}

/**
 * Convert Array To Json
 */
const getWindowWidth = (cartItems) => {
  try {
    var res = wx.getSystemInfoSync()
  } catch (e) {
    // Do something when catch error
  }

  //console.log(res.screenWidth);

  return res.windowWidth;
}

module.exports = {
  formatImage: formatImage,
  isEmpty: isEmpty,
  getWindowHeight: getWindowHeight,
  getWindowWidth: getWindowWidth,
  formatDate: formatDate,
  isNumber: isNumber,
  prettyTime: prettyTime
}
