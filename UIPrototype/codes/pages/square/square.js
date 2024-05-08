import tool from "../square/tool.js";

Page({
  data: {
    currentTab: 0,
    swipeIndex: 0,
    itemCurrent: 0,
    itemIndex: 0,
    scrollHeight: 0,
    flag1: false,
    flag2: false,
    flag3: true,
    user: {
      name: 'user',
      mbti: 'INTJ',
      url: '../square/img/avator1.jpg',
      place: 'Shanghai',
    },
    showPostList:true,
    selectedPost:null,
  },

  // getCurrntUser: function() {
  //   //向后端发送fetch请求，获取当前登录的用户信息
  //   wx.request({
  //     url: 'dbc:mysql://localhost:3306/imeete?useUnicode=true&characterEncoding=utf8',
  //     method: 'GET',
  //     header: {
  //       'content-type': 'application/json',
  //       'cookie': wx.getStorageSync("cookieKey")
  //     },
  //     success: (res) => {
  //       this.setData({
  //         user: res.data,
  //       })
  //     },
      
  //     fail: (err) => {
  //       console.log(err);
  //     }
  //   })
  // },

  onLoad() {
    // this.getCurrntUser();
    //调整顶部栏高度
    wx.getSystemInfo({
      success: res => {
        let custom = wx.getMenuButtonBoundingClientRect();
        this.setData({
          statusBarHeight: res.statusBarHeight,
          navigationBarHeight: custom.bottom + custom.top - res.statusBarHeight * 2,
          navigationBarPaddingRight: custom.width
        })
      }
    })
  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current,
      swipeIndex: e.detail.current
    });
    console.log(this.data.currentTab)

  },
  swiperItemChange: function(e) {
    var that = this;
    that.setData({
      itemCurrent: e.detail.current,
      itemIndex: e.detail.current
    });
  },
  /** 
   * 点击tab切换 
   */
  swichNav: tool.throttle(function(e) {
    var that = this;
    if (this.data.swipeIndex === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }

  },300),

  itemSwich: function(e) {
    var that = this;
    if (this.data.itemIndex3 === e.currentTarget.dataset.current3) {
      return false;
    } else {
      that.setData({
        itemIndex: e.currentTarget.dataset.current3,
        itemCurrent: e.currentTarget.dataset.current3
      })
    }
  },

  /**
   * 滑动item绑定事件
   */
  swiperTrans: tool.throttle(function(e) {
    var that = this;
    var dx = e.detail.dx

    if ((this.data.flag3) && (this.data.flag2) && (dx >= 50) && (dx < 100)) {
      if(this.data.itemCurrent === 3)
      {
        return;
      }
      else
      {
        that.data.flag3 = false
        this.setData({
          currentTab: (that.data.swipeIndex + 1),
        })
      }
    }
    if ((this.data.flag3) && (this.data.flag1) && (dx <= -50) && (dx > -100)) {
      that.data.flag3 = false
      this.setData({
        currentTab: (that.data.swipeIndex - 1),
      })
    }

  },300),

  itemTouchLeftMove: function(e) {
    this.data.flag1 = true;
  },
  itemTouchLeftEnd: function(e) {
    this.data.flag1 = false;
    this.data.flag3 = true;
  },
  itemTouchRightMove: function(e) {
    this.data.flag2 = true;
  },
  itemTouchRightEnd: function(e) {
    this.data.flag2 = false;
    this.data.flag3 = true;
  },

  onSearchButton() {
    wx.navigateTo({
      url: '/pages/square/search/search',
    })
  },

  showPostList: function() {
    this.setData({
      showPostList:true,
      selectedPost:null,
    })
  },

  showPostDetail: function(e) {
    const post = e.detail.selectedPost;
    this.setData({
      showPostList:false,
      selectedPost:post,
    })
  }
})