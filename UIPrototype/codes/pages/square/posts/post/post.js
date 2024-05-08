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

      // 默认获得前10条帖子
      let lastPostId = 10

      // 从后端fetch帖子数据
      wx.request({
        url: 'http://localhost:8080/square' + '?type=' + type + '&category=' + category + '&lastPostId=' + lastPostId,
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
    pageType:{
      type: String,
      value: "关注"
    },
    category:{
      type: String,
      value:""
    }
  },
  methods: {
    posterDetailTap: function(e) { // 待实现
      // 获取当前点击对象的父元素在wx::for中的key
      var index = e.currentTarget.id;
      // 跳转到帖子详情页
      this.triggerEvent('postTap', {
        selectPost: this.data.sitemlist[index]
      });
    },
  
    postContentTap: function(e) {
      // 获取当前点击对象的父元素在wx::for中的key
      var index = e.currentTarget.id;
      var post = this.data.sitemlist[index];
      // 获取当前点击对象的id
      this.triggerEvent('postTap', {
        selectedPost: post
      });
    },

    like: function(e){
      // 获取当前点击对象的父元素在wx::for中的key
      var index = e.currentTarget.id;
      console.log(index)

      // 向后端发送请求
      wx.request({
        url: 'http://localhost:8080/post/like',
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
          if(res.ok){
            console.log(res.message)
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
      console.log("成功评论")
      
    },

    share: function(e){
      console.log("成功分享")
      
    },
  }
})