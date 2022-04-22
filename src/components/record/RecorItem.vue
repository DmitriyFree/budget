<template>
  <tr class="inner">
    <td>{{item.id}}</td>
    <td>{{item.bill}}</td>
    <td>{{item.category}}</td>
    <td v-bind:class="{income: item.type === 'Доход', outcome: item.type === 'Расход'}">
      <span>{{item.type}}</span>
    </td>
    <td>{{item.date}}</td>
    <td>{{item.description}}</td>
    <td>{{item.sum}}</td>
    <td>
        <div class="td-btn">
            <!-- <div class="edit__btn" @click="editRecord(item.id)">Edit</div> -->
            <edit-button class="edit__btn" @clickButton="editRecord(item.id)"></edit-button>
            <!-- <div class="remove__btn" @click="confirm(item.id)">Remove</div> -->
            <delete-button class="remove__btn" @clickButton="confirm(item.id)"></delete-button>
        </div>
    </td>
    <confirm-modal v-bind:text="message" @result="deleteItem"/>
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
  name: 'RecorItem',
  props: ['item'],
  computed: mapGetters(['isPopupForm']),
  data() {
    return {
      elem: '',
      message: '',
      id: 0
    }
  },
  methods: {
    ...mapActions(['removeRecordById']),
    ...mapMutations(['changePopupForm', 'setFormData']),
    confirm(id) {
      this.message = 'Вы уверенны?';
      this.id = id;
    },
    deleteItem(result){
      if (result) {
        this.removeRecordById(this.id);
      }
      this.message = '';
      this.id = 0;
    },
    editRecord(record) {
      this.elem = this.item;
      this.$emit('edit', this.elem);
    }
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