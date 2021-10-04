// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    hotBooks: null,
    complete: null,
    judge: true
  },

  // 输入内容变化时触发
  onChange(e) {  
    this.setData({
      value: e.detail,     
      judge: e.detail === ''
    });
    wx.request({
      url: `https://novel.kele8.cn/auto-complete?query=${this.data.value}`,
      success: (res) => {
        this.setData({
          complete: res.data
        })
      },
    })
  },

  // 确定搜索时触发
  onSearch() {
    // Toast('搜索' + this.data.value);
    
  },

  //点击搜索区域时触发
  onClick(e) {
    // Toast('搜索' + this.data.value);
    console.log(this.data.value);
  if(this.data.value !== ''){
    this.navkeywords(e)
  }
  },

  navValue: function(e) {
this.setData({
  value: e.currentTarget.dataset.item
})
  },

  navkeywords: function(e) {
    console.log(e);
    if(e.currentTarget.dataset.keywords.trim()){
      wx.navigateTo({
        url: '/pages/result/result?keywords=' + e.currentTarget.dataset.keywords
      })
    }
      
  },

  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://novel.kele8.cn/hot-books',
      success: (res) => {
        this.setData({
          hotBooks: res.data

        })
      },
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