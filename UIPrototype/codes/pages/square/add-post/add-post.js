Page({
    data: {
        userId: "",
        title: "",
        cover: "",
        content: "",
        categoty: "体育",
        options: ['体育', '游戏', '学习', '旅游'],
        selectedIndex: 0,
        selectedOption: '体育'
    },

    onLoad: function () {
        this.setData({
            userId: wx.getStorageSync('userId')
        })
    },

    navigateBack: function() {
        wx.navigateBack({
          delta: 1
        });
    },

    inputTitleChange: function(event) {
        this.setData({
            title: event.detail.value
        });
    },

    inputChange: function(event) {
        this.setData({
            content: event.detail.value
        });
    },

    chooseImage: function() {
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                this.setData({
                    cover: res.tempFilePaths[0]
                })
            },
        })
    },

    submitPost: function()
    {
        if(this.data.title == "")
        {
            wx.showToast({
                title: '标题不能为空',
                icon: 'none',
                duration: 1000
            })
            return;
        }

        if(this.data.content == "")
        {
            wx.showToast({
                title: '内容不能为空',
                icon: 'none',
                duration: 1000
            })
            return;
        }
        
        // 执行提交帖子
        wx.request({
            url: 'http://localhost:8080/post',
            method: 'POST',
            header: {
                'content-type': 'application/json',
                'cookie': 'userId=' + this.data.userId
            },
            data: {
                title: this.data.title,
                cover: this.data.cover,
                content: this.data.content,
                category: this.data.category
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
                    // 跳转到广场页
                    wx.switchTab({
                        url: '/pages/square/square',
                    })
                }else{
                    console.log(res.message)
                }
            },
            fail: (err) => {
                console.log(err);
            }
        });
    },

    onPickerChange: function(e) {
        const index = e.detail.value;
        const option = this.data.options[index];
        this.setData({
          selectedIndex: index,
          selectedOption: option,
          category: option
        });
    }
})