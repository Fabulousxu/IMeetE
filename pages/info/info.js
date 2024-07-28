Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "",
    id: "",
    mbti: "",
    area: "",
    sex: "",
    age: "",
    followingCount: "",
    followerCount: "",
    intro: "",
    tags: [],
    mode: true,
    userId: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let userId = options.userId; // 获取传入的 userId 参数
    
    // 设置 userId
    this.setData({
      userId: userId,
      mode: true
  });

    console.log(userId);
    this.fetchUserInfo(userId);
  },

  fetchUserInfo(userId) {
    wx.request({
      url: 'http://localhost:8080/user?id=' + userId, // 向后端服务器请求用户信息
      header:{
        'content-type': 'application/json'
      },
      method:'GET',
      success: res=>{
        let result = res.data;

        if(result.ok){
          let data = result.data;

          console.log(data);
          
          this.setData({
            name: data.nickname,
            id: data.id,
            mbti: data.mbti,
            area: data.area,
            sex: (data.sex === "男") ? "♂" : "♀",
            age: data.age,
            followingCount: data.followingCount,
            followerCount: data.followerCount,
            intro: data.intro,
            tags: [
              "运动",
              "音乐",
              "游戏",
              "动漫"
            ],
            mode: true
          });
        }
      },
      fail:rej=>{
        console.log(rej.data);
      }
    });
  },

  navigateBack() {
    wx.navigateBack({
      delta: 1
    });
  },

  onPostButton() {
    this.setData({
      mode: true
    });
  },

  onSaveButton() {
    this.setData({
      mode: false
    });
  }
});
