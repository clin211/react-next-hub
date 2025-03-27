'use client'

import Script from 'next/script'

export default function Page() {

    return (
        <>
            <div id="container"></div>
            <Script
                id="google-maps"
                src="https://map.qq.com/api/gljs?v=1.exp&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77"
                onReady={() => {
                    const center = new TMap.LatLng(39.984104, 116.307503);
                    //初始化地图
                    const map = new TMap.Map("container", {
                        rotation: 20,//设置地图旋转角度
                        pitch: 30, //设置俯仰角度（0~45）
                        zoom: 12,//设置地图缩放级别
                        center: center//设置地图中心点坐标
                    });
                    console.log('map:', map);
                }}
            />
        </>
    )
}