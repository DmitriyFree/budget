<template>
  <div class="list-header">
    <div v-if="!isEmptyList">
      <table >
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
        <currency-item  v-for="item of list" :key="item.id" v-bind:currency="item"></currency-item>
        </tbody>
      </table>
      <pagination :pagesAmount="getMaxPageCurrency" :page="getCurrentPageCurrency" @currentPage="updateList" ></pagination>
    </div>

    <div v-else class="empty-list">Список валют пуст</div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import Pagination from '../ui/Pagination.vue';
import CurrencyItem from './CurrencyItem.vue';
export default {
  components: {CurrencyItem, Pagination},
  name: 'CurrencyList',
  computed: {
    ...mapGetters(['getCurrencyOnePage', 'getMaxPageCurrency', 'getCurrentPageCurrency']),
    list() {
      return this.getCurrencyOnePage;
    },
    isEmptyList() {
      if (this.getCurrencyOnePage.length === 0) return true;
      else return false;
    }
  },
  methods: {
    ...mapActions(['refreshCurrencyOnePage']),
    ...mapMutations(['setCurrentPageCurrency']),
    async updateList(currentPage) {
      this.setCurrentPageCurrency(currentPage);
      await this.refreshCurrencyOnePage();
    }
  },
  async mounted() {
    this.refreshCurrencyOnePage();
  }
}
</script>

<style lang="scss" scoped>
</style>