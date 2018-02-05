const util = require('../../utils/util.js');
const api = require('../../config/api.js');
const user = require('../../services/user.js');

//获取应用实例
const app = getApp()
Page({
  data: {
    newGoods: [],
    hotGoods: [],
    topics: [],
    brands: [],
    floorGoods: [],
    banner: [],
    navs:[
      {
        id : 1,
        name:'兑换',
        url:'/pages/ucenter/coupon/coupon',
        icon_url:'/static/images/hdh.png',
        way: 0,
      },
      {
        id: 2,
        name: '好礼',
        url: '/pages/hotGoods/hotGoods',
        icon_url: '/static/images/hjf.png',
        way: 0,
      },
      {
        id: 3,
        name: '送礼',
        url: '/pages/cart/cart',
        icon_url: '/static/images/hcz.png',
        way: 1,
      },
      {
        id: 4,
        name: '提现',
        url: '/pages/ucenter/withdraw/index',
        icon_url: '/static/images/htx.png',
        way:0,
      },
    ],
  },
  onShareAppMessage: function () {
    return {
      title: 'NideShop',
      desc: '送好礼',
      path: '/pages/index/index'
    }
  },

  getIndexData: function () {
    let that = this;
    util.request(api.IndexUrl).then(function (res) {
      if (res.errno === 0) {
        that.setData({
          newGoods: res.data.newGoodsList,
          hotGoods: res.data.hotGoodsList,
          topics: res.data.topicList,
          brand: res.data.brandList,
          // floorGoods: res.data.categoryList,
          banner: res.data.banner
        });
      }
    });
  },

  //导航跳转
  navTo: function (e) {
    //跳转TabBar路径
    if (e.currentTarget.dataset.way == 1 ) {
        wx.switchTab({
          url: e.currentTarget.dataset.url
        });  
    } else {
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
        success: function (res) {
        },
        fail: function (e) {
          console.log("error--", e);
        }
      })
    }
  },
  onLoad: function (options) {
    this.getIndexData();
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
})
