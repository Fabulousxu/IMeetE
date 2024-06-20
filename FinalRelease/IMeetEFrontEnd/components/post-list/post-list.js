Component({
  data: {
    sitemlist: []
  },
  lifetimes: {
    attached:function(){
      // 获取当前页面类型
      let type = this.data.pageType
      // console.log(type)

      // 帖子分类
      let category = this.data.category

      let mbtiType = this.data.mbtiType

      let strategy = this.data.strategy

      let userId = this.data.userId

      let keyword = this.data.keyword

      console.log(strategy)
      console.log(userId)
      console.log(keyword)

      // 当前页面最后一个帖子的id
      let lastPostId = 0

      let url = ""
      if(strategy == "mbti"){
        url = 'http://localhost:8080/post/mbti' + '?mbti=' + mbtiType + '&lastPostId=' + lastPostId
      }else if(strategy == "self_post"){
        url = 'http://localhost:8080/user/self/post'
      }else if(strategy == "self_collect"){
        url = 'http://localhost:8080/user/self/collect'
      }else if(strategy == "user_post"){
        url = 'http://localhost:8080/user/post?id=' + userId
      }else if(strategy == "user_collect"){
        url = 'http://localhost:8080/user/collect?id=' + userId
      }else if(strategy == "search"){
        url = 'http://localhost:8080/search' + '?keyword=' + keyword + '&lastPostId=' + lastPostId
      }else{
        url = 'http://localhost:8080/square' + '?type=' + type + '&category=' + category + '&lastPostId=' + lastPostId
      }

      // 从后端fetch帖子数据
      wx.request({
        url: url,
        method: 'GET',
        header: {
          'content-type': 'application/json',
          // 'cookie': wx.getStorageSync("cookieKey")
          'cookie': 'userId=' + wx.getStorageSync('userId')
        },
        success: (res) => {
          if(res.statusCode == 200){
            console.log(res)

            res = res.data

            // 如果res.data还嵌套一层，就需要解开
            if(res.ok != undefined){
              if(res.ok){
                res = res.data
              }else{
                console.log(res.message)
                return
              }
            }

            for (let item of res) {
              if (item.cover === ""){
                item.isDisplay = 0
              } else {
                item.isDisplay = 1
              }
            }

            this.data.sitemlist = [...res]
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
    pageType:{
      type: String,
      value: "关注"
    },
    category:{
      type: String,
      value:""
    },
    mbtiType:{
      type: String,
      value:""
    },
    strategy:{
      type: String,
      value:""
    },
    userId:{
      type: String,
      value:""
    },
    keyword:{
      type: String,
      value:""
    }
  },
  methods: {
    update: async function(){
      // 从后端获取新帖子并且加入到已有帖子后面，更新页面
      // 获取当前页面类型
      let type = this.data.pageType
      // console.log(type)

      // 帖子分类
      let category = this.data.category

      // 当前页面最后一个帖子的id，目前是sitemlist最后一个元素的 id
      let lastPostId = this.data.sitemlist[this.data.sitemlist.length-1].id

      let mbtiType = this.data.mbtiType
      let strategy = this.data.strategy
      let url = this.url
      if(strategy == "mbti"){
        url = 'http://localhost:8080/post/mbti' + '?mbti=' + mbtiType + '&lastPostId=' + lastPostId
      }
        else{
        url = 'http://localhost:8080/square' + '?type=' + type + '&category=' + category + '&lastPostId=' + lastPostId
      }
      console.log(strategy)
      console.log(url)

      // 从后端fetch帖子数据
      wx.request({
        // url: 'http://localhost:8080/square' + '?type=' + type + '&category=' + category + '&lastPostId=' + lastPostId,
        url: url,
        method: 'GET',
        header: {
          'content-type': 'application/json',
          // 'cookie': wx.getStorageSync("cookieKey")
          'cookie': 'userId=' + wx.getStorageSync('userId')
        },
        success: (res) => {
          if(res.statusCode == 200){
            // 从sitemlist 末尾插入新帖子，并从页面当前位置加载

            console.log(res)

            res = res.data

            // 如果res.data还嵌套一层，就需要解开
            if(res.ok != undefined){
              if(res.ok){
                res = res.data
              }else{
                console.log(res.message)
                return
              }
            }
            
            for (let item of res) {
              if (item.cover === ""){
                item.isDisplay = 0
              } else {
                item.isDisplay = 1
              }
            }

            this.data.sitemlist = [...this.data.sitemlist, ...res]

            // this.data.sitemlist = [...this.data.sitemlist, ...res.data]
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
      let type = this.data.pageType
      // console.log(type)
      // 帖子分类
      let category = this.data.category

      // 当前页面最后一个帖子的id，目前是sitemlist最后一个元素的 id
      let lastPostId = 0

      let mbtiType = this.data.mbtiType
      let strategy = this.data.strategy
      let url = this.url
      if(strategy == "mbti"){
        url = 'http://localhost:8080/post/mbti' + '?mbti=' + mbtiType + '&lastPostId=' + lastPostId
      }else if(strategy == "self_post"){
        url = 'http://localhost:8080/user/self/post'
      }else if(strategy == "self_collect"){
        url = 'http://localhost:8080/user/self/collect'
      }else if(strategy == "user_post"){
        url = 'http://localhost:8080/user/post?id=' + userId
      }else if(strategy == "user_collect"){
        url = 'http://localhost:8080/user/collect?id=' + userId
      }
        else{
        url = 'http://localhost:8080/square' + '?type=' + type + '&category=' + category + '&lastPostId=' + lastPostId
      }
      console.log(strategy)
      console.log(url)

      // 从后端fetch帖子数据
      wx.request({
        // url: 'http://localhost:8080/square' + '?type=' + type + '&category=' + category + '&lastPostId=' + lastPostId,
        url: url,
        method: 'GET',
        header: {
          'content-type': 'application/json',
          // 'cookie': wx.getStorageSync("cookieKey")
          'cookie': 'userId=' + wx.getStorageSync('userId')
        },
        success: (res) => {
          if(res.statusCode == 200){

            console.log(res)

            res = res.data

            // 如果res.data还嵌套一层，就需要解开
            if(res.ok != undefined){
              if(res.ok){
                res = res.data
              }else{
                console.log(res.message)
                return
              }
            }

            for (let item of res) {
              if (item.cover === ""){
                item.isDisplay = 0
              } else {
                item.isDisplay = 1
              }
            }

            this.data.sitemlist = [...res]

            // this.data.sitemlist = [...res.data]
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

    UserInfoTap: function(e) {
      // 获取当前点击对象的父元素在wx::for中的key
      var index = e.currentTarget.id;
      // 跳转到用户信息页
      wx.navigateTo({
        url: '/pages/info/info?userId=' + this.data.sitemlist[index].user.userId,
      });
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
      console.log(this.data.sitemlist[index].id)

      // 向后端发送请求
      wx.request({
        url: 'http://localhost:8080/post/' + (this.data.sitemlist[index].liked ? 'dislike' : 'like'),
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'cookie': 'userId=' + wx.getStorageSync('userId')
        },
        data:{
          id: this.data.sitemlist[index].id
        },
        success: (res) => {
          res = res.data
          console.log(res.message)
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 1000
          })
          // 更新页面
          this.data.sitemlist[index].liked = !this.data.sitemlist[index].liked
          this.data.sitemlist[index].likeCount += this.data.sitemlist[index].liked ? 1 : -1
          this.setData({
            sitemlist: this.data.sitemlist
          })
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
      // this.triggerEvent('postTap', {
      //   selectedPostId: this.data.sitemlist[index].id
      // });

      this.data.sitemlist[index].watchCount += 1
      this.setData({
        sitemlist: this.data.sitemlist
      })

      const postId = this.data.sitemlist[index].id
      const liked = this.data.sitemlist[index].liked
      const collected = this.data.sitemlist[index].collected
      wx.navigateTo({
        url: '/pages/post/post-detail/post-detail?postId=' + postId + '&liked=' + liked + '&collected=' + collected,
      })
    },

    share: function(e){
      console.log("成功分享")
      
    },

    // 收藏
    collect: function(e){
      // 获取当前点击对象的父元素在wx::for中的key
      var index = e.currentTarget.id;
      console.log(this.data.sitemlist[index].id)
      console.log(this.data.sitemlist[index].collected)

      // 向后端发送请求
      wx.request({
        url: 'http://localhost:8080/post/' + (this.data.sitemlist[index].collected ? 'uncollect' : 'collect'),
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'cookie': 'userId=' + wx.getStorageSync('userId')
        },
        data:{
          id: this.data.sitemlist[index].id
        },
        success: (res) => {
          res = res.data
          console.log("hint")
          console.log(res.message)
          wx.showToast({
            title: res.message,
            icon: 'none',
            duration: 1000
          })
          // 更新页面
          this.data.sitemlist[index].collected = !this.data.sitemlist[index].collected
          this.data.sitemlist[index].collectCount += this.data.sitemlist[index].collected ? 1 : -1
          this.setData({
            sitemlist: this.data.sitemlist
          })
        },
        
        fail: (err) => {
          console.log(err);
        }
      })
    }
  }
})