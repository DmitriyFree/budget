<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Записи</div>
      <create-button class="btn" @clickButton="showCreateRecordModal"></create-button>
      <currency-transfer-button class="btn" @clickButton="enterTransferForm"></currency-transfer-button>
    </div>
    <div class="handler__content">
      <div class="handler__content-form" v-bind:class="{done: !btnActive}">
        <modal :modal-active="createRecordForm" @hideForm="hideCreateRecordModal">
          <create-record-form @hideForm="hideCreateModal" />
        </modal>
        <modal :modal-active="createTransferForm" @hideForm="closeTranserForm">
          <transfer-currency-form @hideForm="closeTranserForm" />
        </modal>
      </div>
      <records/>
    </div>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import CreateRecordForm from '@/components/record/CreateRecordForm.vue'
import Records from '@/components/record/Records.vue'
import TransferCurrencyForm from '@/components/record/TransferCurrencyForm.vue'
export default {
  components: { CreateRecordForm, Records, TransferCurrencyForm},
  name: 'RecordHandler',
  computed: {
    ...mapGetters(['getRecordById']),
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
      createRecordForm: false,
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
      this.changeCreateForm(true)
    },
    enterTransferForm() {
      this.createTransferForm = true
    },
    closeTranserForm(val) {
      if (val) this.createTransferForm = false
    },
    hideCreateRecordModal(result) {
      if (result) this.createRecordForm = false
    },
    closeEditRecordForm(val) {
      if (val) this.isEditRecordForm = false
    },
    closeEditTransferForm(val) {
      if (val) this.isEditTransferForm = false
    },

    showCreateRecordModal() {
      this.createRecordForm = true
    },

    hideCreateModal(result) {
      if (result) this.createRecordForm = false
    }
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