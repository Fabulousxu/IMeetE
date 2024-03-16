// pages/mine/mine.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "user_00000001",
    id: "00000001",
    mbti: "INTJ",
    area: "上海 闵行",
    sex: "♂",
    age: "20岁",
    followCount: "1437",
    followerCount: "5.6w",
    intro: "此用户未设置个人简介",
    tags: [
      "运动",
      "音乐",
      "游戏",
      "动漫"
    ],
    mode: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  onPostButton() {
    this.setData({
      mode: true
    })
  },

  onSaveButton() {
    this.setData({
      mode: false
    })
  }
})