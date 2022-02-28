
export default {
  state: {
    categories: []
  },
  getters: {
    getAllCategories(state) {
      return state.categories;
    },
    getCategoryById(state) {
      return (id) => {
        const arr = state.categories.filter(item => item.id === id);
        return arr[0];
      }
    }
  },
  mutations: {
    updateCategories(state, categories) {
      state.categories = categories;
    },
    addNewCategory(state, category) {
      state.categories.push(category);
    }
  },
  actions: {
    async getCategoriesData({commit}) {
      const res = await fetch(`${process.env.VUE_APP_API_URL}/categories`);
      if (!res.ok) {
      }
      const data =  await res.json();
      commit('updateCategories', data);
    }
    ,
    async addCategory({dispatch}, category) {
      const res = await fetch(`${process.env.VUE_APP_API_URL}/categories`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: category
      });

      if (!res.ok) {
        console.log('Error');
        return
      }
      await dispatch('getCategoriesData');
    },
    async removeCategoryById(ctx, id) {
      const res = await fetch(`${process.env.VUE_APP_API_URL}/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
      });
      await ctx.dispatch('getCategoriesData');
    },
    async putCategoryById({getters, dispatch}, data) {
      if(!data.category) return;
      const categoriesList = getters.getAllCategories;
      const selected = categoriesList.filter(item => {
        return item.id == data.id
      });
      if(selected.length == 0) {
        return
      }
      const exportData = {
        oldName: selected[0].name,
        newName: data.category.name
      }
      await dispatch('changeCategoryName', exportData);
      const jsonData = JSON.stringify(data.category)
      const res = await fetch(`${process.env.VUE_APP_API_URL}/categories/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: jsonData
      });
      await dispatch('getCategoriesData');
    }
  },
}
