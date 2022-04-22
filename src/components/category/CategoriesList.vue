<template>

   <div class="list-header">
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
        <tr v-for="item of getAllCategories" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.type}}</td>
          <td class="action">
            <div class="td-btn">
              <edit-button class="edit__btn" @clickButton="editCategory(item.id)"></edit-button>
              <delete-button class="remove__btn" @clickButton="confirm(item.id)"></delete-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <modal v-show="isPopupForm">
      <edit-category-form v-bind:category="element"/>
    </modal>
    <confirm-modal v-bind:text="message" @result="deleteCategory"/>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import Modal from '../modal/Modal.vue';
import EditCategoryForm from './EditCategoryForm.vue';
import ConfirmModal from '../modal/ConfirmModal.vue';
import DeleteButton from '../ui/DeleteButton.vue';
import EditButton from '../ui/EditButton.vue';
export default {
  components: { Modal, EditCategoryForm, ConfirmModal, DeleteButton, EditButton},
  name: 'CategoriesList',
  computed: mapGetters(['getAllCategories', 'isPopupForm', 'getCategoryById']),
  data() {
    return {
      element: '',
      message: '',
      id: 0
    }
  },
  methods: {
    ...mapActions(['getCategoriesData', 'removeCategoryById']),
    ...mapMutations(['changePopupForm']),
    confirm(id) {
      this.message = 'Вы уверены? Будут удалены все связанные записи';
      this.id = id;
    },
    deleteCategory(result){
      if (result) {
        this.removeCategoryById(this.id);
      }
      this.message = '';
      this.id = 0;
    },
    editCategory(id) {
      this.changePopupForm(true);
      this.element = this.getCategoryById(id);
    },
  },
  async mounted() {
    this.getCategoriesData();
  }

}
</script>

<style lang="scss" scoped>
</style>