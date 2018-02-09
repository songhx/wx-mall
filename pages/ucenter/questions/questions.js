var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    releaseImageServer: app.globalData._releaseServerURL + 'image/weixin', // 资源服务地址
    basickQs : [
      {
        title: "1.购买运费如何收取？",
        contents: "单笔订单，每单收取10元运费。(港澳台地区除外）",
        isExpanded: false,
      },
      {
        title: "2.使用什么快递发货？",
        contents: "有礼默认使用顺丰快递发货（个别商品使用其他快递），配送范围覆盖全国大部分地区",
        isExpanded: false,
      }
    ],

    servantQs: [
      {
        title: "1.如何申请退货?",
        contents: "自收到商品之日起30日内，顾客可申请退货，退款线下操作，不同的银行处理时间不同",
        isExpanded: false,
      },
      {
        title: "2.如何开具发票？?",
        contents: "支持线下发票开具业务",
        isExpanded: false,
      },
      
    ],

     
  
  },
  /*********************************页面事件监听开始*****************************/
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

  /*********************************页面事件监听结束*****************************/


  /*********************************页面逻辑方法开始*****************************/
    //收缩
    toggleItem :function(e){
      var _this = this;
      var index = e.currentTarget.dataset.index;
      var type = e.currentTarget.dataset.type;
      console.log("index ----" + index);
      console.log("type ---" + type);
      var tmpArr = _this.data.basickQs;
      if (type == 'servant'){
        tmpArr = _this.data.servantQs;
      }
      for (var i = 0; i < tmpArr.length; i++ ){
        if (index == i){
          tmpArr[i].isExpanded = tmpArr[i].isExpanded ? false : true;
         }else{
          tmpArr[i].isExpanded = false;
         }
      }
      
      if (type == 'servant') {
        this.setData({
          servantQs: tmpArr,
        });
      }else{
        this.setData({
          basickQs: tmpArr,
        });
      }
    }

  /*********************************页面逻辑方法结束*****************************/
})