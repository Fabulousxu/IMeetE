// pages/square/search-post.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: "",
    loading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.search(options.keyword)
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
  onPullDownRefresh: async function() {
    // // 获取当前正在显示的user-post 的 id
    // let currentComponent = this.getCurrentComponent();
    // console.log(currentComponent);
    // let currentPostList = this.selectComponent('#' + currentComponent);
    // if(currentPostList)
    // {
    //   await currentPostList.refresh();
    // }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: async function() {
    // // 获取当前正在显示的user-post 的 id
    // let currentComponent = this.getCurrentComponent();
    // console.log(currentComponent);
    // let currentPostList = this.selectComponent('#' + currentComponent);
    // if(currentPostList)
    // {
    //   await currentPostList.update();
    // }
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  onSearchConfirm: function(e) {
    this.setData({
      loading: true,
      keyword: e.detail.value
    })
    this.search()
  },

  search(keyword){
    this.setData({
      keyword: keyword,
      loading: false
    })
    console.log(this.data.keyword)
  }
})