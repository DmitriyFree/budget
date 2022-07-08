import Vue from 'vue'
import Vuex from 'vuex'
import bill from '@/store/modules/bill'
import categories from '@/store/modules/categories'
import currency from '@/store/modules/currency'
import record from '@/store/modules/record'
import loader from '@/store/modules/loader'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    bill,
    categories,
    currency,
    record,
    loader
  }
})