<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Записи</div>
      <create-button class="btn" @clickButton="createForm"></create-button>
    </div>
    <div class="handler__content">
      <div class="handler__content-form" v-bind:class="{done: !btnActive}">
        <create-modal v-show="isCreateForm">
          <create-record-form />
        </create-modal>
      </div>
      <records/>
    </div>
    <modal v-show="isPopupForm">
     <edit-record-form />
   </modal>
    <confirm-modal @result="removeRecord" />
  </div>
</template>

<script>
import CreateRecordForm from './CreateRecordForm.vue'
import Records from './Records.vue'
import CreateModal from '../modal/CreateModal.vue'
import {mapGetters, mapMutations, mapActions} from 'vuex';
import CreateButton from '../ui/CreateButton.vue';
import Modal from '../modal/Modal.vue';
import EditRecordForm from './EditRecordForm.vue';
import ConfirmModal from '../modal/ConfirmModal.vue';
export default {
  components: { CreateRecordForm, Records, CreateModal, CreateButton, Modal, EditRecordForm, ConfirmModal},
  name: 'RecordHandler',
  computed: {
      ...mapGetters(['isCreateForm', 'isPopupForm', 'getSelectedRecord']),
  },
  data() {
    return {
      btnActive: false
    }
  },
  methods: {
    ...mapMutations(['changeCreateForm']),
    ...mapActions(['removeRecordById']),
    createForm() {
      this.changeCreateForm(true);
    },
    removeRecord(result){
      if (result) {
        const id = this.getSelectedRecord.id;
        this.removeRecordById(id);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>