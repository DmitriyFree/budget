export default {
  state: {
    isShowLoader: false
  },
  getters: {
    isShowLoader: ({isShowLoader}) => isShowLoader
  },
  mutations: {
    setLoader (state, bool) {
      state.isShowLoader = bool
    }
  },
  actions: {
    toggleLoader ({commit}, bool) {
      commit('setLoader', bool);
    }
  }
}