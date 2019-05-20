const app = getApp()
Page({
    data: {
        // latitude  : 31.259616,
        // longitude : 100.13026,
        latitude: 30.1533191645,
        longitude: 120.2591371536,
        addr: '请选择位置',
        markers: [
            {
                id: 1,
                latitude: 30.1533191645,
                longitude: 120.2591371536,
                name: 'T.I.T 创意园'
            }
        ],
        covers: [
            {
                latitude: 30.1533191645,
                longitude: 120.2591371536,
                iconPath: '/image/location.png'
            },
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
    gogogo: function (){
        // wx.vibrateShort()
        var _this = this
        app.getPermission(_this).then(//传入that值可以在app.js页面直接设置内容
           function (_this){
               wx.openLocation({ //所以这里会显示你当前的位置
                   latitude: 30.1533191645,
                   longitude: 120.2591371536,
                   name: "杭州市",
                   address: "萧山崇化",
                   scale: 28
               })
           }
        );
    },
})
