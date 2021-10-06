<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Валюты</div>
      <div class="btn" @click="btnActive = !btnActive" v-bind:class="{active: btnActive}">
      </div>
    </div>
    <div class="handler__content">
      <div class="handler__content-form" v-bind:class="{done: !btnActive}">
        <create-currency-form/>
      </div>
      <currency-list/>
    </div>
  </div>
</template>

<script>
import CreateCurrencyForm from './CreateCurrencyForm.vue'
import CurrencyList from './CurrencyList.vue'
export default {
  components: { CreateCurrencyForm, CurrencyList },
  name: 'CurrencyHandler',
  data() {
    return {
      btnActive: false
    }
  }
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