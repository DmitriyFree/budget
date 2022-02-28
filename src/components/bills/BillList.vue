<template>
  <div class="list-header">
    <table>
      <thead>
        <tr>
         <th>№</th>
         <th>Название</th>
         <th>Валюта</th>
         <th>Действие</th>
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
              <div class="remove__btn" @click="confirm(item.id)">Remove</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <modal v-show="isPopupForm">
      <edit-bill-form v-bind:bill="elem"/>
    </modal>
    <confirm-modal v-bind:text="message" @result="deleteBill"/>
  </div>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import Modal from '../modal/Modal.vue';
import EditBillForm from './EditBillForm.vue';
import ConfirmModal from '../modal/ConfirmModal.vue';
export default {
  components: { Modal, EditBillForm, ConfirmModal },
  name: 'BillList',
  computed: mapGetters(['getAllBills', 'getBillById', 'isPopupForm']),
  data() {
    return {
      elem: '',
      message: '',
      id: 0
    }
  },
  methods: {
    ...mapActions(['getBillsData', 'removeBillById']),
    ...mapMutations(['changePopupForm']),
    confirm(id) {
      this.message = 'Вы уверены? Будут удалены все связанные записи';
      this.id = id;
    },
    deleteBill(result){
      if (result) {
        this.removeBillById(this.id);
      }
      this.message = '';
      this.id = 0;
    },
    editBill(id) {
      this.changePopupForm(true);
      this.elem = this.getBillById(id);
    }
  },
  async mounted() {
    this.getBillsData();
  }

}
</script>

<style lang="scss" scoped>
</style>