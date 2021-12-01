import * as echarts from 'echarts/core'
import { TooltipComponent, LegendComponent } from 'echarts/components'
import { PieChart } from 'echarts/charts'
import { LabelLayout } from 'echarts/features'
import { CanvasRenderer } from 'echarts/renderers'

echarts.use([
    TooltipComponent,
    LegendComponent,
    PieChart,
    CanvasRenderer,
    LabelLayout
])

let chartDom, myChart, option

const initCharts = (id, seriesInSideData, seriesOutSideData) => {
    let legendData = seriesInSideData.list
        .map((item) => (item = item.name))
        .concat(seriesOutSideData.list.map((item) => (item = item.name)))
    chartDom = document.getElementById(id)
    myChart = echarts.init(chartDom)
    option = {
        title: {
            top: 10,
            left: 0,
            text: '工地类型及进度',
            subtext: '',
            x: 'center',
            textStyle: {
                color: '#fff',
                fontWeight: 600,
                fontSize: 18,
                fontFamily: 'Gen Jyuu Gothic'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: [
            {
                orient: 'vertical',
                top: 20,
                right: 0,
                // type: 'scroll',
                icon: 'circle',
                data: legendData.slice(0, 2),
                textStyle: {
                    color: '#fff'
                }
            },
            {
                orient: 'vertical',
                left: 0,
                bottom: 0,
                icon: 'circle',
                data: legendData.slice(2, legendData.length),
                textStyle: {
                    color: '#fff'
                }
            }
        ],
        series: [
            {
                name: seriesInSideData.name,
                type: 'pie',
                // avoidLabelOverlap: false,
                // selectedMode: 'single',
                radius: [0, '30%'],
                itemStyle: {
                    borderRadius: 4,
                    borderColor: '#0a2e5d',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'inner',
                    fontSize: 14,
                    color: '#fff'
                },
                labelLine: {},
                data: seriesInSideData.list
            },
            {
                name: seriesOutSideData.name,
                type: 'pie',
                radius: ['40%', '60%'],
                itemStyle: {
                    borderRadius: 4,
                    borderColor: '#0a2e5d',
                    borderWidth: 2
                },
                labelLine: {
                    length: 15
                },
                label: {
                    formatter: '{b|{b}}',
                    // backgroundColor: '#42b983',
                    borderWidth: 1,
                    borderRadius: 3,
                    padding: 4,
                    rich: {
                        b: {
                            color: '#FFFFFF',
                            fontSize: 14
                        }
                    }
                },
                data: seriesOutSideData.list
            }
        ]
    }

    option && myChart.setOption(option)
}

export default function () {
    return {
        initCharts
    }
}
