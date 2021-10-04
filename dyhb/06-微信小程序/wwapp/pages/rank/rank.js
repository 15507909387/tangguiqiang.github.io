// pages/rank/rank.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        rank: [],
        rankId: '',
        books: '',
        gender: 'male',
    },

    navtodetail: function(event) {
        wx.showLoading({
            title: '加载中',
          })
        // console.log(event.currentTarget.dataset.id)
        wx.navigateTo({
          url: '/pages/detail/detail?id=' + event.currentTarget.dataset.id,
        })
        setTimeout(function () {
            wx.hideLoading()
          }, 2000)
    },


    navrank: function (e) {
        console.log(e)
        this.setData({
            rankId: e.currentTarget.dataset.id
        }, () => {
            this.navBooks()
        })

    },

    navGender: function (event) {
        console.log(event)
        this.setData({
            gender: event.currentTarget.dataset.gender
        })
    },

    navBooks: function () {
        console.log(this.data.rankId)
        wx.request({
            url: `http://novel.kele8.cn/rank/${this.data.rankId}`,
            success: (res) => {
                // console.log(res);
                this.setData({
                    books: res.data.ranking.books
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        this.setData({
            rankId: '54d42d92321052167dfb75e3'

        })
        wx.request({
            url: 'https://novel.kele8.cn/rank-category',
            success: (res) => {
                console.log(res);
                this.setData({
                    rank: res.data
                })
            }
        })

        // console.log(this.data.rank)
        this.navBooks()
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