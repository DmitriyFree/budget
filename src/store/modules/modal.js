export default {
  state: {
    formData: {},
    popupForm: false,
    createForm: false,
  },
  getters: {
    isPopupForm(state) {
      return state.popupForm
    },
    isCreateForm(state) {
      return state.createForm
    },
    getFormData(state) {
      return state.formData
    },

  },
  mutations: {
    changePopupForm(state, active) {
      state.popupForm = active
    },
    changeCreateForm(state, active) {
      state.createForm = active
    },
    setFormData(state, data) {
      state.formData = data
    },
  },
  actions: {
  }
}