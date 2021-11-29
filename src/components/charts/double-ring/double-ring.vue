<template>
    <div class="double-ring">
        <div class="main" :id="id"></div>
    </div>
</template>

<script>
    import { onMounted, toRefs } from 'vue'
    import DoubleRingMixin from './double-ring.js'

    export default {
        name: 'double-ring',
        props: {
            id: {
                default: ''
            },
            data: {
                default: {
                    seriesInsideData: {
                        name: '',
                        list: [
                            {
                                name: '',
                                value: ''
                            }
                        ]
                    },
                    seriesOutsideData: {
                        name: '',
                        list: [
                            {
                                name: '',
                                value: ''
                            }
                        ]
                    }
                }
            }
        },
        setup(props) {
            const { initCharts } = new DoubleRingMixin()
            const { id, data } = toRefs(props)
            onMounted(() => {
                console.log('propsValue ', id.value)
                if (id.value) {
                    initCharts(
                        id.value,
                        data.value.seriesInsideData,
                        data.value.seriesOutsideData
                    )
                }
            })
        }
    }
</script>

<style scoped lang="scss">
    .double-ring {
        width: 100%;
        height: 100%;
        .main {
            width: 100%;
            height: 100%;
        }
    }
</style>
