<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Валюты</div>
      <create-button class="btn" @clickButton="showModal"></create-button>
    </div>
    <div class="handler__content">
      <div class="handler__content-form">
      <modal :modal-active="activeCreateModal" @hideModal="hideModal">
        <create-currency-form @hideForm="hideModal"/>
      </modal>
      </div>
      <currency-list/>
    </div>
  </div>
</template>

<script>
import CreateCurrencyForm from '@/components/currency/CreateCurrencyForm.vue'
import CurrencyList from '@/components/currency/CurrencyList.vue'
export default {
  components: { CreateCurrencyForm, CurrencyList},
  name: 'CurrencyHandler',
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

<style lang="scss" scoped></style>