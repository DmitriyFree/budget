<template>
  <div class="create-form">
    <form @submit.prevent="formHandler">
      <div class="title">Новый Счет</div>
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
          <span class="error">{{currencyError}}</span>
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
        ДОБАВИТЬ
      </button>
     </form>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex'
import billMixin from '@/mixins/validator/bill.mixin'
export default {
  name: 'CreateBillForm',
  mixins: [billMixin],
  data() {
    return {
      candidate: {
        name: '',
        currency: '',
        startBalance: 0
      },
    }
  },
  computed: mapGetters(['getAllCurrencies']),
  methods: {
    ...mapActions(['getCurrencyData', 'addBill']),
    ...mapMutations(['changeCreateForm']),
    formHandler() {
      if (this.checkFormData()) {
        if (!this.candidate.startBalance) this.candidate.startBalance = 0
        this.addBill(this.candidate)
        this.resetForm()
        this.changeCreateForm(false)
      }
    },
  },
  watch: {
    async getAllCurrencies() {
      const currencyList = this.getAllCurrencies
      if (currencyList.length == 0) this.currencyError = 'у вас нет валют'
      else {
        if (this.currencyError === 'у вас нет валют') this.currencyError = ''
      }
    }
  },
  // async mounted() {
  //   await this.getCurrencyData()
  // }
}
</script>

<style lang="scss" scoped></style>
