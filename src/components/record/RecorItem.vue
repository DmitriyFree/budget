<template>
  <tr class="inner" v-bind:class="{income: item.type === 'Доход'}">
    <td>{{item.id}}</td>
    <td>{{item.bill}}</td>
    <td>{{item.category}}</td>
    <td>{{item.type}}</td>
    <td>{{item.date}}</td>
    <td>{{item.description}}</td>
    <td>{{item.sum}}</td>
    <td>
        <div class="td-btn">
            <div class="edit__btn" @click="editRecord(item.id)">Edit</div>
            <div class="remove__btn" @click="confirm(item.id)">Remove</div>
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
export default {
  components: {EditRecordForm, Modal, ConfirmModal},
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
  .inner {
    background: #ff7293;;
    &.income {
      background: #73eb73;
    }
  }

</style>