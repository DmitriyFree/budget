<template>
  <div class="handler statistic">
    <div class="handler__header">
      <div class="title">Баланс по Счетам</div>
    </div>
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
</template>

<script>
import StatisticCategory from './StatisticCategory.vue'
import {mapGetters, mapActions} from "vuex"
export default {
  components: { StatisticCategory },
  name: 'BalanceHandler',
  computed: {
    ...mapGetters(['getStatisticAllBills', 'getMainCurrency'])
  },
  data() {
    return {
      billsStat: []
    }
  },
  methods: {
    ...mapActions(['getBills', 'getRecordsData', 'getCurrencyData']),
    test(data) {
      console.log(data);
    }
  },
  async mounted() {
    await this.getBills();
    await this.getRecordsData();
    await this.getCurrencyData();
  }

}
</script>

<style lang="scss" scoped>
  .statistic .handler__header {
    border: none;
  }
</style>