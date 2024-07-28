// pages/mbti/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: "你是否xxxx？",
    curr_page: 1,
    total_page: 0,
    all_questions: [],
    answers: [],
    selectedCheckbox: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;

    wx.request({
      url: 'http://localhost:8080/mbti/test', // 向后端服务器获取mbti测试信息
      header:{
        'content-type': 'application/json'
      },
      method:'GET',
      success(res){
        let result = res.data;

        if(result.ok){
          that.setData({all_questions:result.data})

          let all_questions = that.data.all_questions;
          that.setData({total_page:all_questions.length})
          // that.setData({total_page:3})
          // 设置存储测试结果的列表
          that.setData({answers:new Array(all_questions.length).fill(null)})

          if(all_questions != []){
            that.setData({question:all_questions[0].question})
          }
        }
      },
      fail(rej){
        console.log(rej.data);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  /*
  * 上一题
  */
  onShiftBack(){
    let curr_page = this.data.curr_page
    this.setData({curr_page:curr_page-1});
    this.setData({question:this.data.all_questions[curr_page-2].question})
    this.setData({selectedCheckbox: this.data.answers[curr_page-2]});
    console.log(this.data.answers);
  },

  /*
  * 下一题
  */
  onShiftNext(){
    let curr_page = this.data.curr_page
    this.setData({curr_page:curr_page+1});
    this.setData({question:this.data.all_questions[curr_page].question})
    this.setData({selectedCheckbox: this.data.answers[curr_page]});
    console.log(this.data.answers);
  },  

  /*
  * 提交
  */
 onSubmit(){
  // 检查是否所有题目都已经回答
  // 记录哪一些题目没有回答
  let notAnswered = [];
  let answers = this.data.answers;
  for(let i = 0; i < answers.length; i++){
    if(answers[i] == null){
      notAnswered.push(i+1);
    }
  }

  if(notAnswered.length > 0){
    wx.showModal({
      title: '提示',
      content: '您还有题目' + notAnswered.join(',') + '没有回答',
      showCancel:false
    })
    return;
  }

  // TODO 随机选择一个MBTI类型
  // 随机数
  let random = Math.floor(Math.random() * 16);
  let mbti = ['ISTJ', 'ISFJ', 'INFJ', 'INTJ', 'ISTP', 'ISFP', 'INFP', 'INTP', 'ESTP', 'ESFP', 'ENFP', 'ENTP', 'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ'];
  let result = mbti[random];

  wx.navigateTo({
    url: '/pages/mbti/result/result?mbti=' + result
  })

},

  // // 提交测试结果
  // let that = this;
  // wx.request({
  //   url: 'http://localhost:8080/mbti/result',
  //   header:{
  //     'content-type': 'application/json'
  //   },
  //   method:'POST',
  //   data:{
  //     answers:answers
  //   },
  //   success(res){
  //     let result = res.data;
  //     if(result.ok){
  //       wx.navigateTo({
  //         url: '/pages/mbti/result/result?result=' + result.data
  //       })
  //     }else{
  //       wx.showModal({
  //         title: '提示',
  //         content: '提交失败',
  //         showCancel:false
  //       })
  //     }
  //   },
  //   fail(rej){
  //     console.log(rej.data);
  //   }
  // })

  onCheck: function(event){
    let score = event.target.dataset.score;
    console.log(score);
    this.setData({selectedCheckbox:score})

    let updatedAnswers = [...this.data.answers]; // 使用扩展运算符来复制数组  
    updatedAnswers[this.data.curr_page-1] = score; // 修改第curr_page项为score
    this.setData({answers:updatedAnswers});

    if(this.data.curr_page == this.data.total_page){
      return;
    }

    setTimeout(() => {
      this.setData({selectedCheckbox:null});
        this.onShiftNext();
    }, 300);
  }
})