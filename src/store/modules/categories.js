
export default {
  state: {
    categories: []
  },
  getters: {
    getAllCategories(state) {
      return state.categories;
    }
  },
  mutations: {
    upDate(state, categories) {
      state.categories = categories;
    }
  },
  actions: {
    async getData(ctx) {
      const res = await fetch('http://localhost:3000/categories');
      if (!res.ok) {

      }
      const data =  await res.json();
      ctx.commit('upDate', data);
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
      await ctx.dispatch('getData');
    },
    async removeCategoryById(ctx, id) {
      const res = await fetch(`http://localhost:3000/categories/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-type': 'application/json'
        },
      });
      await ctx.dispatch('getData');
    }
  },
}
