// components/nav-bar/nav-bar.js
Component({
    options: {
      styleIsolation: 'shared',
    },
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        onClickLeft: function () {
          wx.navigateBack({
            delta: 0,
          })
        }
      }
})
