// pages/login/login.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userid: "",
    password: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 检查时效缓存
    let time = wx.getStorageSync('expireTime')
    if(time != undefined && time != ''){
      if(new Date().getTime() > time){
        wx.removeStorageSync('userid')
        wx.removeStorageSync('expireTime')
        // 弹窗显示登录已过期
        wx.showModal({
          title: '登录已过期',
          content: '请重新登录',
          showCancel: false,
          confirmText: '确定',
        })
      }else{
        wx.switchTab({
          url: '/pages/friend/friend',
        })
      }
    }
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

  onSubmit:function(e){
    console.log(this.data.username)
    console.log(this.data.password)
    if(this.data.userid === "" || this.data.password === ""){
      wx.showToast({
        title: '用户id或密码不能为空',
        icon: 'none',
        duration: 2000
      })
      return
    }

    let that = this
    wx.request({
      url: 'http://localhost:8080/login',
      data: {
        id: that.data.userid,
        password: that.data.password
      },
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      success: (res) => {
        res = res.data
        if(res.ok){
          wx.showToast({
            title: '登录成功',
            icon: 'success',
            duration: 2000
          })

          // 设置缓存
          
          // wx.setStorageSync('token', res.data.data.token) // 缓存token

          wx.setStorageSync('userId', this.data.userid)

          // 设置时效缓存
          // wx.setStorageSync('expireTime', new Date().getTime() + 1000 * 60 * 60 * 24 * 7) // 7天有效期
          wx.setStorageSync('expireTime', new Date().getTime() + 1000 * 10) // 10秒有效期

          // 跳转到交友页
          wx.switchTab({
            url: '/pages/friend/friend',
          })
        }else{
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail: (res) => {
        wx.showToast({
          title: '登录失败',
          icon: 'none',
          duration: 2000
        })
        console.log(res.message)
      }
    })
  },

  onInputUserId(event){
    this.setData({
      userid: event.detail.value
    })

  },

  onInputPassword(event){
    this.setData({
      password: event.detail.value
    })
  },
  navigateToRegister() {
    wx.navigateTo({
      url: '/pages/register/register'
    })
  }
})