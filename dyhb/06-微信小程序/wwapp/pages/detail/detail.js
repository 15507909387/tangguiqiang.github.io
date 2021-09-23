// pages/detail/detail.js
const {
  request
} = require('../../utils/util.js')

Page({

    /**
     * 页面的初始数据
     */
    data: {
      detail:null,
      comment:null,
      source: null
    },

    navtochapter:function(event) {
      wx.navigateTo({
        url: '/pages/catalog/catalog?id=' + event.currentTarget.dataset.id,
      })
      // console.log(event);
    },
    /**
     * 生命周期函数--监听页面加载
     */
    
    onLoad: function (options) {
      // console.log(options);
      request({
        url: "http://novel.kele8.cn/book-info/" + options.id
      }).then(res => {
        // console.log(res);
        this.setData({
          detail: res.data
        })     
      }),

      request({
        url: `https://api.zhuishushenqi.com/post/review/best-by-book?book=${options.id}&limit=8`
      }).then(res => {
        // console.log(res);
        this.setData({
          comment: res.data.reviews,
        })    
      })

      request({
        url: "http://novel.kele8.cn/book-sources?view=summary&book=" + options.id
    }).then(res => {
        // console.log(res);
        this.setData({
            source: res.data[0]._id
        })
    })   
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

    }
})