// pages/search/search.js
wx.cloud.init()
import { getCityName} from '../../api/index'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isfocus:false,
    found_city:[]
  },
  gotoAddcity:function(e){
    const {name,id}=e.target.dataset.text
   //调用云函数提交表单
   wx.cloud.callFunction(
    {
      name:"SubData",
      data:{
        city:name,
        cityid:id
      }
    }
    ).then(res=>{
      wx.redirectTo({
        url: '../addcity/addcity',
      })
    }).catch(err=>{
      // console.log(err)
    })
  },

  requireData:async function(e){
    const result=await getCityName(e.detail.value,"9a01cb7787194bb6b7ea4dd490255823");
    // console.log(result)
    this.setData({found_city:result.location})
  },
  changefocus:function(){
    this.setData({
      isfocus:!this.data.isfocus
    })
  },
  cancelfocus:function(){
    if(this.data.isfocus===true){
      this.setData({
        isfocus:false,
      },()=>{
        wx.redirectTo({
          url: '../addcity/addcity',
        })
      })
    }else{
      wx.redirectTo({
        url: '../addcity/addcity',
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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