import Vue from 'vue'
import Vuex from 'vuex'
import categories from './modules/categories'

Vue.use(Vuex)


export default new Vuex.Store({
  // state: {
  //   categories: [
  //     {
  //       name: 'Зарплата',
  //       type: 'Доход'
  //     },
  //     {
  //       name: 'Депозит',
  //       type: 'Доход'
  //     },
  //     {
  //       name: 'Другое',
  //       type: 'Доход'
  //     },
  //     {
  //       name: 'Еда',
  //       type: 'Расход'
  //     },
  //     {
  //       name: 'Дом',
  //       type: 'Расход'
  //     },
  //     {
  //       name: 'Машына',
  //       type: 'Расход'
  //     },
  //     {
  //       name: 'Развленения',
  //       type: 'Расход'
  //     },
  //   ]
  // },
  // getters: {
  //   getAllCategories(state) {
  //     return state.categories;
  //   }
  // },
  // mutations: {
  //   addCategory(state, category) {
  //     state.categories.push(category);
  //   }
  // },
  // actions: {
  // },
  modules: {
    categories
  }
})
