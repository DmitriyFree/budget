<template>
  <div>
    <form class="bill-form" @submit.prevent="formHandler">
      <div class="bill-form__title">Новый Счет</div>
      <input class="bill-form__name form-row" type="text" name="name" v-model="name" placeholder="Название">
      <div class="bill-form__type">
        <div class="title">Валюта</div>
        <select v-model="currency">
          <option v-for="item in getAllCurrencies" :key="item.id" >{{item.short}}</option>
        </select>
      </div>
      <input class="bill-form__name form-row" type="text" name="name" v-model="start" placeholder="Начальный баланс">
      <button class="bill-form__btn form-row" type="submit">ДОБАВИТЬ</button>
    </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
  name: 'CreateBillForm',
  data() {
    return {
      name: '',
      currency: '',
      start: ''
    }
  },
  computed: mapGetters(['getAllCurrencies']),
  methods: {
    ...mapActions(['getCurrencyData', 'addBill']),
    formHandler() {
      if (this.name && this.currency && this.start) {
        const newBill = {
          name: this.name,
          currency: this.currency,
          startBalance: this.start,
          records: []
        }

        this.addBill(newBill);
        this.resetForm();
      }
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

<style lang="scss" scoped>
  .bill-form {
    border-bottom: 1px solid #aaa;
    padding: 10px 0 20px;
    &__title {
      font-size: 18px;
      font-weight: 700;
    }
    &__name {
      height: 30px;
    }
    &__type {
      display: flex;
      margin-top: 10px;
      .title {
        font-weight: 700;
        line-height: 30px;
      }
      select {
        display: block;
        outline: none;
        padding: 5px 10px;
        margin-left: 10px;
      }
    }
    &__btn {
      font-weight: 700;
      color: #000;
      background: #00aacc80;
      padding: 10px 25px;
      border: none;
      cursor: pointer;
    }
  }
  .form-row {
    margin-top: 10px;
    display: block;
    outline: none;
  }
</style>
