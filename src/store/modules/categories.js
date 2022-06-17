export default {
  state: {
    categories: [],
    categoriesOnePage: [],
    selectedCategory: {
      "name": "",
      "type": "",
      "id": 1
    },
    currentPageCategory: 1,
    maxPageCategory: 1
  },
  getters: {
    getAllCategories(state) {
      return state.categories;
    },
    getCategoriesOnePage(state) {
      return state.categoriesOnePage;
    },
    getCategoryById(state) {
      return (id) => {
        const arr = state.categories.filter(item => item.id === id);
        return arr[0];
      }
    },
    getSelectedCategory(state) {
      return state.selectedCategory;
    },
    getCurrentPageCategory(state) {
      return state.currentPageCategory;
    },
    getMaxPagesCategory(state) {
      return state.maxPageCategory;
    }
  },
  mutations: {
    updateCategories(state, categories) {
      state.categories = categories;
    },
    setCategoriesOnePage(state, categories) {
      state.categoriesOnePage = categories;
    },
    addNewCategory(state, category) {
      state.categories.push(category);
    },
    setSelectedCategory(state, category) {
      state.selectedCategory = category;
    },
    setCurrentPageCategory(state, page) {
      state.currentPageCategory = page;
    },
    setMaxPageCategory(state, value) {
      state.maxPageCategory = value;
    }
  },

  actions: {
    async getCategoriesData({
      commit
    }) {
      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/categories`);
        if (res.ok) {
          const data = await res.json();
          commit('updateCategories', data);
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`);
        }

      } catch (e) {
        console.log(e);
      }

    },
    async refreshCategoriesOnePage({
      getters,
      commit
    }) {
      try {
        const page = getters.getCurrentPageCategory;
        const pageItems = getters.getMaxPageItems;
        const res = await fetch(`${process.env.VUE_APP_API_URL}/categories?_page=${page}&_limit=${pageItems}`);
        if (res.ok) {
          const data = await res.json();
          const limit = res.headers.get('X-Total-Count')
          const maxPage = Math.ceil(limit / pageItems);
          commit('setMaxPageCategory', maxPage);
          commit('setCategoriesOnePage', data);
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`);
        }

      } catch (e) {
        console.log(e);
      }

    },
    async addCategory({dispatch}, category) {
      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/categories`, {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: category,

        });

        if (res.ok) {
          await dispatch('getCategoriesData');
          await dispatch('refreshCategoriesOnePage');
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`);
        }

      } catch (e) {
        console.log(e);
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
          const leng = getters.getAllCategories.length;
          await dispatch('getCategoriesData');
          if ((leng % getters.getMaxPageItems) == 1 &&
            getters.getCurrentPageCategory == getters.getMaxPagesCategory) {
            commit('setCurrentPageCategory', getters.getCurrentPageCategory - 1);
          }
          await dispatch('refreshCategoriesOnePage');
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`);
        }
      } catch (e) {
        console.log(e);
      }

    },
    async putCategoryById({getters, dispatch}, data) {
      try {
        if (!data.category) return;
        const categoriesList = getters.getAllCategories;
        const selected = categoriesList.filter(item => {
          return item.id == data.id
        });
        if (selected.length == 0) {
          return
        }
        const exportData = {
          oldName: selected[0].name,
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
          await dispatch('changeCategoryName', exportData);
          await dispatch('getCategoriesData');
          await dispatch('refreshCategoriesOnePage');
        } else {
          console.error(`server error url: ${res.url} status: ${res.status}`);
        }
      } catch (e) {
        console.log(e);
      }

    }
  },
}