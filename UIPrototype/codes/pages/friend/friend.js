// pages/index/index.js
Page({
  data: {
    selectedGender: '', // To store the selected gender
    selectedMBTI: '', // To store the selected MBTI type
    mbtiTypes: [
      ['INTJ', 'INTP', 'ENTJ', 'ENTP'],
      ['ISTP', 'ISFP', 'ESFP', 'ESTP'],
      ['INFJ', 'ENFP', 'ENFJ', 'INFP'],
      ['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ']
    ],
    genderTypes: [{
        type: 'man',
        image: '/src/friend/man.png'
      },
      {
        type: 'woman',
        image: '/src/friend/woman.png'
      }
    ],
    onLoad: function (options) {
      wx.loadFontFace({
        family: 'zhanku font',
        source: 'url("https://github.com/HangZhouShuChengKeJi/freeFontLibrary/blob/master/%E7%AB%99%E9%85%B7%EF%BC%88%E5%A5%BD%E7%9C%8B%EF%BC%8C%E7%B1%BB%E4%BC%BC%E8%89%BA%E6%9C%AF%E5%AD%97%EF%BC%89/%E7%AB%99%E9%85%B7%E5%BF%AB%E4%B9%90%E4%BD%93/%E7%AB%99%E9%85%B7%E5%BF%AB%E4%B9%90%E4%BD%932016%E4%BF%AE%E8%AE%A2%E7%89%88.ttf")',
        success: console.log
      });
    }
  },

  // Function to handle gender selection
  onGenderTap: function (event) {
    this.setData({
      selectedGender: event.currentTarget.dataset.type
    });
    console.log(this.data.selectedGender);
  },

  // Function to handle MBTI type selection
  onMBTITap: function (event) {
    this.setData({
      selectedMBTI: event.currentTarget.dataset.type
    });
    console.log(this.data.selectedMBTI);
  },

  // Function to handle the commit action
  onCommitTap: function () {
    if (!this.data.selectedGender || !this.data.selectedMBTI) {
      wx.showToast({
        title: 'Please select both gender and MBTI type',
        icon: 'none'
      });
      return;
    } else {
      wx.navigateTo({
        url: '/pages/friend/success'
      })
    }

    // Process the selected options. You can modify this part to suit your needs, such as navigating to another page or calling an API.
    wx.showToast({
      title: `Selected Gender: ${this.data.selectedGender}, Selected MBTI: ${this.data.selectedMBTI}`,
      icon: 'success'
    });

    // Implement additional logic here, e.g., saving the selection or navigating
  },

  // Lifecycle function--Called when page load
  onLoad: function (options) {
    // Initialize your page, if needed
  },

  // Lifecycle function--Called when page is initially rendered
  onReady: function () {
    // After the view is rendered, if you need to do something
  },

  // Lifecycle function--Called when page show
  onShow: function () {
    // Page appearing on screen
  },

  // Lifecycle function--Called when page hide
  onHide: function () {
    // Page going off screen
  },

  // Lifecycle function--Called when page unload
  onUnload: function () {
    // Page being destroyed
  }
});