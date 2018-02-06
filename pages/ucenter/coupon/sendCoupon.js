var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');



var app = getApp();

Page({
  data: {
    id:null,
    coupon: {}, //用户优惠券
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


  receiveCoupon: function () {
    let that = this;

    if (that.data.id == null) {
      util.showErrorToast('非法请求');
      return false;
    }
    util.request(api.ReceiveCoupon, {
      coupon_number: that.data.couponNumber
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        //跳转用户卡券页
        wx.navigateTo({
          url: '/pages/ucenter/coupon/coupon'
        })

      } else {
        util.showErrorToast(res.errmsg);
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
          coupon: res.data
        });
      }else{
      }
    });
  }


  
})