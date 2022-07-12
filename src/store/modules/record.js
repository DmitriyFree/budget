export default {
  state: {
    records: [],
    selectedRecord: {
      bill: "",
      type: "Доход",
      category: "",
      date: "2020-01-01",
      sum: 0,
      description: "",
      id: 1
    },
  },

  getters: {
    getAllRecords(state) {
      return state.records;
    },
    getRecordById(state) {
      return (id) => {
        const arr = state.records.filter(item => item.id === id)
        return arr[0]
      }
    },
    getSelectedRecord(state) {
      return state.selectedRecord
    },
  },
  mutations: {
    updateRecords(state, records) {
      state.records = records
    },
    updateTransfers(state, transfers) {
      state.currencyTransers = transfers
    },
    setSelectedRecord(state, record) {
      state.selectedRecord = record
    },
  },

  actions: {
    async getRecordsData({getters, commit}) {
      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/records`)
        if (res.ok) {
          const data = await res.json()
          commit('updateRecords', data)
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`)
        }

      } catch (e) {
        console.log(e)
      }
    },
    removeRecordsByBill: {
      async handler({getters, dispatch}, data) {
        try {
          const records = await getters.getAllRecords
          const newArr = records.filter((item) => {
            return item.bill === data
          });
          newArr.forEach(async (elem) => {
            await dispatch('removeRecordById', elem.id)
          });
        } catch (e) {
          console.log(e)
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
          const records = await getters.getAllRecords
          const newArr = records.filter((item) => {
            return item.category == data.oldName
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
          const records = await getters.getAllRecords
          const newArr = records.filter((item) => {
            return item.bill == data.oldName
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
            await dispatch('putRecordById', exportData)
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
        const json = JSON.stringify(data)
        const res = await fetch(`${process.env.VUE_APP_API_URL}/records`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: json
        });
        if (res.ok) {
          await dispatch('getRecordsData')
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`)
        }
      } catch (e) {
        console.log(e)
      }

    },
    async addTransfer({dispatch}, data) {
      try {

        const firstCandidate = {
          record: {
            bill: data.firstBill,
            sum: data.firstSum,
            category: 'Перевод',
            type: 'Расход',
            date: data.date,
            transfer: {
              rate: data.rate,
              firstRecordId: 1,
              secondRecordId: 1
            }
          }
        }
        const secondCandidate = {
          record: {
            bill: data.secondBill,
            sum: data.secondSum,
            category: 'Перевод',
            type: 'Доход',
            date: data.date,
            transfer: {
              rate: data.rate,
              firstRecordId: 1,
              secondRecordId: 1
            }
          }
        }

        const firstRecord = await createRecord(firstCandidate.record)
        const secondRecord = await createRecord(secondCandidate.record)


        firstCandidate.id = firstRecord.id

        firstCandidate.record.transfer.firstRecordId = firstRecord.id
        firstCandidate.record.transfer.secondRecordId = secondRecord.id

        secondCandidate.id = secondRecord.id

        secondCandidate.record.transfer.firstRecordId = firstRecord.id
        secondCandidate.record.transfer.secondRecordId = secondRecord.id

        await dispatch('putRecordById', await firstCandidate)
        await dispatch('putRecordById', await secondCandidate)

        await dispatch('getRecordsData')


      async function createRecord (record) {
          const json = JSON.stringify(record)
          const res = await fetch(`${process.env.VUE_APP_API_URL}/records`, {
            method: 'POST',
            headers: {
              'Content-type': 'application/json'
            },
            body: json
          });
          if (res.ok) {
            const resp = await res.json()
            return resp
          } else {
            console.error(`server error url: ${res.url} status: ${res.status}`)
            return false
          }
        }

      } catch (e) {
        console.log(e)
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
          await dispatch('getRecordsData')
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`)
        }
      } catch (e) {
        console.log(e)
      }

    },
    async removeTransfer({dispatch}, record) {
      try {
        await dispatch('removeRecordById', record.transfer.firstRecordId)
        await dispatch('removeRecordById', record.transfer.secondRecordId)
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
          await dispatch('getRecordsData')
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`)
        }
      } catch (e) {
        console.log(e)
      }

    },
    async putTransfer({dispatch}, data) {
      try {

        const firstCandidate = {
          record: {
            bill: data.firstBill,
            sum: data.firstSum,
            category: 'Перевод',
            type: 'Расход',
            date: data.date,
            transfer: {
              rate: data.rate,
              firstRecordId: data.firstRecordId,
              secondRecordId: data.secondRecordId
            }
          },
          id: data.firstRecordId
        }
        const secondCandidate = {
          record: {
            bill: data.secondBill,
            sum: data.secondSum,
            category: 'Перевод',
            type: 'Доход',
            date: data.date,
            transfer: {
              rate: data.rate,
              firstRecordId: data.firstRecordId,
              secondRecordId: data.secondRecordId
            }
          },
          id: data.secondRecordId
        }

        await dispatch('putRecordById', firstCandidate)
        await dispatch('putRecordById', secondCandidate)

        await dispatch('getRecordsData')

      } catch (e) {
        console.log(e)
      }

    }
  }
}