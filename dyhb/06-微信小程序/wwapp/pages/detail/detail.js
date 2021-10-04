// pages/detail/detail.js
const {
  request
} = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: null,
    comment: null,
    source: null,
    isExit: false,
    id: ''
  },
// 开始阅读
    navtoread: function (event) {
   
    wx.navigateTo({
        url: `/pages/content/content?booksid=${this.data.id}&order=${wx.getStorageSync('chapterHistory')[this.data.id] || 1 }`
    })
},

  addShelf: function () {
    // console.log(this.getisExit())
    if (!this.getisExit(this.data.id)) {
      // 不存在时
      var old = wx.getStorageSync('shelf') || []
      wx.setStorageSync('shelf', [...old, {
        ...this.data.detail
      }])
      this.setData({
        isExit: this.getisExit(this.data.id)
      })
    }
  },

  removeShelf: function() {
    if (this.getisExit(this.data.id)) {
    var old = wx.getStorageSync('shelf') || []
    // console.log(this.data.id)
    var navFhelf = old.filter(item => item._id !== this.data.id)

    this.setData({
      isExit: !this.getisExit(this.data.id)
    })
    wx.setStorageSync('shelf' , navFhelf)
    }
  },

  getisExit: function(id) {
    var old = wx.getStorageSync('shelf') || []
    // console.log(old)

    var isExit = old.find(item => item._id === id)   
  
    return isExit
  },

  navtochapter: function (event) {
    wx.navigateTo({
      url: '/pages/catalog/catalog?id=' + event.currentTarget.dataset.id + '&booksid=' + event.currentTarget.dataset.booksid,
    })
    // console.log(event);
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    // console.log(options);
    wx.showLoading({
      title: '加载中',
    })
    this.setData({
      id: options.id
    })
    request({
        url: "http://novel.kele8.cn/book-info/" + options.id
      }).then(res => {
        // console.log(res);
        this.setData({
          detail: res.data
        })
      })

      var isExit = this.getisExit(options.id)
      this.setData({
        isExit : isExit
      })

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

    setTimeout(function () {
      wx.hideLoading()
    }, 2000)
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