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
    async putCurrencyById({getters, dispatch}, data) {
      if(!data.currency) return
      // changeCurrencyCode
      const currencyList = getters.getAllCurrencies;
      const selected = currencyList.filter(item => {
        return item.id == data.id
      });
      if(selected.length == 0) {
        return
      }
      const exportData = {
        oldName: selected[0].short,
        newName: data.currency.short
      }
      if (exportData.newName == exportData.oldName) {
        return
      } else {
        await dispatch('changeCurrencyCode', exportData)
      }
      const jsonData = JSON.stringify(data.currency)
      const res = await fetch(`${process.env.VUE_APP_API_URL}/currency/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: jsonData
      });
      await dispatch('getCurrencyData');
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

    },
    async changeMainCurrency({getters, dispatch}, id) {
      if(isNaN(id)) {
        return
      }
      const currencyList = await getters.getAllCurrencies;

      const newMainCurremcy = currencyList.filter(item => {
        return item.id === id;
      });
      if (newMainCurremcy.length === 0) {
        return;
      }
      const ra = newMainCurremcy[0].rate;
      const newCurrencyList = currencyList.map(item => {
        let main = false;
        if(item.id === id) main = true;
        const newRate = (+(item.rate) / +(ra)).toFixed(5);
        return {
          id: item.id,
          rate: newRate,
          main: main,
          short: item.short,
          title: item.title
        }
      })
      await newCurrencyList.forEach(item => {
        const data = {
          id: item.id,
          currency: item
        }
        dispatch('putCurrencyById', data);
      });
    }

  },
}