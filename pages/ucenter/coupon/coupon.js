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
  //折现
  discount : function(e){
    let that = this;
    wx.showModal({
      title: '',
      content: '一旦折换不能转送和恢复成礼品卡！您确定要将此礼品卡折换成账户现金吗？',
      success: function (res) {
        if (res.confirm) {
          util.request(api.UserDiscount, {
            id: e.currentTarget.dataset.userCouponId,
            coupon_id:e.currentTarget.dataset.couponId,
            coupon_code_id: e.currentTarget.dataset.couponcodeId
          }, 'POST').then(function (res) {
            if (res.errno === 0) {
              that.getCouponList();
            } else {
              util.showErrorToast(res.errmsg);
            }
          });
        }
      }
    })
   
  
  }
})