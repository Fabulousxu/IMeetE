// pages/square/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      post:[],
      poster:[],
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const postId = options.postId;
        let liked;
        let collected;
        if(options.liked == 'true') liked = true;
        else liked = false;
        if(options.collected == 'true') collected = true;
        else collected = false;
        // 从后端fetch post数据
        wx.request({
          url: 'http://localhost:8080/square/post-detail' + '?postId=' + postId,
          method: 'GET',
          header: {
            'content-type': 'application/json',
            // 'cookie': wx.getStorageSync("cookieKey")
            'cookie': 'userId=' + wx.getStorageSync('userId')
          },
          success: (res) => {
            if(res.data.ok){
              res.data.postData.liked = liked;
              res.data.postData.collected = collected;
              this.setData({
                post: res.data.postData,
                poster: res.data.poster
              })
              console.log(this.data.post)
              console.log(this.data.poster)
            }else{
              console.log("fetch error")
            }
          },
          fail: (err) => {
            console.log(err);
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
  
    },

    navigateBack()
    {
        wx.navigateBack({
            delta: 1
        })
    },

    like()
    {
      console.log(this.data.post.liked)
        // 向后端发送请求
        wx.request({
            url: 'http://localhost:8080/post/' + (this.data.post.liked == true ? 'dislike' : 'like'),
            method: 'POST',
            header: {
              'content-type': 'application/json',
              'cookie': 'userId=' + wx.getStorageSync('userId')
            },
            data:{
              id: this.data.post.id,
            },
            success: (res) => {
              res = res.data
              if(res.ok){
                console.log(res.message)
                wx.showToast({
                  title: res.message,
                  icon: 'none',
                  duration: 1000
                })
                this.data.post.liked = !this.data.post.liked
                this.setData({
                  post: this.data.post
                })
              }else{
                console.log(res.message)
              }
            },
            
            fail: (err) => {
              console.log(err);
            }
          })
    },

    comment()
    {
      
    },

    share()
    {

    },
  })