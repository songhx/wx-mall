var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');
var user = require('../../../services/user.js');
var app = getApp();

Page({
  data: {
    inputMobile :false, 
    mobile:'',
    userInfo: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    console.log(app.globalData)
  },
  onReady: function () {

  },
  onShow: function () {

    let userInfo = wx.getStorageSync('userInfo');
    let token = wx.getStorageSync('token');

    // 页面显示
    if (userInfo && token) {
      app.globalData.userInfo = userInfo;
      app.globalData.token = token;
    }
    this.setData({
      userInfo: app.globalData.userInfo,
      inputMobile: false,
    });

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },

  //显示编辑手机号码
  showBindMobile : function(){
    var _this = this;
    this.setData({
      inputMobile: true,
    })
  },
  //监听
  listenerMobile: function (e) {
    var _this = this;
    this.setData({
      mobile: e.detail.value,
    })
  },

  //绑定
  bind:function(){
    var that = this;
    if (that.data.mobile == ""){
      util.showErrorToast('请输手机号');
      return false;
    }
    util.request(api.BindMobile, {
      mobile: that.data.mobile
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        that.setData({
          mobile: "",
          inputMobile: false,
        })
        that.goLogin();

      } else {
        util.showErrorToast(res.errmsg);
      }
    });
  },

  //拨打客服电话
  callCFPhone: function (event) {
    //console.log("debug: 客服电话-----" + event.currentTarget.dataset.phone);
    wx.showModal({
      title: '提示',
      content: '即将为您拨通客服电话（' + event.currentTarget.dataset.phone + '）？',
      success: function (sm) {
        if (sm.confirm) {
          wx.makePhoneCall({
            phoneNumber: event.currentTarget.dataset.phone, //客服电话
            success: function () {
              console.log("拨打电话成功！")
            },
            fail: function () {
            }
          })
        } else if (sm.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },
  goLogin(){
    user.loginByWeixin().then(res => {
      this.setData({
        userInfo: res.data.userInfo
      });
      app.globalData.userInfo = res.data.userInfo;
      app.globalData.token = res.data.token;
    }).catch((err) => {
      console.log(err)
    });
  },
  exitLogin: function () {
    wx.showModal({
      title: '',
      confirmColor: '#b4282d',
      content: '退出登录？',
      success: function (res) {
        if (res.confirm) {
          wx.removeStorageSync('token');
          wx.removeStorageSync('userInfo');
          wx.switchTab({
            url: '/pages/index/index'
          });
        }
      }
    })

  }
})