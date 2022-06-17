<template>
  <div class="handler statistic">
    <loader/>
    <div class="handler__header">
      <div class="title">Баланс по Счетам</div>
    </div>
    <div class="handler__content">
      <div class="list-header">
      <table v-if="!isEmptyList">
        <thead>
        <tr>
         <th>№</th>
         <th>Название</th>
         <th>Валюта</th>
         <th>Нач. баланс</th>
         <th>Доход</th>
         <th>Расход</th>
         <th>Сумма</th>
         <th>Сумма в {{mainCurrencySymbol}}</th>
       </tr>
      </thead>
      <tbody>
        <tr v-for="item of statisticList" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.currency}}</td>
          <td>{{item.startBalance}}</td>
          <td>{{item.income}}</td>
          <td>{{item.outcome}}</td>
          <td>{{item.total}}</td>
          <td>{{item.inUsd}}</td>
        </tr>
      </tbody>
    </table>
     <div v-else class="empty-list">Данных пока нет</div>
    </div>
    <main-currency-handler @changeCurrency="changeMainCurrency"/>
    <div class="main">

    </div>

    </div>

  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex"
import MainCurrencyHandler from './MainCurrencyHandler.vue';
import Loader from '../Loader.vue'
export default {
  components: {Loader, MainCurrencyHandler },
  name: 'BalanceHandler',
  computed: {
    ...mapGetters(['getAllRecords', 'getAllBills', 'getAllCurrencies', 'getCurrencyBySymbol']),
    statisticList() {
      const bills = this.getAllBills;
      const returnedList = [];
      bills.forEach(bill => returnedList.push(this.countOneBill(bill)));
      return returnedList;
    },
    isEmptyList() {
      if (this.statisticList.length === 0) return true;
      else return false;
    },
    selectedCurrencyPrice() {
      if (this.mainCurrencySymbol == 'USD') return 1;
      else {
        const currency = this.getCurrencyBySymbol(this.mainCurrencySymbol);
        if (currency.price) return currency.price
        else return 1
      }
    }
  },
  data() {
    return {
      mainCurrencySymbol: 'USD'
    }
  },
  methods: {
    ...mapActions(['getBillsData', 'getRecordsData', 'getCurrencyData', 'toggleLoader']),
    countOneBill(bill) {
      const statCandidat = {
        id: bill.id,
        name: bill.name,
        currency: bill.currency,
        startBalance: bill.startBalance,
        income: 0,
        outcome: 0,
        total: 0,
        inUsd: 0
      }
      const records = this.getAllRecords;
      records.forEach(elem => {
        if (elem.bill == statCandidat.name) {
              if (elem.type == 'Доход') statCandidat.income += +elem.sum;
              else statCandidat.outcome += +elem.sum;
            }
      });
      statCandidat.total = +(statCandidat.startBalance) + statCandidat.income - statCandidat.outcome;
      statCandidat.inUsd = this.countInSelectedCurrency(statCandidat.currency, statCandidat.total, this.selectedCurrencyPrice)
      return statCandidat;
    },
    countInSelectedCurrency(symbol, sum = 0, secondRate = 1) {
      const currencies = this.getAllCurrencies;
      const result = currencies.filter(elem => elem.symbol == symbol);
      if (result.length > 0) {
        const price = result[0].price;
        return ((sum / price) * secondRate).toFixed(2);
      } else return 0
    },
    changeMainCurrency(symbol) {
      this.mainCurrencySymbol = symbol;
    }
  },
  async mounted() {
    try {
      await this.toggleLoader(true);
      await this.getBillsData();
      await this.getRecordsData();
      await this.getCurrencyData();
    } catch (error) {
      console.log(error);
    } finally {
      await this.toggleLoader(false);
    }
  },
}
</script>

<style lang="scss" scoped>
</style>