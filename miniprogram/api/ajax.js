export default function ajax(url,data,method){
  //console.log(location,key)
  return new Promise(function (resolve, reject) {
    wx.request({
      url,
      data,
      method,
      success:(res)=>{
        resolve(res.data)
      },
      fail:(err)=>{
        console.log(err)
      }
    })
  })
}