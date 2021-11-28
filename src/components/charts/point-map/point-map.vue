<template>
    <div class="map">
        <div id="main" class="main"></div>
        <div class="back" v-show="data.isChildArea">
            <svg-icon icon-class="back-icon"></svg-icon>
            Back
        </div>
    </div>
</template>

<script>
    import { onMounted, reactive } from 'vue'
    import PointMap from './point-map.js'
    import SvgIcon from '../../svg-icon/svg-icon'
    // import geoJson from './geoJson/bd.json'
    export default {
        name: 'PointMap',
        components: { SvgIcon },
        setup() {
            const { initMap } = new PointMap()

            const data = reactive({
                isChildArea: 0 // 0.市  1.区县
            })

            const request = (url) => {
                return new Promise((resolve, reject) => {
                    fetch(url)
                        .then((res) => {
                            res.json()
                        })
                        .then((res) => {
                            resolve(res)
                        })
                        .catch((err) => {
                            reject(err)
                        })
                })
            }

            const changeArea = (val) => {
                data.isChildArea = val
                console.log('当前区域级别 ===> ', val)
            }

            onMounted(() => {
                initMap(changeArea)
            })

            return {
                request,
                initMap,
                data
            }
        }
    }
</script>

<style scoped lang="scss">
    .map {
        position: relative;
        width: 100%;
        height: 100%;
        > .main {
            width: 100%;
            height: 100%;
        }
        > .back {
            position: absolute;
            line-height: 28px;
            left: 30px;
            top: 30px;
            font-size: 14px;
            color: #2957a2;
            padding: 0 10px;
            /*border: 1px solid #0a1d3c;*/
            background-color: #ffffff;
            /*border-radius: 4px;*/
            cursor: pointer;
        }
    }
</style>
