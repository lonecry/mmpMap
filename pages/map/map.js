const app = getApp()
Page({
	data          : {
		// latitude  : 31.259616,
		// longitude : 100.13026,
		latitude   : 30.3077027611,
		longitude  : 120.3888970613,
		compass    : true,
		markers    : [
			{
				id       : 1,
				latitude : 30.2286664319,
				longitude: 120.2359199524,
				iconPath : '/image/location.png',
				name     : 'T.I.T 创意园',
			}
		],
		destination: [
			{
				latitude : 30.3077027611,
				longitude: 120.3888970613,
				name     : "学正街18号浙江工商大学",
				address  : "信电学院",
				scale    : 18
			}
		],
		permission : false
	},
	onReady       : function (e){
		this.mapCtx = wx.createMapContext('myMap')
	},
	onShow        : function (){
		
		var _this = this;
		var destination = wx.getStorageSync('destination')
		_this.setData({
			latitude : destination.latitude,
			longitude: destination.longitude,
		})
		_this.setData({
			["markers[0].latitude"] : destination.latitude,
			["markers[0].longitude"]: destination.longitude,
		})
	},
	moveToLocation: function (){
		this.mapCtx.moveToLocation()
	},
	gogogo        : function (k){
		var _this = this;
		wx.openLocation(_this.data.destination[0])
	},
})
