var util = require('../../../utils/util.js');
var api = require('../../../config/api.js');



var app = getApp();

Page({
  data: {
    help_status: false,
    couponNumber:"",
    couponList : [] , //用户优惠券列表
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {
    let that = this;
    that.getCouponList();
  },
 
 //分享转赠
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      ///转送开始
      return {
        title: '好礼-转送' + res.target.dataset.name + '礼品卡',
        desc: '好礼专注礼品服务，送好礼上好礼！',
        path: '/pages/ucenter/coupon/sendCoupon?id=' + res.target.dataset.usercouponid,
        success: function (rss) {
          ///成功，修改用户优惠券转送状态
          util.request(api.SendCoupon, {
            id: res.target.dataset.usercouponid
          }, 'POST').then(function (r) {
            if (r.errno === 0) {
            } else {
              util.showErrorToast(r.errmsg);
            }
          });
        },
        fail: function (rr) {
          console.log(rr);
        }
      }
    }
  },

  ///去使用
  toUse:function(e){
    wx.switchTab({
      url: "/pages/index/index"
    }); 
  },

  clearCouponNumber :function(){
    this.setData({
      couponNumber: "",
    })
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
            id: e.currentTarget.dataset.usercouponid,
            coupon_id:e.currentTarget.dataset.couponid,
            coupon_code_id: e.currentTarget.dataset.couponcodeid
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
   
  
  },
  tapHelp: function (e) {
    if (e.target.id == 'help') {
      this.hideHelp();
    }
  },
  showHelp: function (e) {
    this.setData({
      'help_status': true
    });
  },
  hideHelp: function (e) {
    this.setData({
      'help_status': false
    });
  }
})