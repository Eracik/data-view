<template>
    <div class="data-view">
        <div class="bg-color"></div>
        <div class="container" ref="container">
            <div class="title">
                <dv-decoration-8 style="width: 200px; height: 50px" />
                <div style="width: 240px; height: 30px; text-align: center">
                    数据大看板
                </div>
                <dv-decoration-8
                    :reverse="true"
                    style="width: 200px; height: 50px"
                />
            </div>
            <div class="module-charts">
                <dv-border-box12 class="module module-left"></dv-border-box12>
                <div class="module-middle">
                    <!--                    <Map></Map>-->
                    <!--                    <charts-map></charts-map>-->
                    <point-map></point-map>
                </div>
                <dv-border-box12 class="module module-right"></dv-border-box12>
            </div>
        </div>
    </div>
</template>

<script>
    import { reactive, onMounted } from 'vue'
    import scaleView from '../../mixin/scaleView'
    import SvgIcon from '../../components/svg-icon/svg-icon'
    import ChartsMap from '../../components/charts/map/map.vue'
    import PointMap from '../../components/charts/point-map/point-map.vue'
    import Map from '../../components/map/Map'

    export default {
        name: 'data-view',
        components: {
            Map,
            SvgIcon,
            ChartsMap,
            PointMap
        },
        setup() {
            const data = reactive({})
            const { scaleData, initContainerSize, container } = new scaleView()

            onMounted(() => {
                initContainerSize()
                window.addEventListener(
                    'resize',
                    (e) => {
                        // console.log(baseWidth, '------', baseHeight)
                        console.log('resize ===> ', e.target)
                        setTimeout(() => {
                            initContainerSize()
                        }, 150)
                    },
                    false
                )
            })

            return {
                data,
                scaleData,
                initContainerSize,
                container
            }
        }
    }
</script>

<style scoped lang="scss">
    .data-view {
        position: absolute;
        /*display: flex;*/
        /*justify-content: center;*/
        /*align-items: center;*/
        width: 100vw;
        height: 100vh;
        /*background: transparent url('../../assets/image/container_bg.jpg') center 0 /
      cover no-repeat;*/
        /*background-color: #17263c;*/
        background-color: #100c2a;
        overflow: hidden;
        .bg-color {
            position: fixed;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            /*background-color: rgba(0, 0, 0, 0.6);*/
            z-index: 0;
        }
        .container {
            position: absolute;
            display: flex;
            flex-wrap: wrap;
            flex-direction: column;
            width: 1920px;
            height: 1080px;
            left: 50%;
            top: 50%;
            transform-origin: left top;
            justify-content: space-between;
            align-content: space-between;
            border-radius: 8px;
            z-index: 1;
            padding: 15px;
            box-sizing: border-box;
            .title {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                color: #ffffff;
                flex-basis: 70px;
                font-size: 32px;
            }
            .module-charts {
                display: flex;
                flex: 1;
                .module-left {
                    flex-basis: 400px;
                    z-index: 3;
                }
                .module-middle {
                    display: flex;
                    flex-direction: column;
                    /*position: fixed;*/
                    /*width: 100%;*/
                    /*height: 100%;*/
                    /*left: 0;*/
                    /*top: 0;*/
                    /*background-color: rgba(100, 149, 237, 0.3);*/
                    /*border-radius: 8px;*/
                    /*z-index: 2;*/
                    flex: 1;
                }
                .module-right {
                    flex-basis: 400px;
                    z-index: 3;
                }
            }
            .module {
                position: relative;
                /*background-color: rgba(100, 149, 237, 0.2);*/
                /*box-shadow: 0 0 8px rgba(100, 149, 237, 0.8) inset;*/
                /*border-radius: 8px;*/
                color: #ffffff;
            }
        }
    }
</style>
