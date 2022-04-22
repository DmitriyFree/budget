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
              <edit-button class="edit__btn" @clickButton="editBill(item.id)"></edit-button>
              <delete-button class="remove__btn" @clickButton="confirm(item.id)"></delete-button>
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
import DeleteButton from '../ui/DeleteButton.vue';
import EditButton from '../ui/EditButton.vue';
export default {
  components: { Modal, EditBillForm, ConfirmModal, DeleteButton, EditButton },
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