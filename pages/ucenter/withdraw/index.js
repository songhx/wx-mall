var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    amount: 0.00,
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
  
  },
  //监听
  listenerAmount: function (e) {
    var _this = this;
    this.setData({
      amount: e.detail.value,
    })
  },

  bindCancel: function () {
    wx.navigateBack({})
  },
  bindSave: function (e) {
    var that = this;
    var amount = that.data.amount;

    if (amount == "" || amount * 1 < 100) {
      wx.showModal({
        title: '错误',
        content: '请填写正确的提现金额',
        showCancel: false
      })
      return
    }
    
    //提现申请成功
    wx.showModal({
      title: '',
      content: '您确定要提现吗？',
      success: function (res) {
        if (res.confirm) {
          util.request(api.WithDrawReq, {
            money: amount
          }, 'POST').then(function (res) {
            if (res.errno === 0) {
              this.setData({
                amount: 0.00,
              })
              wx.showToast({
                title: "提现申请发送成功，请保持通信畅通，耐心等待平台为您发放现金！"
              })
            } else {
              util.showErrorToast(res.errmsg);
            }
          });
        }
      }
    })
  }
})