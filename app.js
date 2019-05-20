App({
    onLaunch: function (){
    },  //获取用户地理位置权限
    getPermission: function (obj){
        var pmse = new Promise((resolve, reject) =>{
            wx.getLocation({
                type: 'wgs84', //返回可以用于wx.openLocation的经纬度
                success: function (res){
                    console.log(res);
                    obj.setData({
                        latitude: res.latitude,     //latitude,
                        longitude: res.longitude      //latitude
                    })
                    resolve()
                },
                fail: function (){
                    wx.getSetting({
                        success: function (res){
                            var statu = res.authSetting;
                            if (!statu['scope.userLocation']) {
                                wx.showModal({
                                    title: '是否授权当前位置',
                                    content: '需要获取您的地理位置，请确认授权，否则地图功能将无法使用',
                                    success: function (tip){
                                        if (tip.confirm) {
                                            wx.openSetting({
                                                success: function (data){
                                                    if (data.authSetting["scope.userLocation"] === true) {
                                                        wx.showToast({
                                                            title: '授权成功',
                                                            icon: 'success',
                                                            duration: 1000
                                                        })
                                                        //授权成功之后，再调用chooseLocation选择地方
                                                        wx.getLocation({
                                                            type: 'wgs84', //返回可以用于wx.openLocation的经纬度
                                                            success: function (res){
                                                                console.log(res);
                                                                obj.setData({
                                                                    latitude: res.latitude,     //latitude,
                                                                    longitude: res.longitude      //latitude
                                                                })
                                                                resolve()
                                                            },
                                                        })
                                                    } else {
                                                        wx.showToast({
                                                            title: '授权失败',
                                                            icon: 'success',
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
                        fail: function (res){
                            wx.showToast({
                                title: '调用授权窗口失败',
                                icon: 'success',
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
