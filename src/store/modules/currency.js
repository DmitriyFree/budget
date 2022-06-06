export default {
  state: {
    currency: [],
    selectedCurrency: {
      "title": "",
      "symbol": "",
      "price": 1,
      "id": 1
    },
    lastRefresh: 0,
    availableCurrencyList: [

      {name: 'Американский долар', symbol: 'USD', price: 1},
      {name: 'Канадский долар', symbol: 'CAD', price: 1},
      {name: 'Австралийский доллар', symbol: 'AUD', price: 1},
      {name: 'Евро', symbol: 'EUR', price: 1},
      {name: 'Британский фунт', symbol: 'GBP', price: 1},
      {name: 'Швейцарский франк', symbol: 'CHF', price: 1},
      {name: 'Польский злотый', symbol: 'PLN', price: 1},
      {name: 'Чешская крона', symbol: 'CZK', price: 1},
      {name: 'Украинская гривна', symbol: 'UAH', price: 1},
      {name: 'Российский рубль', symbol: 'RUB', price: 1},
      {name: 'Казахстанський теньге', symbol: 'KZT', price: 1},
      {name: 'Белорусский рубль', symbol: 'BYN', price: 1},
      {name: 'Японская иена', symbol: 'JPY', price: 1},
      {name: 'Китайский юань', symbol: 'CNY', price: 1},
      {name: 'Индийская рупия', symbol: 'INR', price: 1},
      {name: 'Турецкая лира', symbol: 'TRY', price: 1},]
  },
  getters: {
    getAllCurrencies(state) {
      return state.currency;
    },
    getSelectedCurrency(state) {
      return state.selectedCurrency;
    },
    getLastRefresh(state) {
      return state.lastRefresh;
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
    getAvailableCurrenceis(state) {
      return state.availableCurrencyList;
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
    },
    setSelectedCurrency(state, currency) {
      state.selectedCurrency = currency;
    },
    setlastRefresh(state, value) {
      state.lastRefresh = value;
    },
    refreshAvailable(state, list) {
      state.vailableCurrencyList = list;
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
    async refreshPrice({getters, commit}){
      try {
        const lastRefresh = (Date.now() - getters.getLastRefresh);
        const currencyList = getters.getAvailableCurrenceis;
        if (lastRefresh > 3600000) {
          const res = await fetch(process.env.VUE_APP_API_PRICE);
          if (res.ok) {
            commit('setlastRefresh', Date.now());
            const { data } = await res.json();
            currencyList.forEach(item => {
              data.forEach(i => {
                if (i.symbol === item.symbol) {
                  const price = (1 / i.rateUsd).toFixed(4);
                  item.price = price;
                }
            });

            });
          } else {
            console.error(`server error url: ${res.url} status: ${res.status}`);
          }

        }
        commit('refreshAvailable', currencyList);
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
          await dispatch('removeBillsByCurrency', selected[0].symbol);
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
        console.log(data);
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
        console.log(jsonData);
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