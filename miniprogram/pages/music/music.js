// pages/music/music.js
const MAX_LIMIT=15
const db=wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrls:[
      {url:'http://p1.music.126.net/j0gp3gBDRRoqIXxAs0v7oA==/109951165664720877.jpg?imageView&quality=89'},
      {url:'http://p1.music.126.net/zUv2mRobckK7Tdn2bp9iSA==/109951165664840470.jpg?imageView&quality=89'},
      {url:'http://p1.music.126.net/C9I9GxpvRX7nCZyXNBeqOw==/109951165664694558.jpg?imageView&quality=89'},
      {url:'http://p1.music.126.net/WOoIZuva_umxxzYOvWINLA==/109951165664707565.jpg?imageView&quality=89'},
      {url:'http://p1.music.126.net/pOXTFta-mhTpZOGhBBWvhQ==/109951165664682857.jpg?imageView&quality=89'},
      {url:'http://p1.music.126.net/UdSM2BmqY_h_t9HAOzb5dQ==/109951165664710664.jpg?imageView&quality=89'},
      {url:'http://p1.music.126.net/Z90NF2dHuBYrV6x-U9jJJQ==/109951165664719544.jpg?imageView&quality=89'},
      {url:'http://p1.music.126.net/vAjwukVm-H0LOqzy4FTJXA==/109951165664851877.jpg?imageView&quality=89'},
      {url:'http://p1.music.126.net/9Ayx-EeCnuLRWKTcIhGB6g==/109951165664742856.jpg?imageView&quality=89'}
    ],

    
    playlist:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._getPlaylist()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  _getPlaylist(){
    wx.showLoading({
      title: '加载中',
    })
    wx.cloud.callFunction({
      name:'playlist'
    }).then((res)=>{
      console.log(res)
      this.setData({
        playlist:res.result
      })
      wx.hideLoading()
    })
  }
})