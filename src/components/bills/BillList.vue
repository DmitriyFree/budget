<template>
  <div class="list-header">
    <table v-if="!isEmptyList">
      <thead>
        <tr>
         <th>№</th>
         <th>Название</th>
         <th>Валюта</th>
         <th>Действие</th>
       </tr>
      </thead>
      <tbody>
        <bill-item v-for="item of getAllBills" :key="item.id" v-bind:bill="item"></bill-item>
      </tbody>
    </table>
    <div v-else class="empty-list">Список счетов пуст</div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import BillItem from './BillItem.vue';
export default {
  components: { BillItem },
  computed:  {
    ...mapGetters(['getAllBills']),
    isEmptyList() {
      if (this.getAllBills.length === 0) return true;
      else return false;
    }
  },
  methods: {
    ...mapActions(['getBillsData']),
  },
  async mounted() {
    this.getBillsData();
  }

}
</script>

<style lang="scss" scoped>
</style>