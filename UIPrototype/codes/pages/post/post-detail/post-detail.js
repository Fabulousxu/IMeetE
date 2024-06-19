// pages/square/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      post:[],
      poster:[],
      comments:[],
    },
  
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        const postId = options.postId;
        const lastCommentId = 0;
        let liked;
        let collected;
        if(options.liked == 'true') liked = true;
        else liked = false;
        if(options.collected == 'true') collected = true;
        else collected = false;
        // 从后端fetch post数据
        wx.request({
          url: 'http://localhost:8080/post' + '?id=' + postId,
          method: 'GET',
          header: {
            'content-type': 'application/json',
            // 'cookie': wx.getStorageSync("cookieKey")
            'cookie': 'userId=' + wx.getStorageSync('userId')
          },
          success: (res) => {
              this.setData({
                post: res.data,
                poster: res.data.user
              })
              console.log(this.data.post)
              console.log(this.data.poster)
          },
          fail: (err) => {
            console.log(err);
          }
        })

        // 从后端fetch comment数据
        wx.request({
          url: 'http://localhost:8080/post/comment' + '?postId=' + postId + '&lastCommentId=' + lastCommentId,
          method: 'GET',
          header: {
            'content-type': 'application/json',
            // 'cookie': wx.getStorageSync("cookieKey")
            'cookie': 'userId=' + wx.getStorageSync('userId')
          },
          success: (res) => {
              this.setData({
                comments: res.data
              })
              console.log(this.data.comments)
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

    refreshData()
    {
      const postId = this.data.post.id;
      const lastCommentId = 0;
      // 从后端fetch comment数据
      wx.request({
        url: 'http://localhost:8080/post/comment' + '?postId=' + postId + '&lastCommentId=' + lastCommentId,
        method: 'GET',
        header: {
          'content-type': 'application/json',
          // 'cookie': wx.getStorageSync("cookieKey")
          'cookie': 'userId=' + wx.getStorageSync('userId')
        },
        success: (res) => {
            this.setData({
              comments: res.data
            })
            console.log(this.data.comments)
        },
        fail: (err) => {
          console.log(err);
        }
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
                this.data.post.likeCount += this.data.post.liked ? 1 : -1
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

    collect()
    {
      console.log(this.data.post.liked)
        // 向后端发送请求
        wx.request({
            url: 'http://localhost:8080/post/' + (this.data.post.collected == true ? 'uncollect' : 'collect'),
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
                this.data.post.collected = !this.data.post.collected
                this.data.post.collectCount += this.data.post.collected ? 1 : -1
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

    share()
    {

    },

    addcomment()
    {
      wx.navigateTo({
        url: '/pages/post/add-comment/add-comment?postId=' + this.data.post.id,
      });
    },

    com_like(e)
    {
      // idx
      const idx = e.currentTarget.id;
      console.log(idx)
      console.log(this.data.comments[idx].liked)

      // 向后端发送请求
      wx.request({
        url: 'http://localhost:8080/post/comment/' + (this.data.comments[idx].liked == true ? 'dislike' : 'like'),
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'cookie': 'userId=' + wx.getStorageSync('userId')
        },
        data:{
          commentId: this.data.comments[idx].id,
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
            this.data.comments[idx].liked = !this.data.comments[idx].liked
            this.data.comments[idx].likeCount += this.data.comments[idx].liked ? 1 : -1
            this.setData({
              comments: this.data.comments
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

    lookUserInfo(e){
      console.log(this.data)
      // 跳转到用户信息页
      wx.navigateTo({
        url: '/pages/info/info?userId=' + this.data.post.user.userId,
      });
    }
  })