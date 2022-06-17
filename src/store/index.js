import Vue from 'vue'
import Vuex from 'vuex'
import bill from './modules/bill'
import categories from './modules/categories'
import currency from './modules/currency'
import modal from './modules/modal'
import record from './modules/record'
import loader from './modules/loader'

Vue.use(Vuex)

// https://mybudgetproject.herokuapp.com

export default new Vuex.Store({
  state: {
    maxPageItems: 10
  },
  getters: {
    getMaxPageItems(state){
      return state.maxPageItems;
    },
  },
  modules: {
    bill,
    categories,
    currency,
    modal,
    record,
    loader
  }
})