Component({
  data: {
    sitemlist: []
  },
  lifetimes: {
    attached:function(){
      // 获取当前页面类型
      let type = this.data.mbtiType
      // console.log(type)

      // 当前页面最后一个帖子的id
      let lastPostId = 0

      // 从后端fetch帖子数据
      wx.request({
        url: 'http://localhost:8080/post/mbti' + '?mbti=' + type + '&lastPostId=' + lastPostId,
        method: 'GET',
        header: {
          'content-type': 'application/json',
          // 'cookie': wx.getStorageSync("cookieKey")
          'cookie': 'userId=' + wx.getStorageSync('userId')
        },
        success: (res) => {
          if(res.statusCode == 200){
            this.data.sitemlist = [...res.data]
            this.setData({
              sitemlist: this.data.sitemlist
            })

          }else{
            console.log("fetch error")
          }
        },
        
        fail: (err) => {
          console.log(err);
        }
      })
    }
  },
  properties: {
    mbtiType:{
      type: String,
      value: ''
    },
  },
  observers: {
    'reRender': function(){
      // 获取当前页面类型
      let type = this.data.mbtiType
      // console.log(type)

      // 当前页面最后一个帖子的id
      let lastPostId = 0

      // 从后端fetch帖子数据
      wx.request({
        url: 'http://localhost:8080/post/mbti' + '?mbti=' + type + '&lastPostId=' + lastPostId,
        method: 'GET',
        header: {
          'content-type': 'application/json',
          // 'cookie': wx.getStorageSync("cookieKey")
          'cookie': 'userId=' + wx.getStorageSync('userId')
        },
        success: (res) => {
          if(res.statusCode == 200){
            this.data.sitemlist = [...res.data]
            this.setData({
              sitemlist: this.data.sitemlist
            })

          }else{
            console.log("fetch error")
          }
        },
        
        fail: (err) => {
          console.log(err);
        }
      })
    }
  },
  methods: {
    update: async function(){
      // 从后端获取新帖子并且加入到已有帖子后面，更新页面
      // 获取当前页面类型
      let type = this.data.mbtiType
      // console.log(type)

      // 当前页面最后一个帖子的id，目前是sitemlist最后一个元素的 id
      let lastPostId = this.data.sitemlist[this.data.sitemlist.length-1].id

      // 从后端fetch帖子数据
      wx.request({
        url: 'http://localhost:8080/post/mbti' + '?mbti=' + type + '&lastPostId=' + lastPostId,       
        method: 'GET',
        header: {
          'content-type': 'application/json',
          // 'cookie': wx.getStorageSync("cookieKey")
          'cookie': 'userId=' + wx.getStorageSync('userId')
        },
        success: (res) => {
          if(res.statusCode == 200){
            // 从sitemlist 末尾插入新帖子，并从页面当前位置加载

            this.data.sitemlist = [...this.data.sitemlist, ...res.data]
            console.log(this.data.sitemlist)

            this.setData({
              sitemlist: this.data.sitemlist
            })
          }else{
            console.log("fetch error")
          }
        },
        
        fail: (err) => {
          console.log(err);
        }
      })
    },

    refresh: async function(){
      // 重新获取帖子
      // 获取当前页面类型
      let type = this.data.mbtiType
      // console.log(type)

      // 当前页面最后一个帖子的id，目前是sitemlist最后一个元素的 id
      let lastPostId = 0

      // 从后端fetch帖子数据
      wx.request({
        url: 'http://localhost:8080/post/mbti' + '?mbti=' + type + '&lastPostId=' + lastPostId,
        method: 'GET',
        header: {
          'content-type': 'application/json',
          // 'cookie': wx.getStorageSync("cookieKey")
          'cookie': 'userId=' + wx.getStorageSync('userId')
        },
        success: (res) => {
          if(res.statusCode == 200){
            this.data.sitemlist = [...res.data]
            console.log(this.data.sitemlist)

            this.setData({
              sitemlist: this.data.sitemlist
            })
          }else{
            console.log("fetch error")
          }
        },
        
        fail: (err) => {
          console.log(err);
        }
      })
    },

    posterDetailTap: function(e) { // 待实现
      // // 获取当前点击对象的父元素在wx::for中的key
      // var index = e.currentTarget.id;
      // // 跳转到帖子详情页
      // this.triggerEvent('postTap', {
      //   selectPost: this.data.sitemlist[index]
      // });
    },
  
    postContentTap: function(e) {
      // 获取当前点击对象的父元素在wx::for中的key
      let index = e.currentTarget.id;
      let post = this.data.sitemlist[index];
      let postId = post.id;
      let postliked = post.liked;
      let postcollected = post.collected;
      // 获取当前点击对象的id
      this.triggerEvent('postTap', {
        selectedPostId: postId,
        liked: postliked,
        collected: postcollected
      });
    },

    like: function(e){
      // 获取当前点击对象的父元素在wx::for中的key
      var index = e.currentTarget.id;
      console.log(index)

      // 向后端发送请求
      wx.request({
        url: 'http://localhost:8080/post/' + (this.data.sitemlist[index].liked ? 'dislike' : 'like'),
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'cookie': 'userId=' + wx.getStorageSync('userId')
        },
        data:{
          id: this.data.sitemlist[index].id,
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
            this.data.sitemlist[index].liked = !this.data.sitemlist[index].liked
            this.setData({
              sitemlist: this.data.sitemlist
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

    comment: function(e){
      // 获取当前点击对象的父元素在wx::for中的key
      var index = e.currentTarget.id;
      console.log(index)
      // 跳转到评论页面
      this.triggerEvent('postTap', {
        selectedPostId: this.data.sitemlist[index].id
      });
    },

    share: function(e){
      console.log("成功分享")
      
    },
  }
})