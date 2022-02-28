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
    async getBillsData({commit}) {

      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/bills`);
          if (!res.ok) {
        }
        const bills =  await res.json();
        commit('updateBills', bills);
      } catch (e) {
        console.log(e);
      }
    },
    async getBillById(ctx, id) {
      const res = await fetch(`${process.env.VUE_APP_API_URL}/bills/${id}`);
      if (!res.ok) {

      }
      return await res.json();
    },
    async addBill({dispatch}, bill) {
      const data = JSON.stringify(bill);
      const res = await fetch(`${process.env.VUE_APP_API_URL}/bills`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: data
      });
      await dispatch('getBillsData');

    },
    async removeBillById({dispatch, getters}, id) {
      const bills = getters.getAllBills;
      const selected = bills.filter((item) => {
        return item.id === id;
      });
      await dispatch('removeRecordsByBill', selected[0].name);
      const res = await fetch(`${process.env.VUE_APP_API_URL}/bills/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
      });
      await dispatch('getBillsData');
    },
    removeBillsByCurrency: {
      async handler({getters, dispatch}, currencyName) {
        const bills = await getters.getAllBills;
        const newArr = bills.filter((item) => {
          return item.currency === currencyName;
        });
        newArr.forEach(async (elem) => {
          await dispatch('removeBillById', elem.id)
        });
      },
      root: true
    },
    changeCurrencyCode: {
      async handler({getters, dispatch}, data) {
        const billList = await getters.getAllBills;
        const newArr = billList.filter((item) => {
          return item.currency == data.oldName;
        });
        newArr.forEach(async (elem) => {

          const bill = {
            name: elem.name,
            currency: data.newName,
            startBalance: elem.startBalance
          }
          const exportData ={
            id: elem.id,
            bill: bill
          }
          await dispatch('putBillById', exportData);
        });
      },
      root: true
    },
    async putBillById({getters, dispatch}, data) {
      if(!data.bill) return

      const billList = getters.getAllBills;
      const selected = billList.filter(item => {
        return item.id == data.id
      });
      if(selected.length == 0) {
        return
      }
      const exportData = {
        oldName: selected[0].name,
        newName: data.bill.name
      }
      await dispatch('changeBillName', exportData);


      const jsonData = JSON.stringify(data.bill)
      const res = await fetch(`${process.env.VUE_APP_API_URL}/bills/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: jsonData
      });
      await dispatch('getBillsData');
    }
  },
}