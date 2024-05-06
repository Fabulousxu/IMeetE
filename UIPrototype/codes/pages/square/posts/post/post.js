Component({
  data: {
    sitemlist: [{
      id: 1,
      name: 'a',
      mbti: 'INTJ',
      avaurl: '../../img/avator1.jpg',
      fansnum: 100,
      sign: 'hello',
      posttime: '2020-10-10',
      isDisplay: 1,
      postpicurl: 'https://img.yzcdn.cn/vant/cat.jpeg',
      content: 'hello',
      viewnum: 100,
      comnum: 100,
    },

    {
      id: 2,
      name: 'b',
      mbti: 'INTJ',
      avaurl: '../../img/avator2.jpeg',
      fansnum: 100,
      sign: 'hello',
      posttime: '2020-10-10',
      isDisplay: 0,
      postpicurl: 'https://img.yzcdn.cn/vant/cat.jpeg',
      content: 'hello',
      viewnum: 100,
      comnum: 100,
    },

    {
      id: 3,
      name: 'c',
      mbti: 'INTJ',
      avaurl: '../../img/avator3.jpeg',
      fansnum: 100,
      sign: 'hello',
      posttime: '2020-10-10',
      isDisplay: 1,
      postpicurl: 'https://img.yzcdn.cn/vant/cat.jpeg',
      content: 'hello',
      viewnum: 100,
      comnum: 100,
    },

    {
      id: 4,
      name: 'd',
      mbti: 'INTJ',
      avaurl: '../../img/avator4.jpg',
      fansnum: 100,
      sign: 'hello',
      posttime: '2020-10-10',
      isDisplay: 0,
      postpicurl: 'https://img.yzcdn.cn/vant/cat.jpeg',
      content: 'hello',
      viewnum: 100,
      comnum: 100,
    },

    {
      id: 5,
      name: 'e',
      mbti: 'INTJ',
      avaurl: '../../img/avator5.jpg',
      fansnum: 100,
      sign: 'hello',
      posttime: '2020-10-10',
      isDisplay: 1,
      postpicurl: 'https://img.yzcdn.cn/vant/cat.jpeg',
      content: 'hello',
      viewnum: 100,
      comnum: 100,
    },]
  },
  // lifetimes: {
  //   attached: function(){
  //     // 从后端fetch帖子数据
  //     wx.request({
  //       url: 'dbc:mysql://localhost:3306/imeete?useUnicode=true&characterEncoding=utf8',
  //       method: 'GET',
  //       header: {
  //         'content-type': 'application/json',
  //         'cookie': wx.getStorageSync("cookieKey")
  //       },
  //       success: (res) => {
  //         this.setData({
  //           sitemlist: res.data,
  //         })
  //       },
        
  //       fail: (err) => {
  //         console.log(err);
  //       }
  //     })
  //   }
  // },
  properties: {},
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
    }
  }
})