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
    sitemlist: [{
        id: 1,
        name: 'a',
        mbti: 'INTJ',
        avaurl: '../square/img/avator1.jpg',
        fansnum: 100,
        sign: 'hello',
        posttime: '2020-10-10',
        isDisplay: 1,
        postpicurl: 'https://img.yzcdn.cn/vant/cat.jpeg',
        content: 'hello',
        viewnum: 100,
        comnum: 100,
      },

      {
        id: 2,
        name: 'b',
        mbti: 'INTJ',
        avaurl: '../square/img/avator2.jpeg',
        fansnum: 100,
        sign: 'hello',
        posttime: '2020-10-10',
        isDisplay: 0,
        postpicurl: 'https://img.yzcdn.cn/vant/cat.jpeg',
        content: 'hello',
        viewnum: 100,
        comnum: 100,
      },

      {
        id: 3,
        name: 'c',
        mbti: 'INTJ',
        avaurl: '../square/img/avator3.jpeg',
        fansnum: 100,
        sign: 'hello',
        posttime: '2020-10-10',
        isDisplay: 1,
        postpicurl: 'https://img.yzcdn.cn/vant/cat.jpeg',
        content: 'hello',
        viewnum: 100,
        comnum: 100,
      },

      {
        id: 4,
        name: 'd',
        mbti: 'INTJ',
        avaurl: '../square/img/avator4.jpg',
        fansnum: 100,
        sign: 'hello',
        posttime: '2020-10-10',
        isDisplay: 0,
        postpicurl: 'https://img.yzcdn.cn/vant/cat.jpeg',
        content: 'hello',
        viewnum: 100,
        comnum: 100,
      },

      {
        id: 5,
        name: 'e',
        mbti: 'INTJ',
        avaurl: '../square/img/avator5.jpg',
        fansnum: 100,
        sign: 'hello',
        posttime: '2020-10-10',
        isDisplay: 1,
        postpicurl: 'https://img.yzcdn.cn/vant/cat.jpeg',
        content: 'hello',
        viewnum: 100,
        comnum: 100,
      },
    ]
  },

  onload: function() {

  },
  /** 
   * 滑动切换tab 
   */
  bindChange: function(e) {
    console.log('debugbindcange')
    var that = this;
    that.setData({
      currentTab: e.detail.current,
      swipeIndex: e.detail.current
    });

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
  swichNav: function(e) {
    var that = this;
    if (this.data.swipeIndex === e.currentTarget.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.currentTarget.dataset.current
      })
    }

  },

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
  swiperTrans: function(e) {
    var that = this;
    var dx = e.detail.dx

    if (this.data.flag3 && (this.data.flag2) && (dx >= 50) && (dx < 100)) {
      console.log('debug')
      that.data.flag3 = false
      this.setData({
        currentTab: that.data.swipeIndex + 1,

      })
    }
    if (this.data.flag3 && (this.data.flag1) && (dx <= -50) && (dx > -100)) {
      that.data.flag3 = false
      this.setData({
        currentTab: that.data.swipeIndex - 1,

      })
    }

  },

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
  }
})