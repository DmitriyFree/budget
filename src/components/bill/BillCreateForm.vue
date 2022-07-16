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
        <select required
          v-model="candidate.currency"
          @input="resetCurrencyError">
          <option
            v-for="item in getAllCurrencies"
            :key="item.id" >
            {{item.symbol}}
          </option>
        </select>
      </div>
      <div class="row">
        <div class="label">
          <label>Начальный баланс</label>
          <span class="error">{{startBalanceError}}</span>
        </div>
        <input
          type="text"
          v-model="candidate.startBalance"
          @input="resetStartBalanceError">
      </div>
      <button type="submit" class="row btn">
        ДОБАВИТЬ
      </button>
     </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import billMixin from '@/mixins/validator/bill.mixin'
import useVuelidate from '@vuelidate/core'
export default {
  name: 'BillCreateForm',
  mixins: [billMixin],
  setup () {
    return { v$: useVuelidate() }
  },
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
    ...mapActions(['addBill']),
    async formHandler() {
      if (this.checkFormData()) {
        if (!this.candidate.startBalance) this.candidate.startBalance = 0
        try {
          await  this.addBill(this.candidate)
        } catch (e) {}
        finally {
          this.$emit('hideForm', true)
        }
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
}
</script>

<style lang="scss" scoped></style>
