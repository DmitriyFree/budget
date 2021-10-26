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

      const res = await fetch('http://localhost:3000/currency');
      const data = await res.json();
      ctx.commit('updateCurrency', data);
    },
    async addCurrency(ctx, data) {
      if(!data) return
      const json = JSON.stringify(data);
      const res = await fetch('http://localhost:3000/currency', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: json
      });
      await ctx.dispatch('getCurrencyData');
    },
    async removeCurrencyById(ctx, id) {
      const res = await fetch(`https://mybudgetproject.herokuapp.com/currency/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
      });
      await ctx.dispatch('getCurrencyData');
    },
    async putCurrencyById(ctx, data) {
      if(!data.currency) return
      const jsonData = JSON.stringify(data.currency)
      const res = await fetch(`https://mybudgetproject.herokuapp.com/currency/${data.id}`, {
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
      const res = await fetch(`https://mybudgetproject.herokuapp.com/${mainCurrency.id}`, {
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