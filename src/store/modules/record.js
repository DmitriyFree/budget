export default {
  state: {
    records: []
  },
  getters: {
    getAllRecords(state) {
      return state.records;
    },
    getStatisticOneBill(state) {
      return (billName) => {
        if (!billName) return
        const statData = {
          total: 0,
          income: 0,
          outcome: 0
        }
        state.records.forEach(record => {
          if (record.bill == billName) {
            if(record.type == 'Доход') statData.income+= +record.sum;
            else statData.outcome+= +record.sum;
          }
        });
        statData.total = statData.income - statData.outcome;
        return statData;
      }
    },
    getIncomeRecords(state) {
      return (billName) => {
        const records = state.records;
        const incomeRecords = records.filter(record => record.type == 'Доход' && record.bill == billName);
        let arr = new Map();
        incomeRecords.forEach(record => {
          const nameCategory = record.category;
          if (arr.has(nameCategory)) {
            let obj = arr.get(nameCategory);
            obj.total += +record.sum;
            obj.records.push(record);
            arr.set(record.category, obj);
          } else {
            arr.set(nameCategory, {
              name: nameCategory,
              total: +record.sum,
              records: [record]
            });
          }
        });
        return arr;
      }
    },
    getOutcomeRecords(state) {
      return (billName) => {
        const records = state.records;
        const incomeRecords = records.filter(record => record.type == 'Расход' && record.bill == billName);
        // const arr = state.bills.filter(item => item.id === id);
        // return arr[0];
        let arr = new Map();
        incomeRecords.forEach(record => {
          const nameCategory = record.category;
          if (arr.has(nameCategory)) {
            let obj = arr.get(nameCategory);
            obj.total += +record.sum;
            obj.records.push(record);
            arr.set(record.category, obj);
          } else {
            arr.set(nameCategory, {
              name: nameCategory,
              total: +record.sum,
              records: [record]
            });
          }
        });
        return arr;
      }
    }
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