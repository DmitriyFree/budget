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
              <div class="edit__btn" @click="editBill(item.id)">Edit</div>
              <div class="remove__btn" @click="remove(item.id)">Remove</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <modal v-show="isPopupForm">
      <edit-bill-form v-bind:bill="elem"/>
    </modal>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import Modal from '../modal/Modal.vue';
import EditBillForm from './EditBillForm.vue';
export default {
  components: { Modal, EditBillForm },
  name: 'BillList',
  computed: mapGetters(['getAllBills', 'getBillById', 'isPopupForm']),
  data() {
    return {
      elem: ''
    }
  },
  methods: {
    ...mapActions(['getBills', 'removeBillById']),
    ...mapMutations(['changePopupForm']),
    remove(id) {
      const result = confirm('Вы уверенны?');
      if(result) {
        this.removeBillById(id);
      }
    },
    editBill(id) {
      this.changePopupForm(true);
      this.elem = this.getBillById(id);
    }
  },
  async mounted() {
    this.getBills();
  }

}
</script>

<style lang="scss" scoped>
</style>