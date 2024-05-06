Component({
  data: {
    post_comments: [{
      id: 1,
      name: 'a',
      mbti: 'INTJ',
      avaurl: '../../img/avator1.jpg',
      com_date: '2020-10-10',
      com_content: 'hello',
      com_like: 100,
    },]
  },
  properties: {
    post: Object,
  },
  methods: {
    navigateBack: function(){
      this.triggerEvent('backToPostList');
    },

    posterDetailTap: function(e) { // 待实现
      // 获取当前点击对象的父元素在wx::for中的key
      var index = e.currentTarget.id;
      // 跳转到帖子详情页
      this.triggerEvent('postTap', {
        selectPost: this.data.sitemlist[index]
      });
    },
  }
})