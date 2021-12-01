import * as echarts from 'echarts/core'
import { VisualMapComponent } from 'echarts/components'
import { HeatmapChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
import hangzhouTracksJson from './assets/hangzhou-tracks.json'
import guannanTrackJson from './assets/guannan-tracks.json'
import 'echarts/lib/chart/heatmap' // 热力图
import 'echarts/extension/bmap/bmap' // bMap

echarts.use([VisualMapComponent, HeatmapChart, CanvasRenderer])

let chartDom, myChart, option

const initCharts = () => {
    console.log('init baidu-map')
    chartDom = document.getElementById('baiduMapCharts')
    myChart = echarts.init(chartDom)
    const data = guannanTrackJson
    let points = [].concat.apply(
        [],
        data.map(function (track) {
            return track.map(function (seg) {
                return seg.coord.concat([1])
            })
        })
    )
    myChart.setOption(
        (option = {
            animation: false,
            bmap: {
                center: [119.36249, 34.09799],
                zoom: 14,
                roam: true
            },
            visualMap: {
                show: false,
                top: 'top',
                min: 0,
                max: 5,
                seriesIndex: 0,
                calculable: true,
                inRange: {
                    color: ['blue', 'blue', 'green', 'yellow', 'red']
                }
            },
            series: [
                {
                    type: 'heatmap',
                    coordinateSystem: 'bmap',
                    data: points,
                    pointSize: 5,
                    blurSize: 6
                }
            ]
        })
    )

    console.log('myChart -- > ', myChart)

    option && myChart.setOption(option)

    // 添加百度地图插件
    const bmap = myChart.getModel().getComponent('bmap').getBMap()
    bmap.addControl(new window.BMap.MapTypeControl())
}

export default function () {
    return {
        initCharts
    }
}
