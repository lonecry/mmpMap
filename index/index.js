const app = getApp()
Page({
    data: {
        // latitude  : 31.259616,
        // longitude : 100.13026,
        latitude: 30.2286664319,
        longitude: 120.2359199524,
        compass: true,
        markers: [
            {
                id: 1,
                latitude: 30.2286664319,
                longitude: 120.2359199524,
                iconPath: '/image/location.png',
                name: 'T.I.T 创意园',
            }
        ],
        destination: [
            {
                latitude: 30.2286664319,
                longitude: 120.2359199524,
                name: "杭州奥体博览城",
                address: "中国浙江省杭州市萧山区博奥路",
                scale: 18
            }
        ],
        permission: false
    },
    onReady: function (e){
        this.mapCtx = wx.createMapContext('myMap')
    },
    onShow: function (){
        var _this = this;
    },
    moveToLocation: function (){
        this.mapCtx.moveToLocation()
    },
    gogogo: function (k){
        // wx.vibrateShort()
        var _this = this
        app.getPermission(_this).then(//传入that值可以在app.js页面直接设置内容
            function (){
                wx.openLocation(_this.data.destination[0])
            }
        );
    },
})
