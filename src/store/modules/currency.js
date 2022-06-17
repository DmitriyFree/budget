export default {
  state: {
    currency: [],
    currencyOnePage: [],
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
      {name: 'Турецкая лира', symbol: 'TRY', price: 1},],
    currentPageCurrency: 1,
    maxPageCurrency: 1
  },
  getters: {
    getAllCurrencies(state) {
      return state.currency;
    },
    getCurrencyOnePage(state) {
      return state.currencyOnePage;
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
    getCurrencyBySymbol(state) {
      return (symbol) => {
        const arr = state.currency.filter(item => item.symbol === symbol);
        return arr[0];
      }
    },
    getAvailableCurrenceis(state) {
      return state.availableCurrencyList;
    },
    getCurrentPageCurrency(state) {
      return state.currentPageCurrency;
    },
    getMaxPageCurrency(state) {
      return state.maxPageCurrency;
    }
  },
  mutations: {
    updateCurrency(state, currencies) {
      state.currency = currencies;
    },
    setCurrencyOnePage(state, currencies) {
      state.currencyOnePage = currencies;
    },
    setSelectedCurrency(state, currency) {
      state.selectedCurrency = currency;
    },
    setlastRefresh(state, value) {
      state.lastRefresh = value;
    },
    refreshAvailable(state, list) {
      state.vailableCurrencyList = list;
    },
    setCurrentPageCurrency(state, page) {
      state.currentPageCurrency = page;
    },
    setMaxPageCurrency(state, val) {
      state.maxPageCurrency = val;
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
    async refreshCurrencyOnePage({getters, commit}) {
      try {
        const page = getters.getCurrentPageCurrency;
        const pageItems = getters.getMaxPageItems;
        const res = await fetch(`${process.env.VUE_APP_API_URL}/currency?_page=${page}&_limit=${pageItems}`);
        if (res.ok) {
          const data = await res.json();
          const limit = res.headers.get('X-Total-Count')
          const maxPage = Math.ceil(limit / pageItems);
          commit('setMaxPageCurrency', maxPage);
          commit('setCurrencyOnePage', data);
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
          await dispatch('refreshCurrencyOnePage');
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`);
        }
      } catch (e) {
        console.log(e);
      }

    },
    async removeCurrencyById({getters, commit, dispatch}, id) {
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
          if ((currencies.length % getters.getMaxPageItems) == 1 &&
          getters.getCurrentPageCurrency == getters.getMaxPageCurrency) {
            commit('setCurrentPageCurrency', getters.getCurrentPageCurrency - 1);
          }
          await dispatch('refreshCurrencyOnePage');
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
          await dispatch('refreshCurrencyOnePage');
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`);
        }
      } catch (e) {
        console.log(e);
      }

    },

  },
}