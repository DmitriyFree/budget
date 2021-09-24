<template>
  <div class="currencies">
    <div class="currencies__title">Список валют</div>
    <ul class="currencies-list" v-for="item of getAllCurrencies" :key="item.id">
     <currency-item v-bind:item="item"/>
    </ul>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import CurrencyItem from './CurrencyItem.vue';
export default {
  components: { CurrencyItem },
  name: 'CurrencyList',
  computed: mapGetters(['getAllCurrencies']),
  methods: mapActions(['getCurrencyData']),
  async mounted() {
    this.getCurrencyData();
  }
}
</script>

<style lang="scss" scoped>
  .currencies {
    &__title {
      font-size: 18px;
      font-weight: 700;
      padding: 20px 0 10px;
    }
    &-list {
      list-style: none;
    }
  }
</style>