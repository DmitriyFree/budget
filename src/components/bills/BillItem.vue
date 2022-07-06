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
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'BillItem',
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
      // this.setSelectedBill(this.bill);
      // this.changePopupForm(true);
      this.$emit('edit', this.bill)

    },
    async confirm() {
      // await this.setConfirmModalText('Вы уверены? Будут удалены все связанные записи');
      // this.setSelectedBill(this.bill);
      this.$emit('delete', this.bill)
    },
  },
}
</script>