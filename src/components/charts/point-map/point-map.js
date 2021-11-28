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
const tipIcon = require('./assets/data-1619318279159-o6ZbTGoO0.png')
let chartDom = null
let myChart = null
let domImg = document.createElement('img')
domImg.style.height = domImg.height = domImg.width = domImg.style.width = '2px'
domImg.src =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAIAAAAmKNuZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkE4MTE0OTgyQTdDQzExRUI4Q0RBRkMwQkFGMTY2NDhEIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkE4MTE0OTgzQTdDQzExRUI4Q0RBRkMwQkFGMTY2NDhEIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QTgxMTQ5ODBBN0NDMTFFQjhDREFGQzBCQUYxNjY0OEQiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QTgxMTQ5ODFBN0NDMTFFQjhDREFGQzBCQUYxNjY0OEQiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4v4trwAAAAVklEQVR42mL0D225cu0hAzWAjpY8C9CsL19/wIV4uDnI5gKNYmKgKhjcxrFAggBZiBIuyDhqRQWQOxoVo1ExGhWjUTEaFYMiKoB1LVq1TXZUAI0CCDAAcAlaxCt7dtQAAAAASUVORK5CYII='

let domImgHover = document.createElement('img')
domImgHover.style.height =
    domImgHover.height =
    domImgHover.width =
    domImgHover.style.width =
        '2px'
domImgHover.src =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAIAAAAmKNuZAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ4IDc5LjE2NDAzNiwgMjAxOS8wOC8xMy0wMTowNjo1NyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjAgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkFDQ0Q2RjYyQTdDRDExRUI4ODUxRDIxRjkzMEExNzg2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkFDQ0Q2RjYzQTdDRDExRUI4ODUxRDIxRjkzMEExNzg2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QUNDRDZGNjBBN0NEMTFFQjg4NTFEMjFGOTMwQTE3ODYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QUNDRDZGNjFBN0NEMTFFQjg4NTFEMjFGOTMwQTE3ODYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6FboimAAAASklEQVR42mIUnL9XtHsDAzXA69IARjWtXJYX7+FCfyQEKeEyMVAVDG7jWCB+RhaihAsybjQqRqNiNCpGo2I0KoZZVDBSt9oGCDAAhYNrvRu3DWEAAAAASUVORK5CYII='
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

let mapInit = () => {
    // console.log('currentJson ===> ', currentJson)
    // const geoJson = require(currentJson)
    echarts.registerMap('XUZHOU', currentJson)
    myChart.hideLoading()
    option = {
        backgroundColor: '#100C2A',
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
            // aspectScale: 1.0,
            // layoutCenter: ['50%', '50%'],
            // layoutSize: '100%',
            // label: {
            //     show: true,
            //     formatter: function (params) {
            //         return params.name
            //     },
            //     textBorderColor: 'rgba(76,129,210,0.85)',
            //     offset: [0, 30],
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
                backgroundColor: 'rgba(76,129,210,0.85)',
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
                            image: domImg,
                            repeat: 'repeat'
                        },
                        shadowColor: 'rgba(0, 0, 0, 0.5)',
                        shadowBlur: 0,
                        shadowOffsetX: 0,
                        shadowOffsetY: 1
                    },
                    emphasis: {
                        areaColor: {
                            image: domImgHover,
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
    myChart.setOption(option)
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
