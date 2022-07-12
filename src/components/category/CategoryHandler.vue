<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Категории</div>
      <app-create-button class="btn" @clickButton="showCreateModal"></app-create-button>
    </div>
    <div class="handler__content">
      <div class="handler__content-form">
        <app-modal
          :modal-active="activeCreateModal"
          @hideModal="hideCreateModal">
          <category-create-form
            @hideForm="hideCreateModal" >
          </category-create-form>
        </app-modal>
      </div>
      <category-list></category-list>
    </div>
  </div>
</template>

<script>
import CategoryList from '@/components/category/CategoryList.vue'
import CategoryCreateForm from '@/components/category/CategoryCreateForm.vue'
export default {
  components: {CategoryCreateForm, CategoryList},
  name: 'CategoryHandler',
    data() {
      return {
        activeCreateModal: false
      }
    },
    methods: {
      showCreateModal() {
        this.activeCreateModal = true
      },
      hideCreateModal(result) {
        if (result) this.activeCreateModal = false
      }
    },
}
</script>

<style lang="scss" scoped>
</style>