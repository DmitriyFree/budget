<template>

  <div class="list-header">
    <div v-if="!isEmptyList">
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
          <category-item v-for="item of pageItems"
            :key="item.id"
            :category="item"
            @edit="editHandler"
            @delete="deleteHandler">
          </category-item>
        </tbody>
     </table>
     <pagination :pagesAmount="pageCount" :page="page" @currentPage="updateList"/>
    </div>
    <div v-else class="empty-list">Список категорий пуст</div>
    <modal v-show="showEdit" @closeForm="hideModal">
      <edit-category-form
      :category="target"
      @hideForm="closeEditForm" />
    </modal>
    <confirm-modal
      :show="show"
      @result="deleteCategory"/>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import paginationMixin from '@/mixins/pagination.mixin'
import CategoryItem from './CategoryItem.vue'
import ConfirmModal from '../modal/ConfirmModal.vue'
import EditCategoryForm from '../category/EditCategoryForm.vue'
export default {
  components: {CategoryItem, ConfirmModal, EditCategoryForm},
  name: 'CategoriesList',
  mixins: [paginationMixin],
  data() {
    return {
      target: {},
      show: false,
      showEdit: false
    }
  },
  computed: {
    ...mapGetters(['getAllCategories']),
    isEmptyList() {
      if (this.getAllCategories.length === 0) return true
      else return false
    }
  },
  methods: {
    ...mapActions(['getCategoriesData', 'removeCategoryById']),
    async updateList(currentPage) {
      this.page = currentPage
      await this.setupPagination(this.getAllCategories)
    },
    editHandler(category) {
      this.target = category
      this.showEdit= true
    },
    closeEditForm(result) {
      if (result) {
        this.target = {}
        this.showEdit = false
      }
    },
    hideModal(result) {
      if (result)   this.showEdit = false
    },
    deleteHandler(category) {
      this.show = true
      this.target = category
    },
    async deleteCategory(result) {
      if (result && this.target.id) {
        try {
          await this.removeCategoryById(this.target.id)
        } catch (e) {}
      }
      this.show = false
      this.target = {}

    }
  },
  watch: {
    getAllCategories() {
      this.setupPagination(this.getAllCategories)
    }
  },
  async mounted() {
    await this.setupPagination(this.getAllCategories)
  }
}
</script>

<style lang="scss" scoped>
</style>