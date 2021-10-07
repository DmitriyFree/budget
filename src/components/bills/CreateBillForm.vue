<template>
  <div class="create-form">
    <form @submit.prevent="formHandler">
      <div class="title">Новый Счет</div>
      <div class="row">
        <label>Название</label>
        <input type="text" required v-model="name">
      </div>
       <div class="row">
        <label>Валюта</label>
        <select v-model="currency">
          <option v-for="item in getAllCurrencies" :key="item.id" >{{item.short}}</option>
        </select>
      </div>
      <div class="row">
        <label>Начальный баланс</label>
        <input type="text" required v-model="start">
      </div>
      <button type="submit" class="row btn">
        ДОБАВИТЬ
      </button>
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

<style lang="scss" scoped></style>
