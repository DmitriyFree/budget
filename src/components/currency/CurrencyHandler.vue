<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Валюты</div>
      <app-create-button class="btn" @clickButton="showCreateModal"></app-create-button>
    </div>
    <div class="handler__content">
      <div class="handler__content-form">
      <app-modal :modal-active="activeCreateModal" @hideModal="hideCreateModal">
        <currency-create-form @hideForm="hideCreateModal"></currency-create-form>
      </app-modal>
      </div>
      <currency-list/>
    </div>
  </div>
</template>

<script>
import CurrencyCreateForm from '@/components/currency/CurrencyCreateForm.vue'
import CurrencyList from '@/components/currency/CurrencyList.vue'
export default {
  components: { CurrencyCreateForm, CurrencyList},
  name: 'CurrencyHandler',
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

<style lang="scss" scoped></style>