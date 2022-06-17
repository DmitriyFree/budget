<template>
  <div class="list-header">
    <div  v-if="!isEmptyList">
      <table>
      <thead>
        <tr>
         <th>№</th>
         <th>Название</th>
         <th>Валюта</th>
         <th>Начальный баланс</th>
         <th>Действие</th>
       </tr>
      </thead>
      <tbody>
        <bill-item v-for="item of getBillsOnePage" :key="item.id" v-bind:bill="item"></bill-item>
      </tbody>
        </table>
        <pagination :pagesAmount="getMaxPageBill" :page="getCurrentPageBill" @currentPage="updateList"/>
    </div>


    <div v-else class="empty-list">Список счетов пуст</div>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import Pagination from '../ui/Pagination.vue';
import BillItem from './BillItem.vue';
export default {
  components: { BillItem, Pagination },
  computed:  {
    ...mapGetters(['getBillsOnePage', 'getMaxPageBill', 'getCurrentPageBill']),
    isEmptyList() {
      if (this.getBillsOnePage.length === 0) return true;
      else return false;
    }
  },
  methods: {
    ...mapActions(['refreshBillOnePage']),
    ...mapMutations(['setCurrentPageBill']),
    async updateList(currentPage) {
      this.setCurrentPageBill(currentPage);
      await this.refreshBillOnePage();
    }
  },
  async mounted() {
    await this.refreshBillOnePage();
  }

}
</script>

<style lang="scss" scoped>
</style>