import * as echarts from 'echarts/core'
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    VisualMapComponent,
    GeoComponent
} from 'echarts/components'
import { MapChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    VisualMapComponent,
    GeoComponent,
    MapChart,
    CanvasRenderer
])

export default function () {
    const initMapCharts = () => {
        // let ROOT_PATH =
        //     'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples'

        let chartDom = document.getElementById('main')
        let myChart = echarts.init(chartDom, 'dark')
        let option

        myChart.showLoading()
        const geoJson = require('../../../util/geo-json/XUZHOU.json')
        // $.get(ROOT_PATH + '/data/asset/geo/HK.json').then((geoJson) => {
        console.log('geoJson ===> ', geoJson)
        myChart.hideLoading()
        echarts.registerMap('XUZHOU', geoJson)
        myChart.setOption(
            (option = {
                title: {
                    text: '徐州工地一览 （2021）'
                    // subtext: '数据来自维基百科',
                    // sublink:
                    //     'http://zh.wikipedia.org/wiki/%E9%A6%99%E6%B8%AF%E8%A1%8C%E6%94%BF%E5%8D%80%E5%8A%83#cite_note-12'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{b}<br/>{c} 个工地'
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        dataView: { readOnly: false },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                visualMap: {
                    min: 100,
                    max: 500,
                    text: ['最高', '最低'],
                    realtime: false,
                    calculable: true,
                    inRange: {
                        color: ['lightskyblue', 'yellow', 'orangered']
                    }
                },
                aria: {
                    enabled: true
                },
                series: [
                    {
                        name: '徐州工地一览',
                        type: 'map',
                        map: 'XUZHOU',
                        label: {
                            show: true
                        },
                        data: [
                            { name: '丰县', value: 90 },
                            { name: '沛县', value: 240 },
                            { name: '铜山区', value: 25 },
                            { name: '泉山区', value: 19 },
                            { name: '鼓楼区', value: 12 },
                            { name: '云龙区', value: 200 },
                            { name: '贾汪区', value: 300 },
                            { name: '邳州市', value: 400 },
                            { name: '睢宁县', value: 290 },
                            { name: '新沂市', value: 480 }
                        ]
                        // // 自定义名称映射
                        // nameMap: {
                        //     'Central and Western': '丰县',
                        //     'Eastern': '沛县'
                        // }
                    }
                ]
            })
        )
        // })

        option && myChart.setOption(option)
    }

    return {
        initMapCharts
    }
}
