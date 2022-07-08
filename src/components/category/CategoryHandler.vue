<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Категории</div>
      <create-button class="btn" @clickButton="showModal"></create-button>
    </div>
    <div class="handler__content">
      <div class="handler__content-form">
        <modal :modalActive="activeCreateModal" @hideModal="hideModal">
          <create-category-form @hideForm="hideModal"/>
        </modal>
      </div>
      <categories-list/>
    </div>
  </div>
</template>

<script>
import CategoriesList from '@/components/category/CategoriesList.vue'
import CreateCategoryForm from '@/components/category/CreateCategoryForm.vue'
export default {
  components: {CreateCategoryForm, CategoriesList},
  name: 'CategoryHandler',
    data() {
      return {
        activeCreateModal: false
      }
    },
    methods: {
      showModal() {
        this.activeCreateModal = true
      },
      hideModal(result) {
        if (result) this.activeCreateModal = false
      }
    },
}
</script>

<style lang="scss" scoped>
</style>