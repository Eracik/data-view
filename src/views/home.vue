<template>
    <div class="home">
        <!--        <div class="user-info">-->
        <!--            {{ userInfo }}-->
        <!--        </div>-->
        <!--        <div class="form">-->
        <!--            <div class="input-group">-->
        <!--                <label name="userName">用户名</label>-->
        <!--                <input v-model="userInfo.userName" id="userName" />-->
        <!--            </div>-->
        <!--            <button @click="saveUserInfo">修改</button>-->
        <!--        </div>-->
        <PointMap></PointMap>
    </div>
</template>

<script>
    import { useStore } from 'vuex'
    import { ref, onMounted, defineAsyncComponent } from 'vue'
    const PointMap = defineAsyncComponent(() =>
        import('../components/charts/point-map/point-map.vue')
    )
    export default {
        name: 'Home',
        components: { PointMap },
        setup() {
            const store = useStore()

            const userInfo = ref({})

            const saveUserInfo = () => {
                store.dispatch('user/changeUserInfo', {
                    key: 'userName',
                    val: userInfo.value.userName
                })
            }

            onMounted(() => {
                userInfo.value = store.state.user.userInfo
            })

            return {
                userInfo,
                saveUserInfo
            }
        }
    }
</script>

<style scoped lang="scss">
    .home {
        width: 100vw;
        height: 100vh;
    }
</style>
