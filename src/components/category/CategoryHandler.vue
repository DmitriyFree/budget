<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Категории</div>
      <create-button class="btn" @clickButton="createForm"></create-button>
    </div>
    <div class="handler__content">
      <div class="handler__content-form" v-bind:class="{done: !btnActive}">
        <create-modal v-show="isCreateForm">
          <create-category-form/>
        </create-modal>
      </div>
      <categories-list/>
    </div>
    <!-- <modal v-show="isPopupForm">
      <edit-category-form />
    </modal> -->
  </div>
</template>
<script>
import {mapGetters, mapMutations} from 'vuex'
import CategoriesList from '../category/CategoriesList.vue'
import CreateCategoryForm from './CreateCategoryForm.vue'
import CreateModal from '../modal/CreateModal.vue'
import EditCategoryForm from './EditCategoryForm.vue'
export default {
  components: { CreateCategoryForm, CategoriesList, CreateModal, EditCategoryForm},
  name: 'CategoryHandler',
    computed: {
      ...mapGetters(['isCreateForm', 'isPopupForm', 'getSelectedCategory']),
    },
    data() {
      return {
        btnActive: false
      }
    },
    methods: {
      ...mapMutations(['changeCreateForm']),
      createForm(){
        this.changeCreateForm(true)
      },
    },
}
</script>

<style lang="scss" scoped>
</style>