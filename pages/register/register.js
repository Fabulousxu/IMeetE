// pages/register/register.js
Page({
  data: {
    id: '',
    nickname: '',
    password: ''
  },

  onInputId(event) {
    this.setData({
      id: event.detail.value
    });
  },

  onInputNickname(event) {
    this.setData({
      nickname: event.detail.value
    });
  },

  onInputPassword(event) {
    this.setData({
      password: event.detail.value
    });
  },

  onSubmit() {
    const { id, nickname, password } = this.data;

    if (!id || !nickname || !password) {
      wx.showToast({
        title: '请填写所有字段',
        icon: 'none',
        duration: 2000
      });
      return;
    }

    wx.request({
      url: 'http://localhost:8080/register',
      method: 'POST',
      header: {
        'content-type': 'application/json'
      },
      data: {
        id,
        nickname,
        password
      },
      success: (res) => {
        if (res.data.success) {
          wx.showToast({
            title: '注册成功',
            icon: 'success',
            duration: 2000
          });
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/login/login'
            });
          }, 2000);
        } else {
          wx.showToast({
            title: res.data.message || '注册失败',
            icon: 'none',
            duration: 2000
          });
        }
      },
      fail: (err) => {
        wx.showToast({
          title: '请求失败',
          icon: 'none',
          duration: 2000
        });
        console.error('请求失败:', err);
      }
    });
  },

  navigateBack() {
    wx.navigateBack({
      delta: 1
    });
  }
});
