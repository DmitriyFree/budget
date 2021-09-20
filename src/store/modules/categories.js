export default {
  state: {
    categories: [
      {
        name: 'Зарплата',
        type: 'Доход'
      },
      {
        name: 'Депозит',
        type: 'Доход'
      },
      {
        name: 'Другое',
        type: 'Доход'
      },
      {
        name: 'Еда',
        type: 'Расход'
      },
      {
        name: 'Дом',
        type: 'Расход'
      },
      {
        name: 'Машына',
        type: 'Расход'
      },
      {
        name: 'Развленения',
        type: 'Расход'
      },
    ]
  },
  getters: {
    getAllCategories(state) {
      return state.categories;
    }
  },
  mutations: {
    addCategory(state, category) {
      state.categories.push(category);
    }
  },
  actions: {
  },
}