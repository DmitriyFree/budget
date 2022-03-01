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
    async getCurrencyData({commit}) {
      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/currency`);
        if (res.ok) {
          const data = await res.json();
          commit('updateCurrency', data);
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`);
        }
      } catch (e) {
        console.log(e);
      }

    },
    async addCurrency({dispatch}, data) {
      try {
        if (!data) return
        const json = JSON.stringify(data);
        const res = await fetch(`${process.env.VUE_APP_API_URL}/currency`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: json
        });
        if (res.ok) {
          await dispatch('getCurrencyData');
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`);
        }
      } catch (e) {
        console.log(e);
      }

    },
    async removeCurrencyById({getters, dispatch}, id) {
      try {
        const currencies = getters.getAllCurrencies;
        const selected = currencies.filter((item) => {
          return item.id === id;
        });

        const res = await fetch(`${process.env.VUE_APP_API_URL}/currency/${id}`, {

          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          },
        });
        if (res.ok) {
          await dispatch('removeBillsByCurrency', selected[0].short);
          await dispatch('getCurrencyData');
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`);
        }
      } catch (e) {
        console.log(e);
      }

    },
    async putCurrencyById({getters, dispatch}, data) {
      try {
        if (!data.currency) return
        const currencyList = getters.getAllCurrencies;
        const selected = currencyList.filter(item => {
          return item.id == data.id
        });
        if (selected.length == 0) {
          return
        }
        const exportData = {
          oldName: selected[0].short,
          newName: data.currency.short
        }
        const jsonData = JSON.stringify(data.currency)
        const res = await fetch(`${process.env.VUE_APP_API_URL}/currency/${data.id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: jsonData
        });
        if (res.ok) {
          if (exportData.newName != exportData.oldName) {
            await dispatch('changeCurrencyCode', exportData)
          }
          await dispatch('getCurrencyData');
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`);
        }
      } catch (e) {
        console.log(e);
      }

    },
    async resetMainCurrency({dispatch}) {
      try {
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
        if (res.ok) {
          await dispatch('getCurrencyData');
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`);
        }
      } catch (e) {
        console.log(e);
      }


    },
    async changeMainCurrency({getters, dispatch}, id) {
      try {
        if (isNaN(id)) {
          return
        }
        const currencyList = await getters.getAllCurrencies;

        const selected = currencyList.filter(item => {
          return item.id === id;
        });
        if (selected.length === 0) {
          return;
        }
        const oldRate = selected[0].rate;
        const newCurrencyList = currencyList.map(item => {
          let main = false;
          if (item.id === id) main = true;
          const firstParam = +(item.rate) * 100000;
          const secondPatam = +(oldRate) * 100000;
          const newRate = (firstParam / secondPatam).toFixed(5);
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
      } catch (e) {
        console.log(e);
      }

    }

  },
}