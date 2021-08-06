// pages/addcity/addcity.js
wx.cloud.init()
import {getNowWeather} from '../../api/index.js'
import changeDateFormat from '../../utils/DateFormat'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    allcity:[]
  },
  gotoSearch:function(){
    wx.redirectTo({
      url: '../search/search',
    })
  },
  getAllCity:function(){
    var that=this
   //调用云函数提交表单
   wx.cloud.callFunction(
    {
      name:"getData",
    }
    ).then(res=>{
      this.setData({allcity:res.result.data},()=>{
        that.getNowWeather()
      })
    }).catch(err=>{
      console.log(err)
    })
  },
  getNowWeather:async function(){
    const {allcity}=this.data
    let result
    for(let i=0;i<allcity.length;i++){
        result=await getNowWeather(allcity[i].cityid,"9a01cb7787194bb6b7ea4dd490255823");
        allcity[i].temp=result.now.temp+'°'
        allcity[i].nowdate=changeDateFormat(new Date())
        // console.log(allcity)
        this.setData({allcity})
    }
  },
  gotoMain:function(e){
    let {cityid,city}=e.currentTarget.dataset.text
    wx.redirectTo({
      url: `../index/index?cityid=${cityid}&city=${city}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    
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
    this.getAllCity()
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