export default {
  state: {
    bills: []
  },
  getters: {
    getAllBills(state) {
      return state.bills;
    },
    getBillById(state) {
      return (id) => {
        const arr = state.bills.filter(item => item.id === id);
        return arr[0];
      }
    }
  },
  mutations: {
    updateBills(state, bills) {
      state.bills = bills;
    }
  },
  actions: {
    async getBills(ctx) {
      const res = await fetch('https://mybudgetproject.herokuapp.com/bills');
      if (!res.ok) {

      }
      const bills =  await res.json();
      ctx.commit('updateBills', bills);
    },
    async getBillById(ctx, id) {
      const res = await fetch(`https://mybudgetproject.herokuapp.com/bills/${id}`);
      if (!res.ok) {

      }
      return await res.json();
    },
    async addBill(ctx, bill) {
      const data = JSON.stringify(bill);
      const res = await fetch('https://mybudgetproject.herokuapp.com/bills', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: data
      });
      await ctx.dispatch('getBills');
    },
    async putBillById(ctx, data) {
      console.log(data);
      const res = await fetch(`https://mybudgetproject.herokuapp.com/bills/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: data.bill
      });
      await ctx.dispatch('getBills');
    },
    async removeBillById(ctx, id) {
      const res = await fetch(`https://mybudgetproject.herokuapp.com/bills/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
      });
      await ctx.dispatch('getBills');
    },
    async putBillById(ctx, data) {
      if(!data.bill) return
      const jsonData = JSON.stringify(data.bill)
      const res = await fetch(`https://mybudgetproject.herokuapp.com/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: jsonData
      });
      await ctx.dispatch('getBills');
    }
  },
}