import { reactive, ref } from 'vue'
const baseWidth = 1920
const baseHeight = 1080
export default function () {
  const scaleData = reactive({
    originWidth: 0,
    originHeight: 0,
    initScaleSize: null
  })

  const container = ref(null)

  const initContainerSize = () => {
    const innerWidth = window.innerWidth
    const innerHeight = window.innerHeight
    let _scaleValue = 1
    if (innerHeight / innerWidth > baseHeight / baseWidth) {
      scaleData.originWidth = innerWidth
      scaleData.originHeight = (baseHeight / baseWidth) * scaleData.originWidth
      _scaleValue = scaleData.originWidth / baseWidth
    } else {
      scaleData.originHeight = innerHeight
      scaleData.originWidth = (baseWidth / baseHeight) * scaleData.originHeight
      _scaleValue = scaleData.originHeight / baseHeight
    }
    container.value.style.transform =
      'scale(' + _scaleValue + ') translate(-50%,-50%)'
  }

  return {
    scaleData,
    initContainerSize,
    container
  }
}
