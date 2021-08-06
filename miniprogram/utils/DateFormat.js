//改变日期格式
export default function changeDateFormat(date) {
  let d = new Date(Date.parse(date))

  let h = d.getHours()
  h=h>12?`下午 ${h-12}`:`上午 ${h}`
  let m = d.getMinutes()
  m = m < 10 ? '0' + m : m
  let result =  h + ':' + m 
  return result
}