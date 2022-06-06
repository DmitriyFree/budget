export default {
  state: {
    formData: {},
    popupForm: false,
    createForm: false,
    confirmModalText: ""
  },
  getters: {
    isPopupForm(state) {
      return state.popupForm;
    },
    isCreateForm(state) {
      return state.createForm;
    },
    getFormData(state) {
      return state.formData;
    },
    getConfirmModalText(state) {
      return state.confirmModalText;
    }

  },
  mutations: {
    changePopupForm(state, active) {
      state.popupForm = active;
    },
    changeCreateForm(state, active) {
      state.createForm = active;
    },
    setFormData(state, data) {
      state.formData = data;
    },
    setConfirmModalText(state, text) {
      state.confirmModalText = text;
    }
  },
  actions: {
  }
}