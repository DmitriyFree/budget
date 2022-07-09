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
          <category-list-item v-for="item of pageItems"
            :key="item.id"
            :category="item"
            @edit="editHandler"
            @delete="deleteHandler">
          </category-list-item>
        </tbody>
      </table>
      <pagination
        :pages-amount="pageCount"
        :page="page"
        @currentPage="updateList"/>
    </div>
    <div v-else class="empty-list">Список категорий пуст</div>
    <modal
      :modal-active="activeEditForm"
      @hideModal="hideEditForm">
      <category-edit-form
        :category="target"
        @hideForm="hideEditForm" >
      </category-edit-form>
    </modal>
    <confirm-modal
      :show="activeConfirmForm"
      @result="deleteCategory"/>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import paginationMixin from '@/mixins/pagination.mixin'
import CategoryListItem from '@/components/category/CategoryListItem.vue'
import CategoryEditForm from '@/components/category/CategoryEditForm.vue'
export default {
  name: 'CategoryList',
  components: {CategoryListItem, CategoryEditForm},
  mixins: [paginationMixin],
  data() {
    return {
      target: {},
      activeConfirmForm: false,
      activeEditForm: false
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
    async deleteCategory(result) {
      if (result && this.target.id) {
        try {
          await this.removeCategoryById(this.target.id)
        } catch (e) {}
        finally {
          this.activeConfirmForm = false
          this.target = {}
        }
      }
    },
    editHandler(category) {
      this.target = category
      this.activeEditForm= true
    },
    deleteHandler(category) {
      this.target = category
      this.activeConfirmForm = true
    },
    hideEditForm(result) {
      if (result) {
        this.target = {}
        this.activeEditForm = false
      }
    },
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