<template>
  <div class="list-header">
    <div class="list-header__title">Список счетов</div>
    <table>
      <thead>
        <tr>
         <th>№</th>
         <th>NAME</th>
         <th>CURRENCY</th>
         <th>ACTION</th>
       </tr>
      </thead>
      <tbody>
        <tr v-for="item of getAllBills" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.currency}}</td>
          <td>
            <div class="td-btn">
              <div class="edit__btn">Edit</div>
              <div class="remove__btn" @click="remove(item.id)">Remove</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'BillList',
  computed: mapGetters(['getAllBills']),
  methods: {
    ...mapActions(['getBills', 'removeBillById']),
    remove(id) {
      const result = confirm('Вы уверенны?');
      if(result) {
        this.removeBillById(id);
      }
    }
  },
  async mounted() {
    this.getBills();
  }

}
</script>

<style lang="scss" scoped>
</style>