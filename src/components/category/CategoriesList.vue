<template>

   <div class="list-header">
    <table>
      <thead>
        <tr>
         <th>№</th>
         <th>Название</th>
         <th>Тип</th>
         <th>Действие</th>
       </tr>
      </thead>
      <tbody>
        <tr v-for="item of getAllCategories" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.type}}</td>
          <td>
            <div class="td-btn">
              <div class="edit__btn" @click.prevent="editCategory(item.id)">Edit</div>
              <div class="remove__btn" @click="confirm(item.id)">Remove</div>
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
export default {
  components: { Modal, EditCategoryForm, ConfirmModal},
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
    }
  },
  async mounted() {
    this.getCategoriesData();
  }

}
</script>

<style lang="scss" scoped>
</style>