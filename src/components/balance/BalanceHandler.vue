<template>
  <div class="handler statistic">
    <loader/>
    <div class="handler__header">
      <div class="title">Баланс по Счетам</div>
    </div>
    <div class="handler__content">
      <div class="list-header">
      <table>
        <thead>
        <tr>
         <th>№</th>
         <th>Название</th>
         <th>Валюта</th>
         <th>Доход</th>
         <th>Расход</th>
         <th>Сумма</th>
         <th>Сумма в {{getMainCurrency.short}}</th>
       </tr>
      </thead>
      <tbody>
        <tr v-for="item of getStatisticAllBills" :key="item.key">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.currency}}</td>
          <td>{{item.income}}</td>
          <td>{{item.outcome}}</td>
          <td>{{item.total}}</td>
          <td>{{item.inMain}}</td>
        </tr>
      </tbody>
    </table>
      </div>

    </div>

  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import Loader from '../Loader.vue'
export default {
  components: {Loader },
  name: 'BalanceHandler',
  computed: {
    ...mapGetters(['getStatisticAllBills', 'getMainCurrency'])
  },
    async mounted() {
    try {
      await this.toggleLoader(true);
      await this.getBillsData();
      await this.getRecordsData();
      await this.getCurrencyData();
    } catch (err) {
      console.log(err);
    } finally {
      await this.toggleLoader(false);
    }
  },
  data() {
    return {
      billsStat: []
    }
  },
  methods: {
    ...mapActions(['getBillsData', 'getRecordsData', 'getCurrencyData', 'toggleLoader']),
    test(data) {
      console.log(data);
    }
  }
}
</script>

<style lang="scss" scoped>
</style>