export default {
  state: {
    modalShow: false
  },
  getters: {
    getModalActive(state) {
      return state.modalShow;
    }
  },
  mutations: {
    changeModalActive(state, active) {
      state.modalShow = active;
    }
  },
  actions: {
  }
}