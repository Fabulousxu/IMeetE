// chat.js
// let toast = require('../../utils/toast.js');
let chatInput = require('../../modules/chat-input/chat-input');
var utils = require("../../utils/util.js")
Page({
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取传递过来的用户id
    const userId = options.id;
    console.log(userId);
    // 调用函数设置用户名称
    this.setChatWithUserName(userId);
    let _this = this;
    _this.initData();
    //获取屏幕的高度
    wx.getSystemInfo({
      success(res) {
        _this.setData({
          height: wx.getSystemInfoSync().windowHeight,
          chatHeight: wx.getSystemInfoSync().windowHeight - 55
        })
      }
    })
  },
  // 根据id查找用户并设置名称
  setChatWithUserName: function(userId) {
    const user = this.data.usersInfo.find(user => user.id === userId);
    if (user) {
      console.log(user.name);
      this.setData({
        chatWithUserName: user.name,
      });
      // 同时更新导航栏标题
      wx.setNavigationBarTitle({
        title: `与${user.name}聊天`
      });
    } else {
      console.log('未找到用户');
      // 可以设置一个默认值或进行错误处理
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    chatWithUserName: '',
      usersInfo: [{
          'name': '黎小平',
          'id': '00000001',
          'mbti': 'ISFJ',
          'area': '广州 天河',
          'sex': '♂',
          'age': '21岁',
          'followCount': '324',
          'followerCount': '1.42w',
          'intro': '用心感受，活出真实自我。',
          'tags': ['编程', '设计', '创业', '投资']
        },
        {
          'name': '徐艳',
          'id': '00000002',
          'mbti': 'ENTP',
          'area': '深圳 福田',
          'sex': '♂',
          'age': '18岁',
          'followCount': '154',
          'followerCount': '1.27w',
          'intro': '勇敢前行，不断进步提高。',
          'tags': ['旅行', '阅读', '摄影', '美食']
        },
        {
          'name': '王永昌',
          'id': '00000003',
          'mbti': 'ENFP',
          'area': '南京 鼓楼',
          'sex': '♀',
          'age': '23岁',
          'followCount': '4365',
          'followerCount': '2.67w',
          'intro': '积极思考，无惧未来挑战。',
          'tags': ['旅行', '阅读', '摄影', '美食']
        },
        {
          'name': '陈珍丽',
          'id': '00000004',
          'mbti': 'INFJ',
          'area': '上海 闵行',
          'sex': '♀',
          'age': '31岁',
          'followCount': '798',
          'followerCount': '6.22w',
          'intro': '享受过程，探索世界的奥秘。',
          'tags': ['旅行', '阅读', '摄影', '美食']
        },
        {
          'name': '杨国武',
          'id': '00000005',
          'mbti': 'INTJ',
          'area': '成都 武侯',
          'sex': '♀',
          'age': '29岁',
          'followCount': '3197',
          'followerCount': '3.93w',
          'intro': '坚持不懈，创造不凡成就。',
          'tags': ['旅行', '阅读', '摄影', '美食']
        },
        {
          'name': '郭奉吾',
          'id': '00000006',
          'mbti': 'INTJ',
          'area': '成都 武侯',
          'sex': '♂',
          'age': '34岁',
          'followCount': '2219',
          'followerCount': '5.80w',
          'intro': '勇敢前行，终将光芒万丈。',
          'tags': ['运动', '音乐', '游戏', '动漫']
        },
        {
          'name': '王君',
          'id': '00000007',
          'mbti': 'ISFJ',
          'area': '南京 鼓楼',
          'sex': '♀',
          'age': '25岁',
          'followCount': '3909',
          'followerCount': '9.98w',
          'intro': '追求卓越，终将光芒万丈。',
          'tags': ['旅行', '阅读', '摄影', '美食']
        },
        {
          'name': '潘婷',
          'id': '00000008',
          'mbti': 'ENFP',
          'area': '南京 鼓楼',
          'sex': '♀',
          'age': '25岁',
          'followCount': '2639',
          'followerCount': '6.78w',
          'intro': '追求卓越，无惧未来挑战。',
          'tags': ['旅行', '阅读', '摄影', '美食']
        },
        {
          'name': '张斌',
          'id': '00000009',
          'mbti': 'ISTJ',
          'area': '杭州 西湖',
          'sex': '♀',
          'age': '18岁',
          'followCount': '4639',
          'followerCount': '4.91w',
          'intro': '敢于梦想，终将光芒万丈。',
          'tags': ['旅行', '阅读', '摄影', '美食']
        },
        {
          'name': '黄仁云',
          'id': '00000010',
          'mbti': 'ENFP',
          'area': '北京 海淀',
          'sex': '♂',
          'age': '18岁',
          'followCount': '1473',
          'followerCount': '4.93w',
          'intro': '积极思考，实现人生价值。',
          'tags': ['旅行', '阅读', '摄影', '美食']
        }
      ]
    ,
    wxchatLists: [],
    friendHeadUrl: '',
    // textMessage: '',
    chatItems: [],
    scrollTopTimeStamp: 0,
    height: 0, //屏幕高度
    chatHeight: 0, //聊天屏幕高度
    normalDataTime: '',
  },
  //item的所有单向信息
  // {
  //     dataTime: '',//当前时间
  //     msg_type: '',//发送消息类型
  //     userImgSrc: '',//用户头像
  //     textMessage: '',//文字消息
  //     voiceSrc: '',//录音的路径
  //     voiceTime: 0,//录音的时长
  //     sendImgSrc: '',//图片路径
  //   }

  
  initData: function () {
    let that = this;
    let systemInfo = wx.getSystemInfoSync();
    chatInput.init(this, {
      systemInfo: systemInfo,
      minVoiceTime: 1,
      maxVoiceTime: 60,
      startTimeDown: 56,
      format: 'mp3', //aac/mp3
      sendButtonBgColor: 'mediumseagreen',
      sendButtonTextColor: 'white',
      extraArr: [{
        picName: 'choose_picture',
        description: '照片'
      }, {
        picName: 'take_photos',
        description: '拍摄'
      }],
      // tabbarHeigth: 48
    });

    that.setData({
      pageHeight: systemInfo.windowHeight,
      normalDataTime: utils.formatTime(new Date()),
    });
    wx.setNavigationBarTitle({
      title: '与XX聊天中'
    });
    that.textButton();
    that.extraButton();
    that.voiceButton();
  },
  textButton: function () {
    var that = this;
    chatInput.setTextMessageListener(function (e) {
      let content = e.detail.value;
      console.log(content);
      var list = that.data.wxchatLists;
      var temp = {
        userImgSrc: '../../image/chat/extra/close_chat.png',
        textMessage: content,
        dataTime: utils.formatTime(new Date()),
        msg_type: 'text',
        type: 1
      };
      list.push(temp);
      that.setData({
        wxchatLists: list,
      })
    });

  },
  voiceButton: function () {
    var that = this;
    chatInput.recordVoiceListener(function (res, duration) {
      let tempFilePath = res.tempFilePath;
      let vDuration = duration;
      console.log(tempFilePath);
      console.log(vDuration + "这是voice的时长");

      var list = that.data.wxchatLists;
      var temp = {
        userImgSrc: '../../image/chat/extra/close_chat.png',
        voiceSrc: tempFilePath,
        voiceTime: vDuration,
        dataTime: utils.formatTime(new Date()),
        msg_type: 'voice',
        type: 1
      };
      list.push(temp);
      that.setData({
        wxchatLists: list,
      })
    });
    chatInput.setVoiceRecordStatusListener(function (status) {
      switch (status) {
        case chatInput.VRStatus.START: //开始录音

          break;
        case chatInput.VRStatus.SUCCESS: //录音成功

          break;
        case chatInput.VRStatus.CANCEL: //取消录音

          break;
        case chatInput.VRStatus.SHORT: //录音时长太短

          break;
        case chatInput.VRStatus.UNAUTH: //未授权录音功能

          break;
        case chatInput.VRStatus.FAIL: //录音失败(已经授权了)

          break;
      }
    })
  },
  extraButton: function () {
    let that = this;
    chatInput.clickExtraListener(function (e) {
      console.log(e);
      let itemIndex = parseInt(e.currentTarget.dataset.index);
      if (itemIndex === 2) {
        that.myFun();
        return;
      }
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['compressed'],
        sourceType: itemIndex === 0 ? ['album'] : ['camera'],
        success: function (res) {
          let tempFilePath = res.tempFilePaths[0];
          console.log(tempFilePath);

          var list = that.data.wxchatLists;
          var temp = {
            dataTime: utils.formatTime(new Date()),
            userImgSrc: '../../image/chat/extra/close_chat.png',
            sendImgSrc: tempFilePath,
            msg_type: 'img',
            type: 1
          };
          list.push(temp);
          that.setData({
            wxchatLists: list,
          })


        }
      });

    });
    chatInput.setExtraButtonClickListener(function (dismiss) {
      console.log('Extra弹窗是否消息', dismiss);
    })
  },


  resetInputStatus: function () {
    chatInput.closeExtraView();
  },
  //播放录音
  playRecord: function (e) {
    let _this = this;
    // wx.playVoice({
    //   filePath: voiceSrc // src可以是录音文件临时路径
    // })
    console.log(e)
    console.log(_this)
  },
  //删除单条消息
  delMsg: function (e) {
    var that = this;
    var magIdx = parseInt(e.currentTarget.dataset.index);
    var list = that.data.wxchatLists;

    wx.showModal({
      title: '提示',
      content: '确定删除此消息吗？',
      success: function (res) {
        if (res.confirm) {
          console.log(e);
          list.splice(magIdx, 1);
          that.setData({
            wxchatLists: list,
          });
          // wx.showToast({
          //   title: '删除成功',
          //   mask: true,
          //   icon: 'none',
          // })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })



  },
  //点击图片 预览大图
  seeBigImg: function (e) {
    var that = this;
    var idx = parseInt(e.currentTarget.dataset.index);
    var src = that.data.wxchatLists[idx].sendImgSrc;
    wx.previewImage({
      current: src, // 当前显示图片的http链接
      urls: [src] // 需要预览的图片http链接列表
    })
  },
  goBack: function () {
    wx.navigateBack({});
  }
});