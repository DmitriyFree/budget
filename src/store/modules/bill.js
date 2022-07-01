export default {
  state: {
    bills: [],
    selectedBill: {
      name: "",
      currency: "",
      records: [],
      id: 1
    },
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
    },
    getSelectedBill(state) {
      return state.selectedBill;
    },
  },

  mutations: {
    updateBills(state, bills) {
      state.bills = bills;
    },
    setSelectedBill(state, bill) {
      state.selectedBill = bill;
    },
  },

  actions: {
    async getBillsData({
      getters,
      commit
    }) {

      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/bills`);
        if (res.ok) {
          const bills = await res.json();
          commit('updateBills', bills);
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}` );
        }
      } catch (e) {
        console.log(e);
      }
    },
    async addBill({dispatch}, bill) {
      try {
        const data = JSON.stringify(bill);
        const res = await fetch(`${process.env.VUE_APP_API_URL}/bills`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: data
        });
        if (res.ok) {
          await dispatch('getBillsData');
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}` );
          console.log(`data in JSON: ${jsonData}`);
        }

      } catch (e) {
        console.log(e);
      }


    },
    async removeBillById({dispatch, getters}, id) {
      try {
        const selected = getters.getBillById(id)

        const res = await fetch(`${process.env.VUE_APP_API_URL}/bills/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          },
        });
        if (res.ok) {
          await dispatch('removeRecordsByBill', selected.name);
          await dispatch('getBillsData');
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}` );
          console.log(`data in JSON: ${jsonData}`);
        }

      } catch (e) {
        console.log(e);
      }
    },
    removeBillsByCurrency: {
      async handler({getters, dispatch}, currencyName) {

        try {
          const bills = await getters.getAllBills;
          const newArr = bills.filter((item) => {
            return item.currency === currencyName;
          });
          newArr.forEach(async (elem) => {
            await dispatch('removeBillById', elem.id)
          });
        } catch (e) {
          console.log(e);
        }


      },
      root: true
    },
    changeCurrencyCode: {
      async handler({getters, dispatch}, data) {

        try {
          if(!data.oldName || !data.newName) {
            return
          }
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
            const exportData = {
              id: elem.id,
              bill: bill
            }
            await dispatch('putBillById', exportData);
          });

        } catch (e) {
          console.log(e);
        }

      },
      root: true
    },
    async putBillById({getters, dispatch}, data) {
      try {
        if (!data.bill) return

        const billList = getters.getAllBills;
        const selected = billList.filter(item => {
          return item.id == data.id
        });
        if (selected.length == 0) {
          return
        }
        const exportData = {
          oldName: selected[0].name,
          newName: data.bill.name
        }

        const jsonData = JSON.stringify(data.bill)
        const res = await fetch(`${process.env.VUE_APP_API_URL}/bills/${data.id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: jsonData
        });
        if (res.ok) {
          await dispatch('changeBillName', exportData);
          await dispatch('getBillsData');
          await dispatch('refreshBillOnePage');
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}` );
          console.log(`data in JSON: ${jsonData}`);
        }

      } catch (e) {
        console.log(e);
      }

    }
  },
}