const app = getApp()
var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
Page({
	data: {
    balance:0,
    freeze:0,
    score:0,
    score_sign_continuous:0
  },
	onLoad() {
    
	},	
  onShow() {
    let userInfo = wx.getStorageSync('userInfo');
    let token = wx.getStorageSync('token');

    // 页面显示
    if (userInfo && token) {
      app.globalData.userInfo = userInfo;
      app.globalData.token = token;
    }

    this.setData({
      userInfo: app.globalData.userInfo,
    });
    
  },	
  



  recharge: function () {
    util.showErrorToast("功能暂未开放！");
    return false;
    // wx.navigateTo({
    //   url: "/pages/ucenter/recharge/index"
    // })
  },
  withdraw: function () {
    wx.navigateTo({
      url: "/pages/ucenter/withdraw/index"
    })
  }
})