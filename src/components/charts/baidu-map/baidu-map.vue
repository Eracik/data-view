<template>
    <div class="baidu-map">
        <div id="baiduMapCharts" class="baidu-map-charts"></div>
    </div>
</template>

<script>
    import { onMounted } from 'vue'
    import BaiduMapMixin from './baidu-map.js'
    export default {
        name: 'baidu-map',
        setup() {
            const { initCharts } = new BaiduMapMixin()

            onMounted(() => {
                initCharts()
            })
        }
    }
</script>

<style scoped lang="scss">
    .baidu-map {
        position: relative;
        width: 1500px;
        height: 800px;
        > .baidu-map-charts {
            width: 100%;
            height: 100%;
        }
    }
</style>
