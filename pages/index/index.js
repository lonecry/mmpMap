// pages/index/index.js
Page({
	/**
	 * 页面的初始数据
	 */
	data             : {
		latitude : 0,     //latitude,
		longitude: 0      //latitude
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad           : function (options){
	},
	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady          : function (){
	},
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow           : function (){
	},
	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide           : function (){
	},
	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload         : function (){
	},
	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function (){
	},
	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom    : function (){
	},
	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function (){
	},
	forNav           : function (){
		// wx.vibrateShort()
		var _this = this
		_this.getPermission(_this).then(() =>{
			var destination = {
				latitude : _this.data.latitude,
				longitude: _this.data.longitude,
				name     : "中国浙江省杭州市西湖区莫干山路111号",
				address  : "浙江省杭州市拱墅区米市巷街道半道红社区西南方向",
				scale    : 18
			}
			wx.setStorageSync('destination', destination)
			wx.navigateTo({
				url: '../map/map'
			})
		})
	},
	getPermission    : function (obj){
		var pmse = new Promise((resolve, reject) =>{
			wx.getLocation({
				type   : 'gcj02', //返回可以用于wx.openLocation的经纬度
				success: function (res){
					console.log(res);
					obj.setData({
						latitude : res.latitude,     //latitude,
						longitude: res.longitude      //latitude
					})
					resolve()
				},
				fail   : function (){
					wx.getSetting({
						success: function (res){
							var statu = res.authSetting;
							if (!statu['scope.userLocation']) {
								wx.showModal({
									title  : '是否授权当前位置',
									content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
									success: function (tip){
										if (tip.confirm) {
											wx.openSetting({
												success: function (data){
													if (data.authSetting["scope.userLocation"] === true) {
														wx.showToast({
															title   : '授权成功',
															icon    : 'success',
															duration: 1000
														})
														//授权成功之后，再调用chooseLocation选择地方
														wx.getLocation({
															type   : 'gcj02', //返回可以用于wx.openLocation的经纬度
															success: function (res){
																console.log(res);
																obj.setData({
																	latitude : res.latitude,     //latitude,
																	longitude: res.longitude      //latitude
																})
																resolve()
															},
														})
													} else {
														wx.showToast({
															title   : '授权失败',
															icon    : 'success',
															duration: 1000
														})
														reject()
													}
												}
											})
										}
									}
								})
							}
						},
						fail   : function (res){
							wx.showToast({
								title   : '调用授权窗口失败',
								icon    : 'success',
								duration: 1000
							})
							reject()
						}
					})
				}
			})
		})
		return pmse
	}
})