<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Счета</div>
      <create-button class="btn" @clickButton="createForm"></create-button>
    </div>
    <div class="handler__content">
      <div class="handler__content-form" v-bind:class="{done: !btnActive}">
         <create-modal v-show="isCreateForm">
           <create-bill-form/>
         </create-modal>
      </div>
      <bill-list/>
    </div>
    <modal v-show="isPopupForm">
      <edit-bill-form />
    </modal>
    <confirm-modal @result="removeBill" />
  </div>
</template>
<script>
import CreateModal from '../modal/CreateModal.vue'
import BillList from './BillList.vue'
import CreateBillForm from './CreateBillForm.vue'
import {mapGetters, mapActions ,mapMutations} from "vuex"
import CreateButton from '../ui/CreateButton.vue'
import Modal from '../modal/Modal.vue';
import EditBillForm from './EditBillForm.vue';
import ConfirmModal from '../modal/ConfirmModal.vue';
export default {
  components: { BillList, CreateBillForm, CreateModal, CreateButton, Modal, EditBillForm, ConfirmModal },
  name: 'BillHandler',
  computed: {
    ...mapGetters(['isCreateForm', 'isPopupForm', 'getConfirmResult', 'getSelectedBill']),
  },
  data() {
    return {
      btnActive: false
    }
  },
  methods: {
    ...mapMutations(['changeCreateForm', 'setConfirmResult']),
    ...mapActions(['removeBillById']),
    createForm(){
      this.changeCreateForm(true);
    },
    removeBill(reuslt) {
      if (reuslt) {
        const id = this.getSelectedBill.id;
        this.removeBillById(id);
      }
    }
  },
}
</script>

<style lang="scss" scoped></style>