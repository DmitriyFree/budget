<template>
  <div class="currency-handler">
    <div class="currency-handler__header">
      <div class="currency-handler__header-title">Валюты</div>
    </div>
    <div class="currency-handler__form">
      <create-currency-form/>
    </div>
    <div class="currency-handler__list">
      <currency-list/>
    </div>
  </div>
</template>

<script>
import CreateCurrencyForm from './CreateCurrencyForm.vue'
import CurrencyList from './CurrencyList.vue'
export default {
  components: { CreateCurrencyForm, CurrencyList },
  name: 'CurrencyHandler'
}
</script>

<style lang="scss" scoped>
  .currency-handler {
    padding: 10px 20px;
    &__header {
      padding: 10px 0;
      border-bottom: 1px solid #aaa;
      &-title {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
</style>