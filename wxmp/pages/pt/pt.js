// pages/pt/pt.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    initPoint: 25000, // 初始点棒
    returnPoint: 30000, // 返点点棒
    orderExtra1: 8, // 顺位马1
    orderExtra2: 4, // 顺位马2

    player1Point: 25000,  // 玩家1最终点棒
    player2Point: 25000,  // 玩家2最终点棒
    player3Point: 25000,  // 玩家3最终点棒
    player4Point: 25000,  // 玩家4最终点棒

    player1Score: 0,  // 玩家1最终得分
    player2Score: 0,  // 玩家2最终得分
    player3Score: 0,  // 玩家3最终得分
    player4Score: 0,  // 玩家4最终得分
  },

  onPlayer1PointChange (e) {
    const newPoint = e.detail.value;
    console.log("Player1 New Point:", newPoint);
    this.setData({
      player1Point: newPoint
    })
  },

  onPlayer2PointChange (e) {
    const newPoint = e.detail.value;
    console.log("Player2 New Point:", newPoint);
    this.setData({
      player2Point: newPoint
    })
  },

  onPlayer3PointChange (e) {
    const newPoint = e.detail.value;
    console.log("Player3 New Point:", newPoint);
    this.setData({
      player3Point: newPoint
    })
  },

  onPlayer4PointChange (e) {
    const newPoint = e.detail.value;
    console.log("Player4 New Point:", newPoint);
    this.setData({
      player4Point: newPoint
    })
  },

  /**
   * 计算得分按钮处理事件
   */
  onCalcScore () {
    console.log(`Player's Point: [${this.data.player1Point}, ${this.data.player2Point}, ${this.data.player3Point}, ${this.data.player4Point}]`);

    const topReward = (this.data.returnPoint - this.data.initPoint) / 1000 * 4;
    console.log("topReward=", topReward);

    const p1Score = (this.data.player1Point - this.data.returnPoint) / 1000 + this.data.orderExtra1 + topReward;
    const p2Score = (this.data.player2Point - this.data.returnPoint) / 1000 + this.data.orderExtra2 + 0;
    const p3Score = (this.data.player3Point - this.data.returnPoint) / 1000 - this.data.orderExtra2 + 0;
    const p4Score = (this.data.player4Point - this.data.returnPoint) / 1000 - this.data.orderExtra1 + 0;
    this.setData({
      player1Score: p1Score,
      player2Score: p2Score,
      player3Score: p3Score,
      player4Score: p4Score,
    });

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

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

  adLoad() {
    console.log('Banner 广告加载成功')
  },
  adError(err) {
    console.log('Banner 广告加载失败', err)
  },
  adClose() {
    console.log('Banner 广告关闭')
  }
})