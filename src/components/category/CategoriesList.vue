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
          <category-item v-for="item of pageItems" :key="item.id" v-bind:category="item"></category-item>
        </tbody>
     </table>
     <pagination :pagesAmount="pageCount" :page="page" @currentPage="updateList"/>
    </div>

    <div v-else class="empty-list">Список категорий пуст</div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import paginationMixin from '@/mixins/pagination.mixin'
import CategoryItem from './CategoryItem.vue';
export default {
  components: {CategoryItem},
  name: 'CategoriesList',
  mixins: [paginationMixin],
  computed: {
    ...mapGetters(['getAllCategories']),
    isEmptyList() {
      if (this.getAllCategories.length === 0) return true;
      else return false;
    }
  },
  methods: {
    ...mapActions(['getCategoriesData']),
    async updateList(currentPage) {
      this.page = currentPage
      await this.setupPagination(this.getAllCategories)
    }
  },
  watch: {
    getAllCategories() {
      this.setupPagination(this.getAllCategories)
    }
  },
  async mounted() {
    await this.getCategoriesData();
    await this.setupPagination(this.getAllCategories)
  }
}
</script>

<style lang="scss" scoped>
</style>