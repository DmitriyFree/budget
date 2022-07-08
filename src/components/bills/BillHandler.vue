<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Счета</div>
      <create-button class="btn" @clickButton="showModal"></create-button>
    </div>
    <div class="handler__content">
      <div class="handler__content-form">
        <modal :modal-active="activeCreateModal" @hideModal="hideModal">
          <create-bill-form @hideForm="hideModal"/>
        </modal>
      </div>
      <bill-list/>
    </div>
  </div>
</template>
<script>
import BillList from '@/components/bills/BillList.vue'
import CreateBillForm from '@/components/bills/CreateBillForm.vue'
export default {
  name: 'BillHandler',
  components: {BillList, CreateBillForm},
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
    },
  },
}
</script>

<style lang="scss" scoped></style>