var util = require('../../utils/util.js')

const db = wx.cloud.database()
Page({
  data: {
    logs: [],
    modalHidden: true,
    toastHidden: true
  },


  

  onShow: function() {

    wx.setNavigationBarTitle({
      title: '任务记录'
    })
    this.getLogs()
  },
  
//大概是这里要改
// 改时间格式
  getLogs: function() {
    

    db.collection("hello").get({
      success:res=>{


        let logs = res.data

        logs.forEach(function (item, index, arry) {
          item.log.startTime = new Date(item.log.startTime).toLocaleString()
        })
        this.setData({
          logs: logs

        })     


      }
      
    })
    
  },
  onLoad: function() {
  },
  switchModal: function() {
    this.setData({
      modalHidden: !this.data.modalHidden
    })
  },
  hideToast: function() {
    this.setData({
      toastHidden: true
    })
  },


  clearLog: function(e) {
    // wx.setStorageSync('logs', [])
   

    wx.cloud.callFunction({
      name: 'remove'// 这里要和云函数的名字一致
 
    }).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })



    this.switchModal()
    this.setData({
      toastHidden: false
    })
    this.getLogs()
  }
})
