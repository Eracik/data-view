<template>
    <div class="environment">
        <baidu-map></baidu-map>
    </div>
</template>

<script>
    import BaiduMap from '../../../components/charts/baidu-map/baidu-map.vue'
    export default {
        name: 'environment',
        components: {
            BaiduMap
        }
    }
</script>

<style scoped lang="scss"></style>
