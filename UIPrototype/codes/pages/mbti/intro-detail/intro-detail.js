// pages/mbti/intro-detail/intro-detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mbtiType: "INTJ",
    mbtiIntro: "MBTI（Myers-Briggs Type Indicator）是一种心理测评工具，用于测量个体在认知、决策和生活方式方面的偏好。基于卡尔·荣格的心理学理论，MBTI将人们分为16个性格类型，包括极端、感性、直觉和判断等四个维度。每个人被分为其中一个类型，如INFJ或ESTP。MBTI常用于团队建设、招聘和个人发展。", 
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;

    let type = JSON.parse(options.mbtiType);

    that.setData({mbtiType:type});
    wx.request({
      url: 'http://localhost:8080/mbti_intro?mbtiType=' + type, // 向后端服务器获取mbti介绍
      header:{
        'content-type': 'application/json'
      },
      method:'GET',
      success(res){
        let result = res.data;

        if(result.ok){
          that.setData({mbtiIntro:result.data.mbti_intro})
        }
      },
      fail(rej){
        console.log(rej.data);
      }
    })
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

  }
})