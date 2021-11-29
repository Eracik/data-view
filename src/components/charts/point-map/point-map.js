const geoJSON_XUZHOU = require('./geoJson/city/GeoJSON_XuZhou.json')
const areaGeoModuleFiles = require.context(
    './geoJson/city/area',
    true,
    /\.json$/
)
const mapJson = []
let mainMapData = [
    {
        name: '丰县',
        value: [116.609115, 34.689993],
        datas: 111,
        img: 'image://' + require('./assets/data-1619059442567-s5l7-f8Eu9.png')
    },
    {
        name: '贾汪区',
        value: [117.466549, 34.383225],
        datas: 333,
        img: 'image://' + require('./assets/data-1619059442567-s5l7-f8Eu9.png')
    },
    {
        name: '睢宁县',
        value: [117.883874, 33.940583],
        datas: 777,
        img: 'image://' + require('./assets/data-1619059442567-s5l7-f8Eu9.png')
    },
    {
        name: '鼓楼区',
        value: [117.140874, 34.308857],
        datas: 222,
        img: 'image://' + require('./assets/data-1619059442567-s5l7-f8Eu9.png')
    },

    {
        name: '沛县',
        value: [116.89743, 34.695157],
        datas: 444,
        img: 'image://' + require('./assets/data-1619059442567-s5l7-f8Eu9.png')
    },
    {
        name: '邳州市',
        value: [117.894633, 34.394653],
        datas: 555,
        img: 'image://' + require('./assets/data-1619059442567-s5l7-f8Eu9.png')
    },
    {
        name: '泉山区',
        value: [117.14344, 34.263318],
        datas: 666,
        img: 'image://' + require('./assets/data-1619059442567-s5l7-f8Eu9.png')
    },

    {
        name: '铜山区',
        value: null,
        datas: 888,
        img: 'image://' + require('./assets/data-1619059442567-s5l7-f8Eu9.png')
    },
    {
        name: '新沂市',
        value: [118.340051, 34.280354],
        datas: 999,
        img: 'image://' + require('./assets/data-1619059442567-s5l7-f8Eu9.png')
    },
    {
        name: '云龙区',
        value: [117.269232, 34.212042],
        datas: 123,
        img: 'image://' + require('./assets/data-1619059442567-s5l7-f8Eu9.png')
    }
]

let mapData = []

areaGeoModuleFiles.keys().reduce((modules, modulePath) => {
    const moduleKey = areaGeoModuleFiles(modulePath).features[0].properties.name
    const moduleValue = areaGeoModuleFiles(modulePath)
    mapJson.push({
        name: moduleKey,
        json: moduleValue
    })
    const mapDataIndex = mainMapData.findIndex(
        (item) => item.name === moduleKey
    )
    if (mapDataIndex !== -1) {
        mainMapData[mapDataIndex].value =
            areaGeoModuleFiles(modulePath).features[0].properties.centroid
    }
    return modules
}, {})
// console.log('mapJson ======> ', mapJson)
// console.log('mapData ======> ', JSON.stringify(mapData))
let currentJson = geoJSON_XUZHOU
mapData = mainMapData
import * as echarts from 'echarts/core'
import {
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    VisualMapComponent,
    GeoComponent
} from 'echarts/components'
import { MapChart, EffectScatterChart, ScatterChart } from 'echarts/charts'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([
    TitleComponent,
    ToolboxComponent,
    TooltipComponent,
    VisualMapComponent,
    GeoComponent,
    MapChart,
    CanvasRenderer,
    EffectScatterChart,
    ScatterChart
])

let option
let chartDom = null
let myChart = null
const createMap = (changeArea) => {
    const _changeArea = changeArea
    chartDom = document.getElementById('main')
    myChart = echarts.init(chartDom, 'dark')
    // let index = -1
    myChart.on('click', (e) => {
        console.log('click map ===> ', e)
        if (typeof e.data === 'undefined') {
            alert('跳转至区级平台')
            return
        }
        let chooseName = mapJson.filter((item) => {
            return item.name == e.name
        })
        if (chooseName.length) {
            currentJson = chooseName[0].json
        } else {
            console.log('this child ===> ', e)
            alert('跳转至' + e.name + '工地端')
            return
        }

        if (e.data.name === '丰县') {
            mapData = [
                {
                    name: '新城区汽车站',
                    value: [116.609115, 34.689993],
                    datas: '初审',
                    img:
                        'image://' +
                        require('./assets/data-1619059442567-s5l7-f8Eu9.png')
                },
                {
                    name: '人民路小学',
                    value: [116.677381, 34.723778],
                    datas: '完工中',
                    img:
                        'image://' +
                        require('./assets/data-1619059442567-s5l7-f8Eu9.png')
                },
                {
                    name: '民族中学',
                    value: [116.564698, 34.723778],
                    datas: '申报中',
                    img:
                        'image://' +
                        require('./assets/data-1619059442567-s5l7-f8Eu9.png')
                }
            ]
        } else {
            mapData = []
        }
        // console.log('change geoJson ===> ', currentJson)
        _changeArea(1)
        const $back = document.getElementsByClassName('back')[0]
        $back.addEventListener('click', () => {
            mapData = mainMapData
            currentJson = geoJSON_XUZHOU
            _changeArea(0)
            mapInit()
        })
        mapInit()
    })
    myChart.showLoading('default', {
        text: '统计中，请稍候...',
        maskColor: '#100C2A',
        // '#2957A2',
        textColor: '#fff'
    })
    setTimeout(function () {
        mapInit()
    }, 1000)
}

const getAreaName = () => {
    const geoJson = currentJson
    if (geoJson.features.length === 10) {
        return '徐州市'
    } else {
        return currentJson.features[0].properties.name
    }
}

const mapInit = () => {
    // console.log('currentJson ===> ', currentJson)
    // const geoJson = require(currentJson)
    echarts.registerMap('XUZHOU', currentJson)
    myChart.hideLoading()
    option = {
        backgroundColor: '#0a2e5d',
        // '#100C2A',
        title: {
            top: 20,
            text: '江苏省 - ' + getAreaName(),
            subtext: '',
            x: 'center',
            textStyle: {
                color: '#fff',
                fontWeight: 100,
                fontSize: 22
            }
        },
        tooltip: {
            show: false,
            trigger: 'item'
            // formatter: function (params) {
            //     const arr = mapData.filter((item) => item.name === params.name)
            //     console.log('arr ', JSON.stringify(arr))
            //     const num = arr[0].datas
            //     return `${params.name}<br/>${num} 个工地`
            // }
        },
        geo: {
            map: 'XUZHOU',
            nameProperty: 'NAME',
            // label: {
            //     show: true,
            //     formatter: function (params) {
            //         return params.name
            //     },
            //     textBorderColor: 'rgba(76,129,210,0.85)',
            //     offset: [0, 0],
            //     textStyle: {
            //         color: '#fff'
            //     }
            // },
            tooltip: {
                show: true,
                trigger: 'item',
                formatter: function (params) {
                    return `${params.name}<br>${
                        Number(params.data.datas)
                            ? '工地数：' + params.data.datas
                            : '进度：' + params.data.datas
                    }`
                },
                position: 'top',
                backgroundColor: 'rgba(76,129,210,.5)',
                borderColor: 'rgba(76,129,210,1)',
                textStyle: {
                    fontSize: 14,
                    fontWeight: 'normal',
                    color: '#fff'
                }
            },
            silent: true,
            roam: false,
            z: 0,
            zoom: 1, // 当前视角的缩放比例
            itemStyle: {
                normal: {
                    areaColor: 'rgba(82,117,220,0.6)',
                    shadowColor: 'rgba(0, 0, 0, 1)',
                    shadowBlur: 0,
                    shadowOffsetX: 0,
                    shadowOffsetY: 5,
                    borderColor: 'rgba(0, 0, 0, 0.7)',
                    borderWidth: 0.5
                },
                emphasis: {
                    areaColor: '#2AB8FF',
                    borderWidth: 1,
                    color: 'green',
                    label: {
                        show: false
                    }
                }
            }
        },
        series: [
            {
                type: 'map',
                selectedMode: false, // 此属性可防止关闭点击选择地图区域时，被选中区域显示黄色的问题。
                label: {
                    normal: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            color: '#fff'
                        }
                    }
                },
                itemStyle: {
                    normal: {
                        borderColor: '#2ab8ff',
                        borderWidth: 1,
                        areaColor: {
                            image: require('./assets/area-bg.png'),
                            repeat: 'repeat'
                        },
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 1
                    },
                    emphasis: {
                        areaColor: {
                            image: require('./assets/area-bg-hover.png'),
                            repeat: 'repeat'
                        },
                        borderColor: '#2ab8ff',
                        borderWidth: 1,
                        shadowColor: 'rgba(0, 255, 255, 0.7)',
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowOffsetY: 1,
                        label: {
                            show: false
                        }
                    }
                },
                zoom: 1,
                roam: false,
                map: 'XUZHOU'
            },
            {
                tooltip: {
                    show: false
                },
                type: 'effectScatter',
                coordinateSystem: 'geo',
                rippleEffect: {
                    scale: 10,
                    brushType: 'stroke'
                },
                showEffectOn: 'render',
                itemStyle: {
                    normal: {
                        shadowColor: '#0ff',
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowOffsetY: 0,
                        color: function (params) {
                            let colorList = [
                                new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                    {
                                        offset: 0,
                                        color: '#64fbc5'
                                    },
                                    {
                                        offset: 1,
                                        color: '#018ace'
                                    }
                                ]),
                                new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                    {
                                        offset: 0,
                                        color: '#64fbc5'
                                    },
                                    {
                                        offset: 1,
                                        color: '#018ace'
                                    }
                                ]),
                                new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                    {
                                        offset: 0,
                                        color: '#168e6d'
                                    },
                                    {
                                        offset: 1,
                                        color: '#c78d7b'
                                    }
                                ])
                                // new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                //     {
                                //         offset: 0,
                                //         color: '#61c0f1'
                                //     },
                                //     {
                                //         offset: 1,
                                //         color: '#6f2eb6'
                                //     }
                                // ]),
                                // new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                //     {
                                //         offset: 0,
                                //         color: '#168e6d'
                                //     },
                                //     {
                                //         offset: 1,
                                //         color: '#c78d7b'
                                //     }
                                // ]),
                                // new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                //     {
                                //         offset: 0,
                                //         color: '#61c0f1'
                                //     },
                                //     {
                                //         offset: 1,
                                //         color: '#6f2eb6'
                                //     }
                                // ]),
                                // new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                                //     {
                                //         offset: 0,
                                //         color: '#61c0f1'
                                //     },
                                //     {
                                //         offset: 1,
                                //         color: '#6f2eb6'
                                //     }
                                // ])
                            ]
                            return colorList[params.dataIndex]
                        }
                    }
                },
                label: {
                    normal: {
                        color: '#fff'
                    }
                },
                symbol: 'circle',
                symbolSize: [10, 6],
                data: mapData,
                z: 998
            },
            {
                type: 'scatter',
                // tooltip: {
                //     show: true,
                //     trigger: 'item',
                //     formatter: function (params) {
                //         console.log('params ===> ', params)
                //         return `${params.name}<br/>${params.data.datas} 个工地`
                //     }
                // },
                coordinateSystem: 'geo',
                itemStyle: {
                    color: '#FFFFFF'
                },
                symbol: function (value, params) {
                    return params.data.img
                },
                symbolSize: [32, 41],
                symbolOffset: [0, -20],
                z: 999,
                data: mapData
            }
            // {
            //     type: 'scatter',
            //     coordinateSystem: 'geo',
            //     label: {
            //         normal: {
            //             show: true,
            //             formatter: function (params) {
            //                 let name = params.name
            //                 let value = params.data.datas
            //                 let text = `{fline|${name}}\n{tline|工地*${value}}`
            //                 return text
            //             },
            //             color: '#fff',
            //             rich: {
            //                 fline: {
            //                     padding: [0, 25],
            //                     color: '#fff',
            //                     textShadowColor: '#030615',
            //                     textShadowBlur: '0',
            //                     textShadowOffsetX: 1,
            //                     textShadowOffsetY: 1,
            //                     fontSize: 14,
            //                     fontWeight: 400
            //                 },
            //                 tline: {
            //                     padding: [0, 22],
            //                     color: '#ABF8FF',
            //                     fontSize: 12
            //                 }
            //             }
            //         },
            //         emphasis: {
            //             show: true
            //         }
            //     },
            //     itemStyle: {
            //         color: '#FFFFFF'
            //     },
            //     symbol: 'image://' + tipIcon,
            //     symbolSize: [100, 60],
            //     symbolOffset: [0, -70],
            //     z: 1000,
            //     data: mapData
            // }
        ]
    }
    option && myChart.setOption(option)
    // })
}

export default function () {
    const initMap = createMap

    return {
        initMap,
        mapJson,
        mapData,
        myChart
    }
}
