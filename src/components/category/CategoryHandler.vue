<template>
  <div class="handler">
    <loader/>
    <div class="handler__header">
      <div class="title">Категории</div>
      <div class="btn" @click="btnActive = !btnActive" v-bind:class="{active: btnActive}">
      </div>
    </div>
    <div class="handler__content">
      <div class="handler__content-form" v-bind:class="{done: !btnActive}">
        <create-category-form/>
      </div>
      <categories-list/>
    </div>
  </div>
</template>
<script>
import CategoriesList from '../category/CategoriesList.vue'
import Loader from '../Loader.vue'
import CreateCategoryForm from './CreateCategoryForm.vue'
export default {
  components: { CreateCategoryForm, CategoriesList, Loader},
  name: 'CategoryHandler',
    data() {
    return {
      btnActive: false
    }
  }
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