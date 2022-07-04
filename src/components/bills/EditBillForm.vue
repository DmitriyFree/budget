<template>
  <div class="edit-form">
     <form @submit.prevent="formHandler">
      <div class="row">
        <div class="label">
          <label>Название</label>
          <span class="error show">{{nameError}}</span>
        </div>
        <input type="text" required v-model="candidate.name" @input="resetNameError">
      </div>
       <div class="row">
        <div class="label">
          <label>Валюта</label>
          <span class="error show">{{currencyError}}</span>
        </div>
        <select v-model="candidate.currency" required @input="resetCurrencyError">
          <option v-for="item in getAllCurrencies" :key="item.id" >{{item.symbol}}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">
          <label>Начальный баланс</label>
          <span class="error">{{startBalanceError}}</span>
        </div>
        <input type="text" v-model="candidate.startBalance" @input="resetStartBalanceError">
      </div>
      <button type="submit" class="row btn">
        Изменить
      </button>
     </form>
  </div>
</template>
<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
import billMixin from '@/mixins/validator/bill.mixin'
export default {
  name: 'EditBillForm',
  mixins: [billMixin],
  computed: {
    ...mapGetters(['getSelectedBill', 'getAllCurrencies'])
  },
  data() {
    return {
      candidate: {
        id: 1,
        name: '',
        currency: '',
        startBalance: 0,
      },
    }
  },
  methods: {
    ...mapActions(['putBillById']),
    ...mapMutations(['changePopupForm']),
    async formHandler() {
      if (!this.checkFormData()) return
      if (!candidate.startBalance) candidate.startBalance = 0
      const data = {
        id: this.candidate.id,
        bill: {
          name: this.candidate.name,
          currency: this.candidate.currency,
          startBalance: this.candidate.startBalance
        }
      }
      this.putBillById(data)
      this.changePopupForm(false)
    },
  },
  watch: {
    getSelectedBill() {
      this.candidate =  {...this.getSelectedBill}
    }
  },
}
</script>
<style lang="scss" scoped></style>