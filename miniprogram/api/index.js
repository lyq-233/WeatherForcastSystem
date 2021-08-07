import ajax from './ajax.js'
//获取当前城市id
export const getCityId=(location,key)=>ajax('https://geoapi.qweather.com/v2/city/lookup',{location,key},'GET')
//获取当前天气
export const getNowWeather=(cityid,key)=>ajax('https://devapi.qweather.com/v7/weather/now',{location:cityid,key},'GET')
//获取当前空气质量
export const getNowAir=(cityid,key)=>ajax('https://devapi.qweather.com/v7/air/now',{location:cityid,key},'GET')
//获取未来7天内的天气
export const getFutureWeather=(cityid,key)=>ajax('https://devapi.qweather.com/v7/weather/7d',{location:cityid,key},'GET')
//模糊搜索城市名
export const getCityName=(city,key)=>ajax('https://geoapi.qweather.com/v2/city/lookup',{location:city,key},'GET')
//24小时天气预测
export const getHourWeather=(cityid,key)=>ajax('https://devapi.qweather.com/v7/weather/24h',{location:cityid,key},'GET')
//生活指数
export const getLifeTips=(cityid,key,type)=>ajax('https://devapi.qweather.com/v7/indices/1d',{location:cityid,key,type},'GET')