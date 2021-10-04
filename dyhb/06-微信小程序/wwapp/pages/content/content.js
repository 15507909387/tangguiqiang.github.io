// pages/content/content.js

const {
  request
} = require('../../utils/util.js')

// var indexs = index

Page({

  /**
   * 页面的初始数据
   */
  data: {

    title: [],
    section: [],
    show: false,
    order: '',
    booksid: '',
    config: wx.getStorageSync('config') || {
      size: 14,
      theme: 'white'
    },
    themes: [{
        name: '默认',
        text: 'white',
        bg: "#F7EED4"
      },
      {
        name: '复古',
        text: 'dark',
        bg: "#F7EED4"
      },
      {
        name: '护眼',
        text: 'huyan',
        bg: "#E1EEF2"
      },
      {
        name: '黑夜',
        text: 'ba',
        bg: "#161819"
      }
    ],

  },

  changeTheme(e) {
    this.setData({
      "config.theme": e.currentTarget.dataset.theme
    }, () => {
      this.closeAndSyncConfig()
    })
  },
  showPopup() {

    this.setData({
      show: true
    });
  },
  // 关闭弹出层时触发
  onClose() {
    this.setData({
      show: false
    });
  },

  // 上一章
  navTop() {
    console.log(this.data.order)
    var order = this.data.order
    order--
    this.setData({
      order: order
    })
    request({

      url: `http://novel.kele8.cn/chapters2/56a8303e2aefdf397cbbf831/${order}`
    }).then(res => {
      console.log(res);
      this.setData({
        title: res.data.title,
        section: res.data.cpContent
          .match(/<p>(.+?)<\/p>/gim)
          .map((item) => item.replace(/(<p>|<\/p>)/gim, ""))

      })
    })
    const old = wx.getStorageSync('chapterHistory') || {}
    old[this.data.booksid] = this.data.order
    wx.setStorageSync('chapterHistory', old)
  },

  // 下一章
  navBottom() {
    console.log(this.data.order)
    var order = this.data.order
    order++
    this.setData({
      order: order
    })
    request({

      url: `http://novel.kele8.cn/chapters2/56a8303e2aefdf397cbbf831/${order}`
    }).then(res => {
      console.log(res);
      this.setData({
        title: res.data.title,
        section: res.data.cpContent
          .match(/<p>(.+?)<\/p>/gim)
          .map((item) => item.replace(/(<p>|<\/p>)/gim, ""))

      })
    })
    const old = wx.getStorageSync('chapterHistory') || {}
    old[this.data.booksid] = this.data.order
    wx.setStorageSync('chapterHistory', old)
  },

  onChange(event) {
    // wx.showToast({
    //   icon: 'none',
    //   title: `当前值：${event.detail}`,
    // });    
    this.setData({
      "config.size": event.detail
    }, () => {
      this.closeAndSyncConfig()
    })
  },

  closeAndSyncConfig() {
    // this.setData({
    //   show: false
    // })

    wx.setStorageSync('config', this.data.config)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中',
    })
    console.log(options);
    request({

      url: `http://novel.kele8.cn/chapters2/56a8303e2aefdf397cbbf831/${options.order}`
    }).then(res => {
      console.log(res);
      this.setData({
        booksid: options.booksid,
        order: options.order,
        title: res.data.title,
        section: res.data.cpContent
          .match(/<p>(.+?)<\/p>/gim)
          .map((item) => item.replace(/(<p>|<\/p>)/gim, ""))

      })
    })
    const old = wx.getStorageSync('chapterHistory') || {}
    old[options.booksid] = options.order
    wx.setStorageSync('chapterHistory', old)

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