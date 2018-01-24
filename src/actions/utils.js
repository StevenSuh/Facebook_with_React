export const filterTime = (time) => {
  time = parseInt(time, 10);
  const given = new Date(time);
  const now = new Date();

  if (now.getTime() - time <= 86400000) {
    let hour = given.getHours();
    let ampm = (hour >= 12) ? 'pm' : 'am';
    hour = (hour % 12) || 12;
    let minute = given.getMinutes();

    minute = (minute < 10) ? '0'+minute : minute;

    return hour + ':' + minute + ampm;
  } else if (now.getTime() - time <= 604800000) {
    switch (given.getDay()) {
      case 0:
        return 'Mon';
      case 1:
        return 'Tue';
      case 2:
        return 'Wed';
      case 3:
        return 'Thu';
      case 4:
        return 'Fri';
      case 5:
        return 'Sat';
      case 6:
        return 'Sun';
      default:
        return '';
    }
  } else {
    let str = '';
    switch (given.getMonth()) {
      case 0:
        str += 'Jan ';
        break;
      case 1:
        str += 'Feb ';
        break;
      case 2:
        str += 'Mar ';
        break;
      case 3:
        str += 'Apr ';
        break;
      case 4:
        str += 'May ';
        break;
      case 5:
        str += 'Jun ';
        break;
      case 6:
        str += 'Jul ';
        break;
      case 7:
        str += 'Aug ';
        break;
      case 8:
        str += 'Sep ';
        break;
      case 9:
        str += 'Oct ';
        break;
      case 10:
        str += 'Nov ';
        break;
      case 11:
        str += 'Dec ';
        break;
      default:
        break;
    }
    return str + given.getDate();
  }
}

export const filterMessage = (msg) => {

}

export const determineColor = (el, select) => {
  
}

export const hexToRgb = (hex) => {
  console.log(hex);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}
// util
// function matchUnicode(code) {
  // switch (code) {

  // }
// }