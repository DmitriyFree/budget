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
        <bill-item v-for="item of pageItems" :key="item.id" v-bind:bill="item"></bill-item>
      </tbody>
        </table>
        <pagination :pagesAmount="pageCount" :page="page" @currentPage="updateList"/>
    </div>
    <div v-else class="empty-list">Список счетов пуст</div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import paginationMixin from '@/mixins/pagination.mixin'
import BillItem from './BillItem.vue';
export default {
  components: { BillItem },
  mixins: [paginationMixin],
  computed:  {
    ...mapGetters(['getAllBills']),
    isEmptyList() {
      if (this.getAllBills.length === 0) return true;
      else return false;
    }
  },
  methods: {
    async updateList(currentPage) {
      this.page = currentPage
      await this.setupPagination(this.getAllBills)
    }
  },
  watch: {
    getAllBills() {
      this.setupPagination(this.getAllBills)
    }
  },
  async mounted() {
    await this.setupPagination(this.getAllBills)
  }

}
</script>

<style lang="scss" scoped>
</style>