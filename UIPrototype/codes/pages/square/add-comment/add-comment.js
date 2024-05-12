Page({
    data: {
        comment: '',
        postId: -1,
        userId: ''
    },

    onLoad: function (options) {
        this.setData({
            postId: options.postId,
            userId: wx.getStorageSync('userId')
        })
    },

    navigateBack: function() {
        wx.navigateBack({
          delta: 1
        });
    },

    inputChange: function(event) {
        this.setData({
          comment: event.detail.value
        });
    },

    submitComment: function() {
        // 获取用户输入的评论内容
        var commentContent = this.data.comment;

        if(this.data.postId == -1){
            wx.showToast({
                title: '评论失败',
                icon: 'none',
                duration: 1000
            })
            return;
        }
        
        // 执行提交评论的逻辑，例如发送请求到服务器
        wx.request({
          url: 'http://localhost:8080/post/comment',
          method: 'POST',
          header: {
            'content-type': 'application/json',
            'cookie': 'userId=' + this.data.userId
          },
          data: {
            id: this.data.postId,
            content: commentContent
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
            }else{
              console.log(res.message)
            }
          },
          fail: (err) => {
            console.log(err);
          }
        });
    
        // 提交完成后，返回上一个页面
        wx.navigateBack({
          delta: 1,
          success: function() {
            // 返回上一个页面成功后的回调函数，在这里执行页面刷新的操作
            var pages = getCurrentPages();
            var prevPage = pages[pages.length - 2]; // 获取上一个页面实例对象
            if (prevPage && typeof prevPage.refreshData === 'function') {
              prevPage.refreshData(); // 调用上一个页面的数据刷新函数
            }
          }
        });
      }
})