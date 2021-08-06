// 云函数入口文件
const cloud = require('wx-server-sdk')
cloud.init({
  env: 'env-z3zfw'
})
const db=cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const {OPENID} = cloud.getWXContext()
  const CityDB=db.collection('city')
  const result=await CityDB.where({
    openid:OPENID,
  }).get()
   return result
}