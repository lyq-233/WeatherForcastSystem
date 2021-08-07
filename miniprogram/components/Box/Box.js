// components/Box/Box.js
import {getHourWeather} from '../../api/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    futureWeather:{
      type:Array,
      value:[]
    },
    hours:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    week:[]
  },
  lifetimes: {
    // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
    attached: function () {
      this.GetDay()
     },
    moved: function () { },
    detached: function () { },
  },
  /**
   * 组件的方法列表
   */
  methods: {
    GetDay:function(){
      let day = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
      let week = new Date().getDay();
      let temp=day.splice(0,week)
      day=day.concat(temp)
      // console.log(day)
      this.setData({week:day})
    }
  }
})
