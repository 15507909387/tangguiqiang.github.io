// pages/category/category.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        filters: [{
                type: "hot",
                text: "热门"
            }, {
                type: "new",
                text: "新书"
            },
            {
                type: "reputation",
                text: "好评"
            },
            {
                type: "over",
                text: "完结"
            },
            {
                type: "monthly",
                text: "包月"
            }
        ],
        categoryTwo: null,
        sub: '',
        subs: [],
        categoryFilters: '',
        categorySubs: '',
        categoryText: null,
        major: '',
        gender: '',
        page: 0 ,
        hasMose : false
    },

   
        navtodetail: function(event) {
            console.log(event)
            wx.navigateTo({
              url: '../../pages/detail/detail?id=' + event.currentTarget.dataset.id 
            })
        },
    

    categoryFilters: function (e) {
        this.setData ({
            categoryFilters: e.currentTarget.dataset
        }, () => {
            this.getBooks()
        })
    },

    categorySubs: function(e) {
        // console.log(e);
        this.setData ({
            categorySubs: e.currentTarget.dataset.sub
    }, () => {
        this.getBooks()
    })
},

getBooks: function(e) {
    wx.showLoading({
        title: '加载中',
      })
    wx.request({
        url: 'http://novel.kele8.cn/category-info',
        data: {
             gender:this.data.gender,
             type:this.data.categoryFilters.type,
             major:this.data.major,
             minor:this.data.categorySubs,
             start:this.data.page,
             limit:20,
        },
        header: {
            "content-type": "application/x-www-form-urloncodod"
        },
        success:(res) => {
            console.log(this.data.page, res);
          
            if(this.data.page) {
                // page不为0 时追加
                this.setData({
                categoryText: [...this.data.categoryText, ...res.data.books]
                    
                })
            }else {
                this.setData({
                    categoryText: res.data.books
                })
            }
            if(res.data.books.lenght === 0) {
                this.setData({
                    hasMose: false
                })
            }else {
                this.setData({
                    hasMose: true
                })
            }

            setTimeout(function () {
                wx.hideLoading()
              }, 2000)
        }
    })
},
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.setData({
            major: options.major,
            gender: options.gender,
            categoryFilters: this.data.filters[0]
        })
        wx.request({
            url: 'http://novel.kele8.cn/sub-categories',
            success: (res) => {
                // console.log(res);
                this.setData({
                    categoryTwo: res.data,
                    // find() 方法返回通过测试（函数内判断）的数组的第一个元素的值。
                    sub:options.major,
                    subs: res.data[options.gender].find(item => item.major === options.major),
                  
                    categorySubs:res.data[options.gender].find(item => item.major === options.major).mins[0]
                })
            }
        })   
        this.getBooks();
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
        this.setData({
            page: this.data.page + 1
        }, () => {
            this.getBooks()
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})