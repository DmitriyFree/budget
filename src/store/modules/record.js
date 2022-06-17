export default {
  state: {
    records: [],
    recordsOnePage: [],
    selectedRecord: {
      bill: "",
      type: "Доход",
      category: "",
      date: "2020-01-01",
      sum: 0,
      description: "",
      id: 1
    },
    currentPageRecord: 1,
    maxPageRecord: 1
  },

  getters: {
    getAllRecords(state) {
      return state.records;
    },
    getRecordsOnePage(state) {
      return state.recordsOnePage
    },
    getSelectedRecord(state) {
      return state.selectedRecord;
    },
    getCurrentPageRecord(state) {
      return state.currentPageRecord;
    },
    getMaxPageRecord(state) {
      return state.maxPageRecord;
    }
  },
  mutations: {
    updateRecords(state, records) {
      state.records = records;
    },
    setRecordsOnePage(state, records) {
      state.recordsOnePage = records;
    },
    setSelectedRecord(state, record) {
      state.selectedRecord = record;
    },
    setCurrentPageRecord(state, page) {
      state.currentPageRecord = page;
    },
    setMaxPageRecord(state, value) {
      state.maxPageRecord;
    }

  },

  actions: {
    async getRecordsData({getters, commit}) {
      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/records`);
        if (res.ok) {
          const data = await res.json();
          commit('updateRecords', data);
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`);
        }

      } catch (e) {
        console.log(e);
      }
    },
    async refreshRecordsOnePage({getters, commit}) {
      try {
        const page = getters.getCurrentPageRecord;
        const pageItems = getters.getMaxPageItems;
        const res = await fetch(`${process.env.VUE_APP_API_URL}/records?_page=${page}&_limit=${pageItems}`);
        if (res.ok) {
          const data = await res.json();
          const limit = res.headers.get('X-Total-Count')
          const maxPage = Math.ceil(limit / pageItems);
          commit('setMaxPageRecord', maxPage);
          commit('setRecordsOnePage', data);
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`);
        }

      } catch (e) {
        console.log(e);
      }
    },
    removeRecordsByBill: {
      async handler({getters, dispatch}, data) {
        try {
          const records = await getters.getAllRecords;
          const newArr = records.filter((item) => {
            return item.bill === data;
          });
          newArr.forEach(async (elem) => {
            await dispatch('removeRecordById', elem.id)
          });
        } catch (e) {
          console.log(e);
        }

      },
      root: true
    },
    changeCategoryName: {
      async handler({getters, dispatch}, data) {
        try {
          if(!data.oldName || !data.newName) {
            return
          }
          const records = await getters.getAllRecords;
          const newArr = records.filter((item) => {
            return item.category == data.oldName;
          });
          newArr.forEach(async (elem) => {

            const record = {
              bill: elem.bill,
              category: data.newName,
              type: elem.type,
              date: elem.date,
              sum: elem.sum,
              description: elem.description
            }
            const exportData = {
              id: elem.id,
              record: record
            }
            await dispatch('putRecordById', exportData);
          });
        } catch (e) {
          console.log(e);
        }

      },
      root: true
    },
    changeBillName: {
      async handler({getters, dispatch}, data) {
        try {
          if(!data.oldName || !data.newName) {
            return
          }
          const records = await getters.getAllRecords;
          const newArr = records.filter((item) => {
            return item.bill == data.oldName;
          });
          newArr.forEach(async (elem) => {

            const record = {
              bill: data.newName,
              category: elem.category,
              type: elem.type,
              date: elem.date,
              sum: elem.sum,
              description: elem.description
            }
            const exportData = {
              id: elem.id,
              record: record
            }
            await dispatch('putRecordById', exportData);
          });
        } catch (e) {
          console.log(e);
        }

      },
      root: true
    },
    async addRecord({dispatch}, data) {
      try {
        if (!data) return
        const json = JSON.stringify(data);
        const res = await fetch(`${process.env.VUE_APP_API_URL}/records`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: json
        });
        if (res.ok) {
          await dispatch('getRecordsData');
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`);
        }
      } catch (e) {
        console.log(e);
      }

    },
    async removeRecordById({dispatch}, id) {
      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/records/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          },
        });
        if (res.ok) {
          await dispatch('getRecordsData');
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`);
        }
      } catch (e) {
        console.log(e);
      }

    },
    async putRecordById({dispatch}, data) {
      try {
        if (!data.record) return
        const jsonData = JSON.stringify(data.record)
        const res = await fetch(`${process.env.VUE_APP_API_URL}/records/${data.id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: jsonData
        });
        if (res.ok) {
          await dispatch('getRecordsData');
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`);
        }
      } catch (e) {
        console.log(e);
      }

    }
  }
}