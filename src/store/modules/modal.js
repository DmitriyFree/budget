export default {
  state: {
    formData: {},
    modalShow: false
  },
  getters: {
    getModalActive(state) {
      return state.modalShow;
    },
    getFormData(state) {
      return state.formData;
    }
  },
  mutations: {
    changeModalActive(state, active) {
      state.modalShow = active;
    },
    setFormData(state, data) {
      state.formData = data;
   }
  },
  actions: {
  }
}