<template>
  <tr>
    <td>{{currency.id}}</td>
    <td>{{currency.title}}</td>
    <td>{{currency.symbol}}</td>
    <td>{{currency.price}}</td>
    <td>
      <div class="td-btn">
        <edit-button class="edit__btn" @clickButton="edit"></edit-button>
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
  name: 'CurrencyItem',
  components: {EditButton, DeleteButton, ConfirmModal},
  props: {
    currency: {
      type: Object,
      required: true
    }
  },
  computed: {
     ...mapGetters(['getConfirmResult'])
  },
  methods: {
    ...mapMutations(['changePopupForm', 'setSelectedCurrency', 'setConfirmModalText']),
    edit() {
      this.setSelectedCurrency(this.currency);
      this.changePopupForm(true);
    },
    async confirm() {
      await this.setConfirmModalText('Вы уверены? Будут удалены все связанные записи');
      this.setSelectedCurrency(this.currency);
    },

  },

}
</script>

<style lang="scss" scoped></style>