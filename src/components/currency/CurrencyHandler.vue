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
      <div class="main-currency">Основная валюта {{getMainCurrency.title}} ({{getMainCurrency.short}})</div>
    </div>
  </div>
</template>

<script>
import CreateCurrencyForm from './CreateCurrencyForm.vue'
import CurrencyList from './CurrencyList.vue'
import {mapGetters, mapActions} from "vuex"
export default {
  components: { CreateCurrencyForm, CurrencyList },
  name: 'CurrencyHandler',
  computed: {
    ...mapGetters(['getMainCurrency'])
  },
  data() {
    return {
      btnActive: false
    }
  },
  methods: {
    ...mapActions(['getCurrencyData'])
  },
  async mounted() {
    this.getCurrencyData();
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
  .main-currency {
    font-weight: 700;
    margin-top: 10px;
  }
</style>