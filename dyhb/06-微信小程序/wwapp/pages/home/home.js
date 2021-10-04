// pages/home/home.js
const {
  request
} = require('../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    gender: 'male',
    banners: {
      male: [{
          bookid: "",
          url: "https://plf-new.zhuishushenqi.com/management/images/20210209/d55ce1e6f7584005820dff309b388917.png",
        },
        {
          bookid: "",
          url: "https://plf-new.zhuishushenqi.com/management/images/20210209/d57b17f1f3f7478ba1879fb631005e1a.jpg",
        },
        {
          bookid: "",
          url: "https://plf-new.zhuishushenqi.com/management/images/20210209/d57b17f1f3f7478ba1879fb631005e1a.jpg",
        },
      ],
      female: [{
          bookid: "",
          url: "https://plf-new.zhuishushenqi.com/management/images/20210209/2b5e4d4b08d9479db00720a486444994.jpg",
        },
        {
          bookid: "",
          url: "https://plf-new.zhuishushenqi.com/management/images/20201204/c48aa5482db346e9837df790c6cf6116.jpg",
        },
        {
          bookid: "",
          url: "https://plf-new.zhuishushenqi.com/management/images/20201127/2b8b5e6886ba472c9d6baea14de138b4.png",
        },
      ],
    },
    recommend: {
      male: [],
      female: [],
    },
    hotwords: []
  },

  changeGender: function (event) {
    // console.log(event);
    this.setData({

      gender: event.currentTarget.dataset.gender || "male"
    })
    this.getDataByGender(event.currentTarget.dataset.gender || "male")
  },

  getDataByGender: function (gender) {
    if (gender === "male" && !this.data.recommend.male.lenght) {
      this.getHomeMale().then(res => {
        this.setData({
          "recommend.male": res.map((item) => item.data.ranking)
        })
      })
    } else if (gender === "female" && !this.data.recommend.male.lenght) {
      this.getHomeFemale().then(res => {
        this.setData({
          "recommend.female": res.map((item) => item.data.ranking)
        })
      })
    }
  },


  getHomeMale: function () {
    return Promise.all([
      request({
        url: "http://novel.kele8.cn/rank/564d8494fe996c25652644d2"
      }),
      request({
        url: "http://novel.kele8.cn/rank/564eea0b731ade4d6c509493"
      }),
      request({
        url: "http://novel.kele8.cn/rank/564eeeabed24953671f2a577"
      }),
    ]);
  },
  getHomeFemale: function () {
    return Promise.all([
      request({
        url: "http://novel.kele8.cn/rank/564d85b6dd2bd1ec660ea8e2"
      }),
      request({
        url: "http://novel.kele8.cn/rank/564eeae6c3345baa6bf06e38"
      }),
      request({
        url: "http://novel.kele8.cn/rank/564eeeca5e6ba6ae074f10ec"
      })
    ]);
  },

  navseqrch: function () {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var gender = options.gender || 'male'
    this.getDataByGender(gender)
    request({
      url: 'https://novel.kele8.cn/search-hotwords'
    }).then(res => {
      this.setData({
        hotwords: res.data
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