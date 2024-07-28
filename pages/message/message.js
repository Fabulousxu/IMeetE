// pages/friend/friend.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    friends: [],
    userId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      userId: wx.getStorageSync('userId')
    });
    this.loadFriends();
  },

  loadFriends() {
    let that = this;
    let userId = this.data.userId;

    if (!userId) {
      wx.showToast({
        title: '用户ID不存在，请先登录',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    wx.request({
      url: 'http://localhost:8080/user/self/friends',
      method: 'GET',
      header: {
        'content-type': 'application/json',
        'cookie': 'userId=' + userId // 使用获取的userId
      },
      success: (res) => {
        if (res.statusCode === 200) {
          const friends = res.data.map(friend => {
            return {
              ...friend,
              sexSymbol: friend.sex === 1 ? '♂' : friend.sex === 0 ? '♀' : ''
            };
          });
          that.setData({
            friends: friends
          });
        } else {
          wx.showToast({
            title: `加载好友列表失败: ${res.data.error}`,
            icon: 'none',
            duration: 2000
          });
          console.error('API Error:', res.data);
        }
      },
      fail: (res) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 2000
        });
        console.error('Request Failed:', res);
      }
    });
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
   * 页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    this.loadFriends(() => {
      wx.stopPullDownRefresh();
    });
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

  }
});
