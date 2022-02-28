<template>
  <div class="handler">
    <loader/>
    <div class="handler__header">
      <div class="title">Категории</div>
      <div class="btn" @click="createForm">
      </div>
    </div>
    <div class="handler__content">
      <div class="handler__content-form" v-bind:class="{done: !btnActive}">
        <create-modal v-show="isCreateForm">
          <create-category-form/>
        </create-modal>
      </div>
      <categories-list/>
    </div>
  </div>
</template>
<script>
import CategoriesList from '../category/CategoriesList.vue'
import Loader from '../Loader.vue'
import CreateCategoryForm from './CreateCategoryForm.vue'
import {mapGetters, mapMutations} from "vuex"
import CreateModal from '../modal/CreateModal.vue'
export default {
  components: { CreateCategoryForm, CategoriesList, Loader, CreateModal},
  name: 'CategoryHandler',
    computed: {
      ...mapGetters(['isCreateForm']),
    },
    data() {
      return {
        btnActive: false
      }
    },
    methods: {
      ...mapMutations(['changeCreateForm']),
      createForm(){
      this.changeCreateForm(true);
    }
    }
}
</script>

<style lang="scss" scoped>
</style>