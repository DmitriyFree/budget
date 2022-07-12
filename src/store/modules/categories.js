export default {
  state: {
    categories: [],
    selectedCategory: {
      "name": "",
      "type": "",
      "id": 1
    },
  },
  getters: {
    getAllCategories(state) {
      return state.categories
    },
    getCategoryById(state) {
      return (id) => {
        const arr = state.categories.filter(item => item.id === id)
        return arr[0]
      }
    },
    getSelectedCategory(state) {
      return state.selectedCategory
    },
  },
  mutations: {
    updateCategories(state, categories) {
      state.categories = categories
    },
    addNewCategory(state, category) {
      state.categories.push(category)
    },
    setSelectedCategory(state, category) {
      state.selectedCategory = category
    },
  },

  actions: {
    async getCategoriesData({
      commit
    }) {
      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/categories`)
        if (res.ok) {
          const data = await res.json()
          commit('updateCategories', data)
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`)
        }

      } catch (e) {
        console.log(e)
      }

    },
    async addCategory({dispatch}, data) {
      try {
        if (!data) return
        const json = JSON.stringify(data)
        const res = await fetch(`${process.env.VUE_APP_API_URL}/categories`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: json,

        });

        if (res.ok) {
          await dispatch('getCategoriesData')
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`)
        }

      } catch (e) {
        console.log(e)
      }

    },
    async removeCategoryById({getters, commit, dispatch}, id) {
      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/categories/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-type': 'application/json'
          },
        });
        if (res.ok) {
          await dispatch('getCategoriesData')
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`)
        }
      } catch (e) {
        console.log(e)
      }

    },
    async putCategoryById({getters, dispatch}, data) {
      try {
        if (!data.category || !data.id) return
        const selected = getters.getCategoryById(data.id)

        const exportData = {
          oldName: selected.name,
          newName: data.category.name
        }

        const jsonData = JSON.stringify(data.category)
        const res = await fetch(`${process.env.VUE_APP_API_URL}/categories/${data.id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: jsonData
        });
        if (res.ok) {
          await dispatch('changeCategoryName', exportData)
          await dispatch('getCategoriesData')
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`)
        }
      } catch (e) {
        console.log(e);
      }

    }
  },
}