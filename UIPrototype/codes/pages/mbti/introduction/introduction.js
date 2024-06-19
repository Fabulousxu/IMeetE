// pages/mbti/introduction.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedGender: '', // To store the selected gender
    selectedMBTI: '', // To store the selected MBTI type
    mbtiTypes: [
      ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
      ['ISTP', 'ISFP', 'ESFP', 'ESTP'],
      ['INFJ', 'ENFP', 'ENFJ', 'INFP'],
      ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ']
    ],
    
    onLoad: function (options) {
      wx.loadFontFace({
        family: 'zhanku font',
        source: 'url("https://github.com/HangZhouShuChengKeJi/freeFontLibrary/blob/master/%E7%AB%99%E9%85%B7%EF%BC%88%E5%A5%BD%E7%9C%8B%EF%BC%8C%E7%B1%BB%E4%BC%BC%E8%89%BA%E6%9C%AF%E5%AD%97%EF%BC%89/%E7%AB%99%E9%85%B7%E5%BF%AB%E4%B9%90%E4%BD%93/%E7%AB%99%E9%85%B7%E5%BF%AB%E4%B9%90%E4%BD%932016%E4%BF%AE%E8%AE%A2%E7%89%88.ttf")',
        success: console.log
      });
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

  // Function to handle MBTI type selection
  onMBTITap: function (event) {
    this.setData({
      selectedMBTI: event.currentTarget.dataset.type
    });
    console.log(this.data.selectedMBTI);

    let type = this.data.selectedMBTI;

    // 等待0.1秒后跳转
    setTimeout(() => {
      wx.navigateTo({
        url: '/pages/mbti/intro-detail/intro-detail?mbtiType=' + type,
      })
    }, 100);
  },
})