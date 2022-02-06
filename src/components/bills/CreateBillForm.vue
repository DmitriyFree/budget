<template>
  <div class="create-form">
    <form @submit.prevent="formHandler">
      <div class="title">Новый Счет</div>
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
          <span class="error">{{currencyError}}</span>
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
        ДОБАВИТЬ
      </button>
     </form>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
export default {
  name: 'CreateBillForm',
  data() {
    return {
      name: '',
      currency: '',
      startBalance: 0,
      nameError: '',
      currencyError: '',
      startBalanceError: ''
    }
  },
  computed: mapGetters(['getAllCurrencies']),
  methods: {
    ...mapActions(['getCurrencyData', 'addBill']),
    ...mapMutations(['changeCreateForm']),
    formHandler() {
      if (this.checkFormData()) {
        const newBill = {
          name: this.name,
          currency: this.currency,
          startBalance: this.start,
          records: []
        }

        this.addBill(newBill);
        this.resetForm();
        this.changeCreateForm(false);
      }
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
    resetForm() {
      this.name = '';
      this.currency = '',
      this.start = ''
    }
  },
  async mounted() {
    this.getCurrencyData();
  }
}
</script>

<style lang="scss" scoped></style>
