// pages/friend/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: false,
    success: false,
    userInfo: { // 定义userInfo结构体
      nickname: 'Giggle',
      age: 0,
      mbti: 'ENTJ',
      gender: 'man',
      loveSentence: '伟大的喜剧在继续，而你可以奉献一首诗'
    }
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
  back: function() {
    wx.navigateBack();
  },
  chat: function() {
    console.log("go to the chat page")
  }
})