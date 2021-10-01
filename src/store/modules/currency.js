export default {
  state: {
    currency: []
  },
  getters: {
    getAllCurrencies(state) {
      return state.currency;
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
      const res = await fetch('http://localhost:3000/currency', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: data
      });
      await ctx.dispatch('getCurrencyData');
    },
    async removeCurrencyById(ctx, id) {
      const res = await fetch(`http://localhost:3000/currency/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
      });
      await ctx.dispatch('getCurrencyData');
    }
  },
}