<template>
  <tr class="inner">
    <td>{{record.id}}</td>
    <td>{{record.bill}}</td>
    <td>{{record.category}}</td>
    <td v-bind:class="{income: record.type === 'Доход', outcome: record.type === 'Расход'}">
      <span>{{record.type}}</span>
    </td>
    <td>{{record.date}}</td>
    <td>{{record.description}}</td>
    <td>{{record.sum}}</td>
    <td>
        <div class="td-btn">
            <!-- <div class="edit__btn" @click="editRecord(item.id)">Edit</div> -->
            <edit-button class="edit__btn" @clickButton="editRecord"></edit-button>
            <!-- <div class="remove__btn" @click="confirm(item.id)">Remove</div> -->
            <delete-button class="remove__btn" @clickButton="confirm"></delete-button>
        </div>
    </td>
    <!-- <confirm-modal v-bind:text="message" @result="deleteItem"/> -->
  </tr>
</template>
<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import Modal from '../modal/Modal.vue';
import EditRecordForm from './EditRecordForm.vue';
import ConfirmModal from '../modal/ConfirmModal.vue';
import DeleteButton from '../ui/DeleteButton.vue';
import EditButton from '../ui/EditButton.vue';
export default {
  components: {EditRecordForm, Modal, ConfirmModal, DeleteButton, EditButton},
  name: 'RecordItem',
  props: {
    record: {
      type: Object,
      required: true
    }
  },
  computed: mapGetters(['getConfirmResult']),
  methods: {
    ...mapMutations(['changePopupForm', 'setConfirmModalText', 'setSelectedRecord']),
    editRecord() {
      this.setSelectedRecord(this.record);
      this.changePopupForm(true);
    },
    async confirm(id) {
      await this.setConfirmModalText('Вы уверенны?');
      this.setSelectedRecord(this.record);
    },
  }
}
</script>
<style lang="scss" scoped>
  .inner td{
    &.outcome span{
       display: block;
       padding: 0 7px;
       background: #ff426e;
       text-align: center;
      //  color: #fff;
      //  background: #c70d0d;

    }
    &.income span{
      display: block;
      padding: 0 7px;
      background: #73eb73;
      text-align: center;
      // color: #fff;
      // background: #196e19;
    }
  }

</style>