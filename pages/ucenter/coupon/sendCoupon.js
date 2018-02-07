var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');



var app = getApp();

Page({
  data: {
    id:null,
    coupon: {}, //用户优惠券
    promptHide : true,
    title : '领取礼品卡提示',
    text :'',
    icon: '/static/images/iconfont-empty.png',
  },
  onLoad: function (options) {
    let that = this;
    this.setData({
      id: options.id,
    })
    that.getCoupon(); //获取卡券
  },

  onReady: function () {

  },
  onShow: function () {

  },

  goHome: function(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  //接受卡券
  receiveCoupon: function () {
    let that = this;

    if (that.data.id == null) {
      util.showErrorToast('非法请求');
      return false;
    }
    util.request(api.ReceiveCoupon, {
      id: that.data.id
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        //领取成功
        that.setData({
          promptHide: false,
          icon: '/static/images/iconfont-order.png',
          text: '恭喜您领取礼品卡成功',
        });

      } else {
        //领取失败
        that.setData({
          promptHide: false,
          text: res.errmsg,
        });
      }
    });
  },

  //获取优惠券
  getCoupon() {
    let that = this;
    util.request(api.CouponInfo, {
      id: that.data.id
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        that.setData({
          promptHide:true,
          coupon: res.data
        });
      }else{
        that.setData({
          promptHide: false,
          text: res.errmsg,
        });
      }
    });
  }


  
})