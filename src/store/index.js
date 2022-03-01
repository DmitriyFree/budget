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
  getters: {
    getStatisticAllBills(state, getters) {
      try {
        const arr = [];
        const bills = getters.getAllBills;
        bills.forEach(item => {
          if (!item.name) return
          const data = {
            id: item.id,
            name: item.name,
            currency: item.currency,
            total: 0,
            income: 0,
            outcome: 0,
            inMain: 0
          }
          const records = getters.getAllRecords;
          records.forEach(record => {
            if (record.bill == item.name) {
              if (record.type == 'Доход') data.income += +record.sum;
              else data.outcome += +record.sum;
            }
          });
          data.total = data.income - data.outcome;
          const currency = getters.getCurrencyByShort(item.currency);
          if (currency) {
            data.inMain = (data.total / currency.rate).toFixed(2);
          }
          arr.push(data);
        });
        return arr;
      } catch (e) {
        console.log(e);
      }
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