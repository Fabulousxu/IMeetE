Component({
  data: {},
  properties: {
    post: Object,
  },
  methods: {
    navigateBack: function(){
      this.triggerEvent('return');
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