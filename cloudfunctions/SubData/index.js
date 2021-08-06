// 云函数入口文件
//初始化工作
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'env-z3zfw'
})
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
      const {OPENID} = cloud.getWXContext()
      const CityDB=db.collection('city')
      //获取表单数据
      const {city,cityid}=event
      const result=await CityDB.where({
        openid:OPENID,
        city:city
      }).get()
      // return result
      if(result.data.length===0){
        CityDB.add({
          data:{
            openid:OPENID,
            city:city,
            cityid:cityid,
            createdAt:new Date()
          }
        })
      }
  }