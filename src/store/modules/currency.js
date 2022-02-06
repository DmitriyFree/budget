export default {
  state: {
    currency: []
  },
  getters: {
    getAllCurrencies(state) {
      return state.currency;
    },
    getCurrencyById(state) {
      return (id) => {
        const arr = state.currency.filter(item => item.id === id)
        return arr[0];
      }
    },
    getCurrencyByShort(state) {
      return (short) => {
        const arr = state.currency.filter(item => item.short === short);
        return arr[0];
      }
    },
    getMainCurrency(state) {
      let main = {};
      const arr = state.currency;
      arr.forEach(item => {
        if (item.main == true) main = item;
      });
      return main
    },
    checkOriginalCode(state) {
      return (code) => {
        return false;
      }
    }
  },
  mutations: {
    updateCurrency(state, currencies) {
      state.currency = currencies;
    }
  },
  actions: {
    async getCurrencyData(ctx) {

      const res = await fetch(`${process.env.VUE_APP_API_URL}/currency`);
      const data = await res.json();
      const test = process.env.VUE_APP_API_URL;
      ctx.commit('updateCurrency', data);
    },
    async addCurrency(ctx, data) {
      if(!data) return
      const json = JSON.stringify(data);
      const res = await fetch(`${process.env.VUE_APP_API_URL}/currency`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: json
      });
      await ctx.dispatch('getCurrencyData');
    },
    async removeCurrencyById({getters, dispatch}, id) {
      const currencies = getters.getAllCurrencies;
      const selected = currencies.filter((item) => {
        return item.id === id;
      });
      await dispatch('removeBillsByCurrency', selected[0].short);
      const res = await fetch(`${process.env.VUE_APP_API_URL}/currency/${id}`, {

        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
      });
      await dispatch('getCurrencyData');
    },
    async putCurrencyById(ctx, data) {
      if(!data.currency) return
      const jsonData = JSON.stringify(data.currency)
      const res = await fetch(`${process.env.VUE_APP_API_URL}/currency/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: jsonData
      });
      await ctx.dispatch('getCurrencyData');
    },
    async resetMainCurrency(ctx) {
      let mainCurrency = await ctx.getters.getMainCurrency;
      mainCurrency.main = false;
      const json = JSON.stringify(mainCurrency);
      const res = await fetch(`${process.env.VUE_APP_API_URL}/currency/${mainCurrency.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: json
      });
      await ctx.dispatch('getCurrencyData');

    }

  },
}