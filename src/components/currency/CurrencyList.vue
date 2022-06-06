<template>
  <div class="list-header">
    <table v-if="!isEmptyList">
      <thead>
        <tr>
         <th>№</th>
         <th>Название</th>
         <th>Код</th>
         <th>Курс к USD</th>
         <th>Действие</th>
       </tr>
      </thead>
      <tbody>
        <currency-item  v-for="item of getAllCurrencies" :key="item.id" v-bind:currency="item"></currency-item>
      </tbody>
    </table>
    <div v-else class="empty-list">Список валют пуст</div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import CurrencyItem from './CurrencyItem.vue';
export default {
  components: {CurrencyItem},
  name: 'CurrencyList',
  computed: {
    ...mapGetters(['getAllCurrencies']),
    isEmptyList() {
      if (this.getAllCurrencies.length === 0) return true;
      else return false;
    }
  },
  methods: {
    ...mapActions(['getCurrencyData']),
  },
  async mounted() {
    this.getCurrencyData();
  }
}
</script>

<style lang="scss" scoped>
</style>