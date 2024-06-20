// pages/friend/success.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    success: false,
    userInfo: { // 定义userInfo结构体
      nickname: 'Giggle',
      age: 0,
      mbti: 'ENTJ',
      sex: 0,
      intro: '伟大的喜剧在继续，而你可以奉献一首诗'
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let mbti = options.mbti;
    let sex = options.sex;

    console.log(wx.getStorageSync('userId'))

     wx.request({
        url: 'http://localhost:8080/match' + '?mbti=' + mbti + '&sex=' + sex,
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'cookie': 'userId=' + wx.getStorageSync('userId')
        },
        success: (res) => {
          res = res.data
          console.log(res)
          if (res.ok) {
            this.setData({
              success: true,
              userInfo: res.matchedUser
            });
           
          } else {
            // 显示匹配失败
            this.setData({
              success: false
            });

            console.log(res.message)
          }
        },
        fail: (err) => {
          console.log(err);
        }
      })

    setTimeout(() => {
      this.setData({
        loading: false
      });
    }, 2000);
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
  look: function() {
    console.log("go to the look page")
    wx.navigateTo({
      // url: '/pages/info/info?userId=' + userId
      url: '/pages/info/info?userId=' + this.data.userInfo.userId
    });
  }
})