
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
    }
  },
  actions: {
    async getCategoriesData(ctx) {
      const res = await fetch('http://localhost:3000/categories');
      if (!res.ok) {

      }
      const data =  await res.json();
      ctx.commit('updateCategories', data);
    }
    ,
    async addCategory(ctx, category) {
      const res = await fetch('http://localhost:3000/categories', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: category
      });
      await ctx.dispatch('getCategoriesData');
    },
    async removeCategoryById(ctx, id) {
      const res = await fetch(`http://localhost:3000/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
      });
      await ctx.dispatch('getCategoriesData');
    },
    async putCategoryById(ctx, data) {
      if(!data.category) return
      const jsonData = JSON.stringify(data.category)
      const res = await fetch(`http://localhost:3000/categories/${data.id}`, {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json'
        },
        body: jsonData
      });
      await ctx.dispatch('getCategoriesData');
    }
  },
}
