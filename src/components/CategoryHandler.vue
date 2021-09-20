<template>
  <div class="category">
    <div class="category__title">Категории</div>
    <div class="category__content">
      <create-category-form/>
      <categories-list/>
    </div>
  </div>
</template>
<script>
import CategoriesList from './CategoriesList.vue'
import CreateCategoryForm from './CreateCategoryForm.vue'
export default {
  components: { CreateCategoryForm, CategoriesList },
  name: 'CategoryHandler',
}
</script>

<style lang="scss" scoped>
  .category {
    padding: 10px 20px;
    &__title {
      padding: 10px 0;
      font-size: 20px;
      font-weight: 700;
      border-bottom: 1px solid #aaa;
    }
  }
</style>