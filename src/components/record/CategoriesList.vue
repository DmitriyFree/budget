<template>
  <div class="categories">
    <div class="categories__title">Список категорий</div>
    <ul class="categories-list" v-for="(item, index) of getAllCategories" :key="index">
      <category v-bind:item="item"/>
    </ul>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import Category from '../category/Category.vue';
export default {
  components: { Category },
  name: 'CategoriesList',
  computed: mapGetters(['getAllCategories']),
  methods: mapActions(['getData']),
  async mounted() {
    this.getData();
  }

}
</script>

<style lang="scss" scoped>
  .categories {
    &__title {
      font-size: 18px;
      font-weight: 700;
      padding: 20px 0 10px;
    }
    &-list {
      list-style: none;
    }
  }
</style>