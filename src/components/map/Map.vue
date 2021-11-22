<template>
  <div class="map" id="bigMap"></div>
</template>

<script>
  import { onMounted } from 'vue'
  export default {
    name: 'Map',
    setup() {
      const initMap = () => {
        // 百度地图API功能
        // const map = new window.BMap.Map('bigMap') // 创建地图实例
        // map.centerAndZoom(new window.BMap.Point(120.575192, 31.351404), 11) // 初始化地图，设置中心点和级别
        // map.addControl(
        //   // 添加地图类型控件
        //   new window.BMap.MapTypeControl({
        //     mapTypes: [window.BMAP_NORMAL_MAP, window.BMAP_HYBRID_MAP]
        //   })
        // )
        // map.setCurrentCity('苏州') // 设置地图显示城市 此项必须设置
        // map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放

        // GL版命名空间为window.BMapGL
        // const map = new window.window.BMapGL.Map('bigMap') // 创建Map实例
        // map.centerAndZoom(new window.window.BMapGL.Point(118.5, 27.5), 5) // 初始化地图,设置中心点坐标和地图级别
        // map.enableScrollWheelZoom(true) //开启鼠标滚轮缩放
        // map.setMapType(window.BMAP_EARTH_MAP) // 设置地图类型为地球模式

        // 百度地图API功能
        let map = new window.BMapGL.Map('bigMap')
        let point = new window.BMapGL.Point(120.575192, 31.351404)
        map.centerAndZoom(point, 10)
        map.enableScrollWheelZoom(true)
        map.setTilt(50)
        let bd = new window.BMapGL.Boundary()
        bd.get('苏州市', function (rs) {
          let count = rs.boundaries.length //行政区域的点有多少个
          for (let i = 0; i < count; i++) {
            let path = []
            let str = rs.boundaries[i].replace(' ', '')
            let points = str.split(';')
            for (let j = 0; j < points.length; j++) {
              let lng = points[j].split(',')[0]
              let lat = points[j].split(',')[1]
              // console.log('lng --- ', lng)
              // console.log('lat --- ', lat)
              path.push(new window.BMapGL.Point(lng, lat))
            }
            let prism = new window.BMapGL.Prism(path, 5000, {
              topFillColor: '#5679ea',
              topFillOpacity: 0.5,
              sideFillColor: '#5679ea',
              sideFillOpacity: 0.9
            })

            // const count = rs.boundaries.length
            // if (count === 0) {
            //   alert('未能获取当前输入行政区域')
            //   return
            // }
            // let pointArray = []
            // for (let i = 0; i < count; i++) {
            //   let ply = new window.BMapGL.Polygon(rs.boundaries[i], {
            //     strokeWeight: 1,
            //     strokeColor: '#90c8f1'
            //   })
            //   map.addOverlay(ply)
            //   pointArray = pointArray.concat(ply.getPath())
            // }
            // map.setViewport(pointArray)

            map.addEventListener(
              'click',
              (e) => {
                console.log(e)
                console.log('map click ===> ', JSON.stringify(e.latlng))
              },
              false
            )
            map.addOverlay(prism)
            let icon = new window.BMapGL.Icon(
              require('./icon/position-icon.png'),
              new window.BMapGL.Size(32, 32)
            )
            var marker4 = new window.BMapGL.Marker(
              new window.BMapGL.Point(116.415, 39.931),
              { icon: icon }
            )
            map.addOverlay(marker4)

            const positionList = [
              { lng: 120.79559453054341, lat: 31.122685714764426 },
              { lng: 120.50457996134325, lat: 31.270857541077834 },
              { lng: 120.6632178219665, lat: 31.32348537432197 },
              { lng: 120.617465, lat: 31.336504 }
            ]
            // 绘制带高度的点
            for (let i = 0; i < positionList.length; i++) {
              const point = positionList[i]
              // 地址解析获取对应经纬度
              let pt = new window.BMapGL.Point(point.lng, point.lat)

              let marker = new window.BMapGL.Marker(pt, { icon })
              // let marker = new window.BMapGL.Marker3D(
              //   pt,
              //   Math.round(Math.random()) * 130000,
              //   {
              //     size: 50,
              //     shape: 'BMAP_SHAPE_CIRCLE',
              //     fillColor: '#454399',
              //     fillOpacity: 0.6
              //   }
              // )
              // 添加鼠标事件
              marker.addEventListener('mouseover', function (e) {
                e.target.setFillColor('#f00')
              })
              marker.addEventListener('mouseout', function (e) {
                e.target.setFillColor('#454399')
              })
              marker.addEventListener('click', function (e) {
                console.log('click ', e)
              })
              map.addOverlay(marker)
            }
            // const events = ['click', 'mouseover', 'mouseout']
            // for (let i = 0; i < events.length; i++) {
            //   prism.addEventListener(events[i], (e) => {
            //     switch (events[i]) {
            //       case 'click':
            //         alert('北京市')
            //         break
            //       case 'mouseover':
            //         e.target.setTopFillColor('#475fab')
            //         e.target.setTopFillOpacity(1)
            //         break
            //       case 'mouseout':
            //         e.target.setTopFillColor('#5679ea')
            //         e.target.setTopFillOpacity(0.5)
            //         break
            //     }
            //   })
            // }
          }
          // 绑定鼠标事件
        })

        let styleJson = [
          {
            featureType: 'land',
            elementType: 'geometry',
            stylers: {
              color: '#242f3eff'
            }
          },
          {
            featureType: 'manmade',
            elementType: 'geometry',
            stylers: {
              color: '#242f3eff'
            }
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: {
              color: '#17263cff'
            }
          },
          {
            featureType: 'road',
            elementType: 'geometry.fill',
            stylers: {
              color: '#9e7d60ff'
            }
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#554631ff'
            }
          },
          {
            featureType: 'districtlabel',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#d69563ff'
            }
          },
          {
            featureType: 'districtlabel',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#17263cff',
              weight: 3
            }
          },
          {
            featureType: 'poilabel',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#d69563ff'
            }
          },
          {
            featureType: 'poilabel',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#17263cff',
              weight: 3
            }
          },
          {
            featureType: 'subway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'railway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'poilabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'subwaylabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'subwaylabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'tertiarywaysign',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'tertiarywaysign',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'provincialwaysign',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'provincialwaysign',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'nationalwaysign',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'nationalwaysign',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'highwaysign',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'highwaysign',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'green',
            elementType: 'geometry',
            stylers: {
              color: '#263b3eff'
            }
          },
          {
            featureType: 'nationalwaysign',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#d0021bff'
            }
          },
          {
            featureType: 'nationalwaysign',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#ffffffff'
            }
          },
          {
            featureType: 'city',
            elementType: 'labels',
            stylers: {
              visibility: 'on'
            }
          },
          {
            featureType: 'city',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'city',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#d69563ff'
            }
          },
          {
            featureType: 'city',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#17263cff'
            }
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#d69563ff'
            }
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#242f3eff'
            }
          },
          {
            featureType: 'local',
            elementType: 'geometry.fill',
            stylers: {
              color: '#38414eff'
            }
          },
          {
            featureType: 'local',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#ffffff00'
            }
          },
          {
            featureType: 'fourlevelway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#38414eff'
            }
          },
          {
            featureType: 'fourlevelway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#ffffff00'
            }
          },
          {
            featureType: 'tertiaryway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#38414eff'
            }
          },
          {
            featureType: 'tertiaryway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#ffffff00'
            }
          },
          {
            featureType: 'tertiaryway',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#759879ff'
            }
          },
          {
            featureType: 'fourlevelway',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#759879ff'
            }
          },
          {
            featureType: 'highway',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#759879ff'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#9e7d60ff'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#554631ff'
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#9e7d60ff'
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#554631ff'
            }
          },
          {
            featureType: 'tertiaryway',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#1a2e1cff'
            }
          },
          {
            featureType: 'fourlevelway',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#1a2e1cff'
            }
          },
          {
            featureType: 'highway',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#1a2e1cff'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#1a2e1cff'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#759879ff'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#9e7d60ff'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#554631ff'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'geometry.fill',
            stylers: {
              color: '#9e7d60ff'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#554631ff'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry.fill',
            stylers: {
              color: '#9e7d60ff'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#554631fa'
            }
          },
          {
            featureType: 'medicallabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'medicallabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'entertainmentlabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'entertainmentlabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'estatelabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'estatelabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'businesstowerlabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'businesstowerlabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'companylabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'companylabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'governmentlabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'governmentlabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'restaurantlabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'restaurantlabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'hotellabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'hotellabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'shoppinglabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'shoppinglabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'lifeservicelabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'lifeservicelabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'carservicelabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'carservicelabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'financelabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'financelabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'otherlabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'otherlabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'airportlabel',
            elementType: 'labels',
            stylers: {
              visibility: 'on'
            }
          },
          {
            featureType: 'airportlabel',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#d69563ff'
            }
          },
          {
            featureType: 'airportlabel',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#17263cff'
            }
          },
          {
            featureType: 'airportlabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'highway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '6'
            }
          },
          {
            featureType: 'highway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '7'
            }
          },
          {
            featureType: 'highway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '8'
            }
          },
          {
            featureType: 'highway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '9'
            }
          },
          {
            featureType: 'highway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '10'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '6'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '7'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '8'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '9'
            }
          },
          {
            featureType: 'highway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '10'
            }
          },
          {
            featureType: 'nationalway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '6'
            }
          },
          {
            featureType: 'nationalway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '7'
            }
          },
          {
            featureType: 'nationalway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '8'
            }
          },
          {
            featureType: 'nationalway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '9'
            }
          },
          {
            featureType: 'nationalway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '10'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '6'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '7'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '8'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '9'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '10'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '6'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '7'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '8'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '9'
            }
          },
          {
            featureType: 'nationalway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '10'
            }
          },
          {
            featureType: 'highway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '6'
            }
          },
          {
            featureType: 'highway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '7'
            }
          },
          {
            featureType: 'highway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '8'
            }
          },
          {
            featureType: 'highway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '9'
            }
          },
          {
            featureType: 'highway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '10'
            }
          },
          {
            featureType: 'provincialway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '8,9',
              level: '8'
            }
          },
          {
            featureType: 'provincialway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '8,9',
              level: '9'
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '8,9',
              level: '8'
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '8,9',
              level: '9'
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '8,9',
              level: '8'
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '8,9',
              level: '9'
            }
          },
          {
            featureType: 'cityhighway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '6'
            }
          },
          {
            featureType: 'cityhighway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '7'
            }
          },
          {
            featureType: 'cityhighway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '8'
            }
          },
          {
            featureType: 'cityhighway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '9'
            }
          },
          {
            featureType: 'cityhighway',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '10'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '6'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '7'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '8'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '9'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '10'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '6'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '7'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '8'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '9'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '6,10',
              level: '10'
            }
          },
          {
            featureType: 'arterial',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '9,10',
              level: '9'
            }
          },
          {
            featureType: 'arterial',
            stylers: {
              curZoomRegionId: '0',
              curZoomRegion: '9,10',
              level: '10'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '9,10',
              level: '9'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'geometry',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '9,10',
              level: '10'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '9,10',
              level: '9'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'labels',
            stylers: {
              visibility: 'off',
              curZoomRegionId: '0',
              curZoomRegion: '9,10',
              level: '10'
            }
          },
          {
            featureType: 'building',
            elementType: 'geometry.topfill',
            stylers: {
              color: '#2a3341ff'
            }
          },
          {
            featureType: 'building',
            elementType: 'geometry.sidefill',
            stylers: {
              color: '#313b4cff'
            }
          },
          {
            featureType: 'building',
            elementType: 'geometry.stroke',
            stylers: {
              color: '#1a212eff'
            }
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#759879ff'
            }
          },
          {
            featureType: 'road',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#1a2e1cff'
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#759879ff'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#759879ff'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#759879ff'
            }
          },
          {
            featureType: 'provincialway',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#1a2e1cff'
            }
          },
          {
            featureType: 'cityhighway',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#1a2e1cff'
            }
          },
          {
            featureType: 'arterial',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#1a2e1cff'
            }
          },
          {
            featureType: 'local',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'manmade',
            elementType: 'labels.text.fill',
            stylers: {
              color: '#d69563ff'
            }
          },
          {
            featureType: 'manmade',
            elementType: 'labels.text.stroke',
            stylers: {
              color: '#17263cff'
            }
          },
          {
            featureType: 'subwaystation',
            elementType: 'geometry',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'transportationlabel',
            elementType: 'labels.icon',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'transportationlabel',
            elementType: 'labels',
            stylers: {
              visibility: 'off'
            }
          },
          {
            featureType: 'estate',
            elementType: 'geometry',
            stylers: {
              color: '#2a3341ff'
            }
          }
        ]
        map.setMapStyleV2({ styleJson: styleJson })
        // let bd1 = new window.BMapGL.Boundary()
        // bd1.get('苏州市', function (rs) {
        //   let count = rs.boundaries.length
        //   for (let i = 0; i < count; i++) {
        //     let str = rs.boundaries[i].replace(' ', '')
        //     let points = str.split(';')
        //     let path = []
        //     for (let j = 0; j < points.length; j++) {
        //       let lng = points[j].split(',')[0]
        //       let lat = points[j].split(',')[1]
        //       path.push(new window.BMapGL.Point(lng, lat))
        //     }
        //     console.log('paths ===> ', path)
        //     let prism = new window.BMapGL.Prism(path, 5000, {
        //       topFillColor: '#5679ea',
        //       topFillOpacity: 0.6,
        //       sideFillColor: '#5679ea',
        //       sideFillOpacity: 0.9
        //     })
        //     map.addOverlay(prism)
        //
        //     // 绑定鼠标事件
        //     let events = ['click', 'mouseover', 'mouseout']
        //     console.log('events ', events)
        //     for (let i = 0; i < events.length; i++) {
        //       prism.addEventListener(events[i], (e) => {
        //         console.log('e', e)
        //         switch (events[i]) {
        //           case 'click':
        //             alert('苏州市')
        //             break
        //           case 'mouseover':
        //             e.target.setTopFillColor('#475fab')
        //             e.target.setTopFillOpacity(1)
        //             break
        //           case 'mouseout':
        //             e.target.setTopFillColor('#5679ea')
        //             e.target.setTopFillOpacity(0.5)
        //             break
        //         }
        //       })
        //     }
        //   }
        // })
      }

      onMounted(() => {
        initMap()
      })

      return {}
    }
  }
</script>

<style scoped lang="scss">
  .map {
    width: 1920px;
    height: 1080px;
  }
</style>
