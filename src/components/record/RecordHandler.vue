<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Записи</div>
      <create-button class="btn" @clickButton="createForm"></create-button>
      <currency-transfer-button class="btn" @clickButton="enterTransferForm"></currency-transfer-button>
    </div>
    <div class="handler__content">
      <div class="handler__content-form" v-bind:class="{done: !btnActive}">
        <create-modal v-show="isCreateForm">
          <create-record-form />
        </create-modal>
        <modal v-show="createTransferForm" @closeForm="closeTranserForm">
          <transfer-currency-form @hideForm="closeTranserForm" />
        </modal>
      </div>
      <records/>
    </div>
    <modal v-show="showEditRecordForm">
      <edit-record-form @hideForm="closeEditRecordForm" />
    </modal>
    <modal v-if="showTransferForm" @closeForm="closeEditTransferForm">
      <edit-transfer-form :firstRecord="firstRecord" :secondRecord="secondRecord" @hideForm="closeEditTransferForm"/>
    </modal>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import CreateRecordForm from './CreateRecordForm.vue'
import Records from './Records.vue'
import CreateModal from '../modal/CreateModal.vue'
import CurrencyTransferButton from '../ui/CurrencyTransferButton.vue'
import EditRecordForm from './EditRecordForm.vue'
import TransferCurrencyForm from './TransferCurrencyForm.vue'
import EditTransferForm from './EditTransferForm.vue'
export default {
  components: { CreateRecordForm, Records, CreateModal, EditRecordForm, CurrencyTransferButton, TransferCurrencyForm, EditTransferForm},
  name: 'RecordHandler',
  computed: {
    ...mapGetters(['isCreateForm', 'isPopupForm', 'getSelectedRecord', 'getRecordById']),
    showEditRecordForm() {
      if(this.isEditRecordForm && this.isPopupForm) return true
      else return false
    },
    showTransferForm() {
      if(this.isEditTransferForm && this.isPopupForm) return true
      else return false
    },

  },
  data() {
    return {
      btnActive: false,
      createTransferForm: false,
      isEditRecordForm: false,
      isEditTransferForm: false,
      firstRecord: {},
      secondRecord: {}
    }
  },
  methods: {
    ...mapMutations(['changeCreateForm']),
    createForm() {
      this.changeCreateForm(true);
    },
    enterTransferForm() {
      this.createTransferForm = true;
    },
    closeTranserForm(val) {
      if (val) this.createTransferForm = false;
    },
    closeEditRecordForm(val) {
      if (val) this.isEditRecordForm = false;
    },
    closeEditTransferForm(val) {
      if (val) this.isEditTransferForm = false;
    },
  },
  watch: {
    isPopupForm() {
      const resp = this.getSelectedRecord;
      if (this.isPopupForm) this.isEditRecordForm = false
      if (!resp.transfer) {
        this.isEditTransferForm = false
        this.isEditRecordForm = true
      } else {

        this.isEditRecordForm = false
        const firtId = resp.transfer.firstRecordId
        const secondId = resp.transfer.secondRecordId

        if (firtId && secondId) {
          this.isEditTransferForm = true
          this.firstRecord = this.getRecordById(firtId)
          this.secondRecord = this.getRecordById(secondId)
        } else this.isEditTransferForm = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>