export default {
  state: {
    records: []
  },
  getters: {
    getAllRecords(state) {
      return state.records;
    },
  },
  mutations: {
    updateRecords(state, records) {
      state.records = records;
    }
  },
  actions: {
    async getRecordsData(ctx) {
      const res = await fetch(`${process.env.VUE_APP_API_URL}/records`);
      const data = await res.json();
      ctx.commit('updateRecords', data);
    },
    removeRecordsByBill: {
      async handler({getters, dispatch}, data) {
        const records = await getters.getAllRecords;
        const newArr = records.filter((item) => {
          return item.bill === data;
        });
        newArr.forEach(async (elem) => {
          await dispatch('removeRecordById', elem.id)
        });
      },
      root: true
    },
    changeCategoryName: {
      async handler({getters, dispatch}, data) {
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
          const exportData ={
            id: elem.id,
            record: record
          }
          await dispatch('putRecordById', exportData);
        });
      },
      root: true
    },
    changeBillName: {
      async handler({getters, dispatch}, data) {
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
          const exportData ={
            id: elem.id,
            record: record
          }
          await dispatch('putRecordById', exportData);
        });
      },
      root: true
    },
    async addRecord(ctx, data) {
      if(!data) return
      const json = JSON.stringify(data);
      const res = await fetch(`${process.env.VUE_APP_API_URL}/records`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: json
      });
      await ctx.dispatch('getRecordsData');
    },
    async removeRecordById(ctx, id) {
      const res = await fetch(`${process.env.VUE_APP_API_URL}/records/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
      });
      await ctx.dispatch('getRecordsData');
    },
    async putRecordById(ctx, data) {
      if(!data.record) return
      const jsonData = JSON.stringify(data.record)
      const res = await fetch(`${process.env.VUE_APP_API_URL}/records/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: jsonData
      });
      await ctx.dispatch('getRecordsData');
    }
  }
}