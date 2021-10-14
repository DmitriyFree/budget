<template>
  <div class="edit-form">
     <form @submit.prevent="formHandler">
      <div class="row">
        <div class="label">
          <label>Название</label>
          <span class="error show">{{nameError}}</span>
        </div>
        <input type="text" required v-model="name" @input="resetNameError">
      </div>
       <div class="row">
        <div class="label">
          <label>Валюта</label>
          <span class="error show">{{currencyError}}</span>
        </div>
        <select v-model="currency" required @input="resetCurrencyError">
          <option v-for="item in getAllCurrencies" :key="item.id" >{{item.short}}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">
          <label>Начальный баланс</label>
          <span class="error">{{startBalanceError}}</span>
        </div>
        <input type="text" v-model="startBalance" @input="resetStartBalanceError">
      </div>
      <button type="submit" class="row btn">
        Изменить
      </button>
     </form>
  </div>
</template>
<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'EditBillForm',
  props: ['bill'],
  computed: mapGetters(['getAllCurrencies']),
  data() {
    return {
      id: 1,
      name: '',
      currency: '',
      startBalance: 0,
      nameError: '',
      currencyError: '',
      startBalanceError: ''
    }
  },
  methods: {
    ...mapActions(['putBillById']),
    ...mapMutations(['changeModalActive']),
    async formHandler() {
      if (!this.checkFormData()) return
      const data = {
        id: this.id,
        bill: {
          name: this.name,
          currency: this.currency,
          startBalance: this.startBalance
        }
      }
      this.putBillById(data);
      this.changeModalActive(false);
    },
    checkFormData() {
      if (!this.name) return false;
      if (this.name.length < 3) this.nameError = 'минимум 3 символа';
      if (this.name.length > 20) this.nameError = 'максимум 20 символов';
      if (!this.currency) this.currencyError = 'выбирете тип';
      if (isNaN(this.startBalance)) this.startBalanceError = 'только число';


      if(this.nameError || this.currencyError || this.startBalanceError) return false;
      return true;

    },
    resetNameError() {
      this.nameError = '';
    },
    resetCurrencyError() {
      this.currencyError = '';
    },
    resetStartBalanceError() {
      this.startBalanceError = '';
    },
  },
  watch: {
    bill() {
      this.id = this.bill.id;
      this.name = this.bill.name;
      this.currency = this.bill.currency;
      this.startBalance = this.bill.startBalance;
  }
},
}
</script>
<style lang="scss" scoped></style>