<template>
  <div class="handler">
    <loader/>
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
    <modal v-show="isPopupForm">
      <edit-category-form />
    </modal>
    <confirm-modal @result="removeCategory"/>
  </div>
</template>
<script>
import CategoriesList from '../category/CategoriesList.vue'
import Loader from '../Loader.vue'
import CreateCategoryForm from './CreateCategoryForm.vue'
import {mapGetters, mapMutations, mapActions} from "vuex"
import CreateModal from '../modal/CreateModal.vue'
import EditButton from '../ui/EditButton.vue'
import CreateButton from '../ui/CreateButton.vue'
import EditCategoryForm from './EditCategoryForm.vue';
import Modal from '../modal/Modal.vue';
import ConfirmModal from '../modal/ConfirmModal.vue';
export default {
  components: { CreateCategoryForm, CategoriesList, Loader, CreateModal, EditButton, CreateButton, EditCategoryForm, Modal, ConfirmModal},
  name: 'CategoryHandler',
    computed: {
      ...mapGetters(['isCreateForm', 'isPopupForm', 'getConfirmResult', 'getSelectedCategory']),
    },
    data() {
      return {
        btnActive: false
      }
    },
    methods: {
      ...mapMutations(['changeCreateForm', 'setConfirmResult']),
      ...mapActions(['removeCategoryById']),
      createForm(){
        this.changeCreateForm(true);
      },
      removeCategory(result) {
        if (result) {
          const id = this.getSelectedCategory.id;
          this.removeCategoryById(id);
        }
      }
    },
}
</script>

<style lang="scss" scoped>
</style>