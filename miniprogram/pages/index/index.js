//引入sdk核心类
var QQMapWX = require('../../utils/qqmap-wx-jssdk.js');
var qqmap
var timer
wx.cloud.init()
import {getCityId,getNowWeather,getNowAir,getFutureWeather,getHourWeather} from '../../api/index.js'
Page({
  /**
   * 页面的初始数据，页面中的回调函数应该与data同层级
   */
  data: {
    week:"",  //周几
    future_weather:[],  //未来几天的天气数组
    pm25_color:"skyblue",  //pm2.5的颜色显示
    airquality_color:"skyblue", //污染程度的颜色显示
    now_air:{}, //现在的空气质量
    now_weather:{}, //现在的天气
    cityid:0, //城市id
    city:"",
    latitude:0, //经纬度
    longitude:0,//经纬度
    bgImgSrc:""  //背景图片url
  },

//获取地理位置
Getlocation:function() {
  wx.getLocation({
    type: "gcj02",
    // isHighAccuracy:true,
    // highAccuracyExpireTime:4000,
    success: (res) => {
      //console.log(res)
      this.setData({
        latitude: res.latitude,
        longitude: res.longitude
      },()=>{
        this.getUserLocation()
      })
    },
  })
},
// 获取用户当前位置
 getUserLocation:function(){
  qqmap.reverseGeocoder({ //逆地址解析（经纬度 ==> 坐标位置）
    location: {
      latitude: this.data.latitude,
      longitude: this.data.longitude
    },
    success:(res)=> {
      // console.log(res)
      let value=res.result.address_component.city,vlength=value.length
      value[vlength-1]==='市'?value=value.substring(0,vlength-1):""
      this.setData({city:value},()=>{
      this.GetCityId();
      })
      //console.log(this.data.address_component)
    }
  })
},
//获取城市id
GetCityId:async function(){
  const {latitude,longitude}=this.data;
  const result=await getCityId(`${longitude},${latitude}`,"9a01cb7787194bb6b7ea4dd490255823");
  this.setData({cityid:result.location[0].id},()=>{
    this.GetNowWeather();
    this.GetNowAir();
    this.GetFutureWeather();
  }) 
},
//获取当前天气
GetNowWeather:async function(){
  const {cityid}=this.data;
  const result=await getNowWeather(cityid,"9a01cb7787194bb6b7ea4dd490255823");
  // console.log(result,cityid)
  // result.now.text=result.now.text
  result.now.temp=result.now.temp+'°'
  this.setData({now_weather:result.now})
  if(result.now.icon>=100&&result.now.icon<200){
    this.setData({ bgImgSrc:"https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qckozf/e73a719130b13b54_1620575609810.jpg"})
  }else if(result.now.icon>=300&&result.now.icon<400){
    if(result.now.icon==305){ //小雨
      this.setData({ bgImgSrc:"https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qckozf/f13aec5374e3e87a_1620658686588.gif"})
    }else if(result.now.icon>=302&&result.now.icon<=304){ //雷阵雨
      this.setData({ bgImgSrc:"https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qckozf/c016135f6afa18cd_1620660682333.gif"})
    }else{ //大雨
      this.setData({ bgImgSrc:"https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qckozf/a4e739166889276d_1620659107019.gif"})
    }
  }else if(result.now.icon>=400&&result.now.icon<500){ //雪天
    this.setData({ bgImgSrc:"https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qckozf/bceffad0fd514762_1620659016917.gif"})
  }else if(result.now.icon>=500&&result.now.icon<600){ //雾天
    this.setData({ bgImgSrc:"https://sf1-ttcdn-tos.pstatp.com/obj/larkcloud-file-storage/baas/qckozf/be5e7e749fc0ee08_1620661556494.jpg"})
  }
},
//获取当前空气质量
GetNowAir:async function(){
  const {cityid}=this.data;
  const result=await getNowAir(cityid,"9a01cb7787194bb6b7ea4dd490255823");
  result.now.primary= result.now.primary==='NA'?'无':result.now.primary
  // console.log(result.now)
  //根据空气质量设置颜色显示
  if(result.now.pm2p5>90){
    this.setData({pm25_color:"red"})
  }else if(result.now.pm2p5>75){
    this.setData({pm25_color:"orange"})
  }
  if(result.now.aqi>100&&result.now.aqi<=150){
    this.setData({airquality_color:"yellow"})
  }else if(result.now.aqi>150&&result.now.aqi<=200){
    this.setData({airquality_color:"orange"})
  }else if(result.now.aqi>200){
    this.setData({airquality_color:"red"})
  }
  this.setData({now_air:result.now})
},
//获取未来三天的天气
GetFutureWeather:async function(){
  const {cityid}=this.data;
  const result=await getFutureWeather(cityid,"9a01cb7787194bb6b7ea4dd490255823");
  // console.log(result)
  result.daily.map((dailyObj)=>{
    dailyObj.iconDay="../../icons/"+dailyObj.iconDay+".png"
    dailyObj.iconNight="../../icons/"+dailyObj.iconNight+".png"
  })
  //console.log(result.daily)
  this.setData({future_weather:result.daily})
},
//星期几
GetDay:function(){
  let day = ["日", "一", "二", "三", "四", "五", "六"];
  let week = new Date().getDay();
  week="星期"+day[week];
  this.setData({week});
},
changePath:function(){
  wx.redirectTo({
    url: '../addcity/addcity'
  })
},
Subdata:function(){
  const {city,cityid}=this.data
   //调用云函数提交表单
   wx.cloud.callFunction(
    {
      name:"SubData",
      data:{
        city:city,
        cityid:cityid
      }
    }
    ).then(res=>{
      // console.log(res)
    }).catch(err=>{
      // console.log(err)
    })
  },
  checkLoad:function(){
    wx.hideLoading({
      success: (res) => {
        // this.setData({display:"block"})
        this.Subdata();
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '正在加载',
    })
    if(Object.getOwnPropertyNames(options).length !== 0){
      // console.log(options)
      this.setData({
        cityid:options.cityid,
        city:options.city
      },()=>{
        this.GetNowWeather();
        this.GetNowAir();
        this.GetFutureWeather();
      })
    }else{
     // 实例化API核心类
     qqmap = new QQMapWX({
      key: 'IHPBZ-YIZK3-L5X3A-YLBUG-QXLF5-N5B4D' // 密匙
    })
    this.Getlocation();
    }
    this.GetDay();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    clearTimeout(timer) //清除定时器
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})