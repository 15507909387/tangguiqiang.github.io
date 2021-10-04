// pages/catalog/catalog.js
const {
    request
} = require('../../utils/util.js')

var cs = null;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        section: null,
        booksid: null,
        page: 0,
        add: null,
        tion: true
    },

    navdaoxu:function() {
        this.setData({
            tion: false,
            section: this.data.section.reverse()
        })
    },
    navadd: function() {
        this.setData({
            tion: true,
            section: this.data.section.reverse()
        })
    },

    navsection: function (event) {
        console.log(event);
        wx.navigateTo({
            url: '/pages/content/content?booksid=' + this.data.booksid + '&order=' + event.currentTarget.dataset.order,
        })
        // var index = parseInt(event.currentTarget.dataset.index);
        // console.log('index' + index);
        // console.log(event);
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(options);
      this.setData({
          booksid:options.booksid
      })
        request({
            url: "http://novel.kele8.cn/book-chapters/" + options.id
        }).then(res => {
            // console.log(res);
            cs = res.data.chapters,
                this.setData({
                    // section: res.data.chapters
                    add: cs,
                    section: cs.splice(0, 100),
                    id: options.id

                    //  var sections = section.splice(0,100)

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
        console.log("触底");
        this.setData({
            page: this.data.page + 1
        }, () => {
            this.setData({
                section: [...this.data.section, ...cs.slice(this.data.page * 100, (this.data.page + 1) * 100)]
            })
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})