<template>

   <div class="list-header">
    <div class="list-header__title">Список категорий</div>
    <table>
      <thead>
        <tr>
         <th>№</th>
         <th>NAME</th>
         <th>TYPE</th>
         <th>ACTION</th>
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
              <div class="remove__btn" @click="remove(item.id)">Remove</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <modal v-show="isPopupForm">
      <edit-category-form v-bind:category="element"/>
    </modal>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import Modal from '../modal/Modal.vue';
import EditCategoryForm from './EditCategoryForm.vue';
export default {
  components: { Modal, EditCategoryForm },
  name: 'CategoriesList',
  computed: mapGetters(['getAllCategories', 'isPopupForm', 'getCategoryById']),
  data() {
    return {
      element: ''
    }
  },
  methods: {
    ...mapActions(['getCategoriesData', 'removeCategoryById']),
    ...mapMutations(['changePopupForm']),
    remove(id) {
      const result = confirm('Вы уверенны?');
      if(result) {
        this.removeCategoryById(id);
      }
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

<style lang="scss" scoped></style>