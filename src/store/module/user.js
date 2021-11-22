export default {
  state: {
    userInfo: {
      userName: 'Kitty',
      nickName: '柳月枫',
      gender: 1,
      age: 22,
      phoneNum: '13676767676'
    }
  },
  mutations: {
    CHANGE_USER_INFO(state, data) {
      const { key, val } = data
      state.userInfo[key] = val
      console.log('userInfo ', state.userInfo)
    }
  },
  actions: {
    changeUserInfo({ commit }, data) {
      console.log('change ', data)
      commit('CHANGE_USER_INFO', data)
    }
  }
}
