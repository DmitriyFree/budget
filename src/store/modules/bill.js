export default {
  state: {
    bills: [],
    billsOnePage: [],
    selectedBill: {
      name: "",
      currency: "",
      records: [],
      id: 1
    },
    currentPageBill: 1,
    maxPageBill: 1
  },
  getters: {
    getAllBills(state) {
      return state.bills;
    },
    getBillsOnePage(state) {
      return state.billsOnePage;
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
    getCurrentPageBill(state) {
      return state.currentPageBill;
    },
    getMaxPageBill(state) {
      return state.maxPageBill;
    }
  },
  mutations: {
    updateBills(state, bills) {
      state.bills = bills;
    },
    setBillsOnePage(state, bills) {
      state.billsOnePage = bills;
    },
    setSelectedBill(state, bill) {
      state.selectedBill = bill;
    },
    setCurrentPageBill(state, page) {
      state.currentPageBill = page;
    },
    setMaxPageBill(state, value) {
      state.maxPageBill = value;
    }
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
    async refreshBillOnePage({
      getters,
      commit
    }) {

      try {
        const page = getters.getCurrentPageBill;
        const pageItems = getters.getMaxPageItems;
        const res = await fetch(`${process.env.VUE_APP_API_URL}/bills?_page=${page}&_limit=${pageItems}`);
        if (res.ok) {
          const bills = await res.json();
          const limit = res.headers.get('X-Total-Count')
          const maxPage = Math.ceil(limit / pageItems);
          commit('setMaxPageBill', maxPage);
          // console.log(bills);
          commit('setBillsOnePage', bills);
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}` );
        }
      } catch (e) {
        console.log(e);
      }
    },
    async getBillById(ctx, id) {
      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/bills/${id}`);
        if (res.ok) {
          return await res.json();
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
          await dispatch('refreshBillOnePage');
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}` );
          console.log(`data in JSON: ${jsonData}`);
        }

      } catch (e) {
        console.log(e);
      }


    },
    async removeBillById({dispatch, commit, getters}, id) {
      try {
        const bills = getters.getAllBills;
        const selected = bills.filter((item) => {
          return item.id === id;
        });

        const res = await fetch(`${process.env.VUE_APP_API_URL}/bills/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          },
        });
        if (res.ok) {
          const length = getters.getAllBills.length;
          await dispatch('removeRecordsByBill', selected[0].name);
          await dispatch('getBillsData');
          if ((length % getters.getMaxPageItems) == 1 &&
          getters.getCurrentPageBill == getters.getMaxPageBill) {
            commit('setCurrentPageBill', getters.getCurrentPageBill - 1);
          }
          await dispatch('refreshBillOnePage');
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