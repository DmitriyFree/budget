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
  </div>
</template>
<script>
import {mapGetters, mapActions ,mapMutations} from 'vuex'
import CreateModal from '../modal/CreateModal.vue'
import BillList from './BillList.vue'
import CreateBillForm from './CreateBillForm.vue'
import CreateButton from '../ui/CreateButton.vue'
import EditBillForm from './EditBillForm.vue'
export default {
  components: { BillList, CreateBillForm, CreateModal, CreateButton, EditBillForm },
  name: 'BillHandler',
  computed: {
    ...mapGetters(['isCreateForm', 'isPopupForm', 'getSelectedBill']),
  },
  data() {
    return {
      btnActive: false
    }
  },
  methods: {
    ...mapMutations(['changeCreateForm']),
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