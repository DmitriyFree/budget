<template>
  <tr>
    <td>{{bill.id}}</td>
    <td>{{bill.name}}</td>
    <td>{{bill.currency}}</td>
    <td>{{bill.startBalance}}</td>
    <td>
      <div class="td-btn">
        <edit-button class="edit__btn" @clickButton="editBill"></edit-button>
        <delete-button class="remove__btn" @clickButton="confirm"></delete-button>
      </div>
    </td>
  </tr>
</template>

<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
import ConfirmModal from '../modal/ConfirmModal.vue';
import DeleteButton from '../ui/DeleteButton.vue';
import EditButton from '../ui/EditButton.vue';
export default {
  name: 'BillItem',
  components: {EditButton, DeleteButton, ConfirmModal},
  props: {
    bill: {
      type: Object,
      required: true
    }
  },
  computed: {
     ...mapGetters(['getConfirmResult'])
  },
  methods: {
    ...mapMutations(['changePopupForm', 'setSelectedBill', 'setConfirmModalText']),
    editBill() {

      this.setSelectedBill(this.bill);
      this.changePopupForm(true);
    },
    async confirm() {
      await this.setConfirmModalText('Вы уверены? Будут удалены все связанные записи');
      this.setSelectedBill(this.bill);
    },

  },
}
</script>