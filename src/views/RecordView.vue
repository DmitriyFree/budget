<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Записи</div>
      <app-create-button class="btn" @clickButton="showRecordCreateForm"></app-create-button>
      <app-transfer-button class="btn" @clickButton="showTransferCreateForm"></app-transfer-button>
    </div>
    <div class="handler__content">
      <div class="handler__content-form">
        <app-modal :modal-active="createRecordForm" @hideModal="hideRecordCreateForm">
          <record-create-form
            @hideForm="hideRecordCreateForm">
          </record-create-form>
        </app-modal>
        <app-modal
          :modal-active="createTransferForm"
          @hideModal="hideTransferCreateForm">
          <record-transfer-create-form
            @hideForm="hideTransferCreateForm">
          </record-transfer-create-form>
        </app-modal>
      </div>
      <record-list></record-list>
    </div>
  </div>
</template>

<script>
import RecordCreateForm from '@/components/record/RecordCreateForm.vue'
import RecordTransferCreateForm from '@/components/record/RecordTransferCreateForm.vue'
import RecordList from '@/components/record/RecordList.vue'
export default {
  name: 'RecordView',
  components: {RecordCreateForm, RecordTransferCreateForm, RecordList},
  data() {
    return {
      createRecordForm: false,
      createTransferForm: false,
    }
  },
  methods: {
    showRecordCreateForm() {
      this.createRecordForm = true
    },
    hideRecordCreateForm(result) {
      if (result) this.createRecordForm = false
    },
    showTransferCreateForm() {
      this.createTransferForm = true
    },
    hideTransferCreateForm(result) {
      if (result) this.createTransferForm = false
    }
  },
}
</script>

<style lang="scss" scoped>
</style>