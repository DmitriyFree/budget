<template>

  <div class="list-header">
    <div v-if="!isEmptyList">
      <table class="cate">
        <thead>
          <tr>
          <th>№</th>
          <th>Название</th>
          <th>Тип</th>
          <th class="dd">Действие</th>
          </tr>
        </thead>
        <tbody>
          <category-item v-for="item of getCategoriesOnePage" :key="item.id" v-bind:category="item"></category-item>
        </tbody>
     </table>
     <pagination :pagesAmount="getMaxPagesCategory" :page="getCurrentPageCategory" @currentPage="updateList"/>
    </div>

    <div v-else class="empty-list">Список категорий пуст</div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import Pagination from '../ui/Pagination.vue';
import CategoryItem from './CategoryItem.vue';
export default {
  components: {CategoryItem, Pagination},
  name: 'CategoriesList',
  computed: {
    ...mapGetters(['getAllCategories', 'getCategoriesOnePage', 'getMaxPagesCategory', 'getCurrentPageCategory']),
    isEmptyList() {
      if (this.getCategoriesOnePage.length === 0) return true;
      else return false;
    }
  },
  methods: {
    ...mapActions(['getCategoriesData', 'refreshCategoriesOnePage']),
    ...mapMutations(['setCurrentPageCategory']),
    async updateList(currentPage) {
      this.setCurrentPageCategory(currentPage);
      await this.refreshCategoriesOnePage();
    }
  },
  async mounted() {
    await this.refreshCategoriesOnePage();
    await this.getCategoriesData();
  }
}
</script>

<style lang="scss" scoped>
</style>