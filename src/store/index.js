import { createStore } from 'vuex'
// import user from './module/user'

const modulesFiles = require.context('./module', true, /\.js$/)
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const moduleValue = modulesFiles(modulePath)
    modules[moduleName] = moduleValue.default
    return modules
}, {})

console.log('modules', modules)
// const nums = ['1', '2', '3', '4', '5']
// const numsResult = nums.reduce((prev, curr, idx, arr) => {
//     console.log(
//         'prev -- ',
//         prev,
//         '---- curr ---- ',
//         curr,
//         '---- arr ---- ',
//         arr,
//         '---- index ---- ',
//         idx
//     )
// }, {})
// console.log(numsResult)

export default createStore({
    state: {},
    mutations: {},
    actions: {},
    modules
})
