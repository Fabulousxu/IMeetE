// pages/mbti/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    question: "你是否xxxx？",
    curr_page: 1,
    total_page: 160,
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
  console.log("提交")
},  

  onCheck: function(event){
    let score = event.target.dataset.score;
    console.log(score);
    this.setData({selectedCheckbox:score})

    let updatedAnswers = [...this.data.answers]; // 使用扩展运算符来复制数组  
    updatedAnswers[this.data.curr_page-1] = score; // 修改第curr_page项为score
    this.setData({answers:updatedAnswers});

    setTimeout(() => {
      this.setData({selectedCheckbox:null});
        this.onShiftNext();
    }, 300);
  }
})