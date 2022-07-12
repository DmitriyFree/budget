<template>
  <tr>
    <td>{{bill.id}}</td>
    <td>{{bill.name}}</td>
    <td>{{bill.currency}}</td>
    <td>{{bill.startBalance}}</td>
    <td>
      <div class="td-btn">
        <app-edit-button class="edit__btn" @clickButton="editBill"></app-edit-button>
        <app-delete-button class="remove__btn" @clickButton="confirm"></app-delete-button>
      </div>
    </td>
  </tr>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
export default {
  name: 'BillListItem',
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
      this.$emit('edit', {...this.bill})

    },
    async confirm() {
      this.$emit('delete', {...this.bill})
    },
  },
}
</script>