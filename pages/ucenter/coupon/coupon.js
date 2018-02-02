var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');



var app = getApp();

Page({
  data: {
    couponNumber:"",
    couponList : [] , //用户优惠券列表
  },
  onLoad: function (options) {
    let that = this;
    that.getCouponList();
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {
    // 页面隐藏

  },
  onUnload: function () {
    // 页面关闭
  },

  ///去使用
  toUse:function(e){
    wx.switchTab({
      url: "/pages/index/index"
    }); 
  },

  //监听兑换码
  listenerCouponNumber:function(e){
    var _this = this;
    this.setData({
      couponNumber: e.detail.value,
    })
  },

  exchangeCoupon: function(){
    let that = this;

    if (that.data.couponNumber == "") {
      util.showErrorToast('请输兑换码');
      return false;
    }

    util.request(api.ExchangeCoupon, {
      coupon_number: that.data.couponNumber
    }, 'POST').then(function (res) {
      if (res.errno === 0) {
        that.setData({
          couponNumber: "",
        })
        that.getCouponList();
        
      }else{
        util.showErrorToast(res.errmsg);
      }
    });
  },

  //获取优惠券列表
  getCouponList() {
    let that = this;
    util.request(api.CouponList).then(function (res) {
      if (res.errno === 0) {
        //console.log(res.data);
        that.setData({
          couponList: res.data
        });
      }
    });
  },
})