
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
    async getCategoriesData(ctx) {
      const res = await fetch(`${process.env.VUE_APP_API_URL}/categories`);
      if (!res.ok) {

      }
      const data =  await res.json();
      ctx.commit('updateCategories', data);
    }
    ,
    async addCategory(ctx, category) {
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
      // console.dir(category);
      // ctx.commit('addNewCategory', JSON.parse(category));
      await ctx.dispatch('getCategoriesData');
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
    async putCategoryById(ctx, data) {
      if(!data.category) return
      const jsonData = JSON.stringify(data.category)
      const res = await fetch(`${process.env.VUE_APP_API_URL}/categories/${data.id}`, {
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
