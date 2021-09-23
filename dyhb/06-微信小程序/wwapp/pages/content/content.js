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
        // index: Number
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
       
        request({
            url: "http://novel.kele8.cn/chapters2/56a8303e2aefdf397cbbf831/" + event.currentTarget.dataset.order
        }).then(res => {
            // console.log(res);
            this.setData({
                // section: res.data.chapters
                section: res.data
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