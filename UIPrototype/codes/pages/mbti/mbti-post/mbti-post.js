Page({
    data:
    {
        selectMbti: '',
        s1: '',
        s2: '',
        s3: '',
        s4: '',
        mbti1:[
            {id: 1, name: 'I'},
            {id: 2, name: 'E'},
            {id: 3, name: '无'}
        ],
        mbti2:[
            {id: 1, name: 'S'},
            {id: 2, name: 'N'},
            {id: 3, name: '无'}
        ],
        mbti3:[
            {id: 1, name: 'T'},
            {id: 2, name: 'F'},
            {id: 3, name: '无'}
        ],
        mbti4:[
            {id: 1, name: 'J'},
            {id: 2, name: 'P'},
            {id: 3, name: '无'}
        ],
    },

    onLoad() {
        // this.getCurrntUser();
        //调整顶部栏高度
        wx.getSystemInfo({
          success: res => {
            let custom = wx.getMenuButtonBoundingClientRect();
            this.setData({
              statusBarHeight: res.statusBarHeight,
              navigationBarHeight: custom.bottom + custom.top - res.statusBarHeight * 2,
              navigationBarPaddingRight: custom.width
            })
          }
        })
    },

    chooseMbti1: function(e)
    {
        this.setData({
            s1: e.detail.select == '无' ? '' : e.detail.select,
        })
        this.data.selectMbti = this.data.s1 + this.data.s2 + this.data.s3 + this.data.s4
        this.setData({
            selectMbti: this.data.selectMbti
        })
        console.log(this.data.selectMbti)
        this.onPullDownRefresh();
    },

    chooseMbti2: function(e)
    {
        this.setData({
            s2: e.detail.select == '无' ? '' : e.detail.select,
        })
        this.data.selectMbti = this.data.s1 + this.data.s2 + this.data.s3 + this.data.s4
        this.setData({
            selectMbti: this.data.selectMbti
        })
        console.log(this.data.selectMbti)
        this.onPullDownRefresh();
    },

    chooseMbti3: function(e)
    {
        this.setData({
            s3: e.detail.select == '无' ? '' : e.detail.select,
        })
        this.data.selectMbti = this.data.s1 + this.data.s2 + this.data.s3 + this.data.s4
        this.setData({
            selectMbti: this.data.selectMbti
        })
        console.log(this.data.selectMbti)
        this.onPullDownRefresh();
    },

    chooseMbti4: function(e)
    {
        this.setData({
            s4: e.detail.select == '无' ? '' : e.detail.select,
        })
        this.data.selectMbti = this.data.s1 + this.data.s2 + this.data.s3 + this.data.s4
        this.setData({
            selectMbti: this.data.selectMbti
        })
        console.log(this.data.selectMbti)
        this.onPullDownRefresh();
    },

    onSearchButton() {
        wx.navigateTo({
          url: '/pages/square/search/search',
        })
    },

    navigateBack()
    {
        wx.navigateBack({
            delta: 1
        })
    },

    onReachBottom: async function() {
        let currentPostList = this.selectComponent('#mbti-pl-item');
        if(currentPostList)
        {
          await currentPostList.update();
        }
      },
    
    onPullDownRefresh: async function() {
        let currentPostList = this.selectComponent('#mbti-pl-item');
        if(currentPostList)
        {
          await currentPostList.refresh();
        }
    },

    showPostDetail: function(e) {
        const postId = e.detail.selectedPostId;
        const liked = e.detail.liked;
        const collected = e.detail.collected;
        wx.navigateTo({
          url: '/pages/square/post-detail/post-detail?postId=' + postId + '&liked=' + liked + '&collected=' + collected,
        })
    },
})