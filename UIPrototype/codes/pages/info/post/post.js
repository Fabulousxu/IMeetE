Component({
  properties: {
    pageType: {
      type: String,
      value: "post"
    },
    category: {
      type: String,
      value: ""
    },
    userId: {
      type: String,
      value: ""
    }
  },
  data: {
    sitemlist: []
  },
  lifetimes: {
    attached: function() {
      this.fetchPosts();
    }
  },
  methods: {
    fetchPosts() {
      let type = this.data.pageType;
      let userId = this.data.userId;
      wx.request({
        url: 'http://localhost:8080/user/' + type,
        method: 'GET',
        header: {
          'content-type': 'application/json',
          'cookie': 'userId=' + wx.getStorageSync('userId')
        },
        data: { id: userId },
        success: (res) => {
          if (res.statusCode == 200) {
            this.setData({
              sitemlist: res.data
            });
            console.log(this.data.sitemlist);
          } else {
            console.log("fetch error");
          }
        },
        fail: (err) => {
          console.log(err);
        }
      });
    },
    showPostDetail(e) {
      const postId = e.currentTarget.dataset.postId;
      wx.navigateTo({
        url: `/pages/post-detail/post-detail?id=${postId}`
      });
    },
    update: async function() {
      let type = this.data.pageType;
      let userId = this.data.userId;
      let lastPostId = this.data.sitemlist[this.data.sitemlist.length - 1].id;
      wx.request({
        url: 'http://localhost:8080/user/' + type,
        method: 'GET',
        header: {
          'content-type': 'application/json',
          'cookie': 'userId=' + wx.getStorageSync('userId')
        },
        data: {
          id: userId,
          lastPostId: lastPostId
        },
        success: (res) => {
          if (res.statusCode == 200) {
            this.setData({
              sitemlist: [...this.data.sitemlist, ...res.data]
            });
            console.log(this.data.sitemlist);
          } else {
            console.log("fetch error");
          }
        },
        fail: (err) => {
          console.log(err);
        }
      });
    },
    postContentTap: function(e) {
      let index = e.currentTarget.id;
      let post = this.data.sitemlist[index];
      let postId = post.id;
      let postliked = post.liked;
      let postcollected = post.collected;
      this.triggerEvent('postTap', {
        selectedPostId: postId,
        liked: postliked,
        collected: postcollected
      });
    },
    like: function(e) {
      var index = e.currentTarget.id;
      console.log(index);
      wx.request({
        url: 'http://localhost:8080/post/' + (this.data.sitemlist[index].liked ? 'dislike' : 'like'),
        method: 'POST',
        header: {
          'content-type': 'application/json',
          'cookie': 'userId=' + wx.getStorageSync('userId')
        },
        data: {
          id: this.data.sitemlist[index].id,
        },
        success: (res) => {
          res = res.data;
          if (res.ok) {
            console.log(res.message);
            wx.showToast({
              title: res.message,
              icon: 'none',
              duration: 1000
            });
            this.setData({
              [`sitemlist[${index}].liked`]: !this.data.sitemlist[index].liked
            });
          } else {
            console.log(res.message);
          }
        },
        fail: (err) => {
          console.log(err);
        }
      });
    },
    comment: function(e) {
      var index = e.currentTarget.id;
      console.log(index);
      this.triggerEvent('postTap', {
        selectedPostId: this.data.sitemlist[index].id
      });
    },
    share: function(e) {
      console.log("成功分享");
    },
  }
});
