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
import {mapGetters, mapMutations} from 'vuex';
export default {
  name: 'CurrencyItem',
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