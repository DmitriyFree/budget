<template>

   <div class="list-header">
    <table class="cate" v-if="!isEmptyList">
      <thead>
        <tr>
         <th>№</th>
         <th>Название</th>
         <th>Тип</th>
         <th class="dd">Действие</th>
       </tr>
      </thead>
      <tbody>
        <category-item v-for="item of getAllCategories" :key="item.id" v-bind:category="item"></category-item>
      </tbody>
    </table>
    <div v-else class="empty-list">Список категорий пуст</div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import CategoryItem from './CategoryItem.vue';
export default {
  components: {CategoryItem},
  name: 'CategoriesList',
  computed: {
    ...mapGetters(['getAllCategories']),
    isEmptyList() {
      if (this.getAllCategories.length === 0) return true;
      else return false;
    }
  },
  methods: {
    ...mapActions(['getCategoriesData']),
  },
  async mounted() {
    this.getCategoriesData();
  }

}
</script>

<style lang="scss" scoped>
</style>