<template>
    <div class="map">
        <div id="main"></div>
    </div>
</template>

<script>
    import { onMounted, reactive, computed } from 'vue'
    import MapCharts from './map'
    export default {
        name: 'map',
        setup(props) {
            console.log('props ', props)
            const data = reactive({
                city: '徐州'
            })

            const { initMapCharts } = new MapCharts()

            const options = computed(() => {})

            onMounted(() => {
                console.log('mounted...')
                initMapCharts()
                // $.get(
                //     'https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/asset/geo/HK.json'
                // )
                //     .then((res) => {
                //         console.log(res, '------')
                //     })
                //     .catch((err) => {
                //         console.log('catch ===> ', err)
                //     })
            })

            return {
                // computed
                options,
                // data
                data
            }
        }
    }
</script>

<style scoped lang="scss">
    .map {
        width: 100%;
        height: 100%;
        > div {
            width: 100%;
            height: 100%;
        }
    }
</style>
