<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Счета</div>
      <app-create-button class="btn" @clickButton="showCreateModal"></app-create-button>
    </div>
    <div class="handler__content">
      <div class="handler__content-form">
        <app-modal
          :modal-active="activeCreateModal"
          @hideModal="hideCreateModal">
          <bill-create-form @hideForm="hideCreateModal"></bill-create-form>
        </app-modal>
      </div>
      <bill-list/>
    </div>
  </div>
</template>
<script>
import BillList from '@/components/bill/BillList.vue'
import BillCreateForm from '@/components/bill/BillCreateForm.vue'
export default {
  name: 'BillView',
  components: {BillList, BillCreateForm},
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
    },
  },
}
</script>

<style lang="scss" scoped></style>