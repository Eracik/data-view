<template>
  <div class="data-view">
    <div class="bg-color"></div>
    <div class="container" ref="container">
      <div class="module-top">
        <div class="module module-left">
          <svg-icon
            icon-class="corner-icon"
            class="icon top-left-icon"
          ></svg-icon>
          <svg-icon
            icon-class="corner-icon"
            class="icon top-right-icon"
          ></svg-icon>
          <svg-icon
            icon-class="corner-icon"
            class="icon bottom-left-icon"
          ></svg-icon>
          <svg-icon
            icon-class="corner-icon"
            class="icon bottom-right-icon"
          ></svg-icon>
        </div>
        <div class="module-middle">
          <Map></Map>
        </div>
        <div class="module module-right">
          <svg-icon
            icon-class="corner-icon"
            class="icon top-left-icon"
          ></svg-icon>
          <svg-icon
            icon-class="corner-icon"
            class="icon top-right-icon"
          ></svg-icon>
          <svg-icon
            icon-class="corner-icon"
            class="icon bottom-left-icon"
          ></svg-icon>
          <svg-icon
            icon-class="corner-icon"
            class="icon bottom-right-icon"
          ></svg-icon>
        </div>
      </div>
      <div class="module module-bottom">
        <svg-icon
          icon-class="corner-icon"
          class="icon top-left-icon"
        ></svg-icon>
        <svg-icon
          icon-class="corner-icon"
          class="icon top-right-icon"
        ></svg-icon>
        <svg-icon
          icon-class="corner-icon"
          class="icon bottom-left-icon"
        ></svg-icon>
        <svg-icon
          icon-class="corner-icon"
          class="icon bottom-right-icon"
        ></svg-icon>
      </div>
    </div>
  </div>
</template>

<script>
  import { reactive, onMounted } from 'vue'
  import scaleView from '../../mixin/scaleView'
  import Map from '../../components/map/Map'
  import SvgIcon from '../../components/svg-icon/svg-icon'
  export default {
    name: 'data-view',
    components: {
      SvgIcon,
      Map
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
    background-color: #17263c;
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
      /*border: 2px solid #6dafef;*/
      border-radius: 8px;
      z-index: 1;
      padding: 15px;
      box-sizing: border-box;
      .module-top {
        display: flex;
        justify-content: space-between;
        width: 100%;
        flex: 1 0 400px;
        .module-left {
          flex-basis: 400px;
          z-index: 3;
        }
        .module-middle {
          position: fixed;
          width: 100%;
          height: 100%;
          left: 0;
          top: 0;
          background-color: rgba(100, 149, 237, 0.3);
          border-radius: 8px;
          z-index: 2;
        }
        .module-right {
          flex-basis: 400px;
          z-index: 3;
        }
      }
      .module-bottom {
        flex: 1;
        margin-top: 15px;
        z-index: 3;
      }
      .module {
        position: relative;
        background-color: rgba(100, 149, 237, 0.2);
        box-shadow: 0 0 8px rgba(100, 149, 237, 0.8) inset;
        /*border-radius: 8px;*/
        font-size: 36px;
        color: #ffffff;
        .icon {
          position: absolute;
          color: rgba(255, 255, 255, 0.8);
        }
        .top-left-icon {
          left: 0;
          top: 0;
          transform: rotate(90deg);
        }
        .top-right-icon {
          right: 0;
          top: 0;
          transform: rotate(-180deg);
        }
        .bottom-left-icon {
          left: 0;
          bottom: 0;
          transform: rotate(0deg);
        }
        .bottom-right-icon {
          right: 0;
          bottom: 0;
          transform: rotate(270deg);
        }
      }
    }
  }
</style>
