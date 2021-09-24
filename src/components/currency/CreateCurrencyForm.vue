<template>
  <div>
    <form class="currency-form" @submit.prevent="formHandler">
      <div class="currency-form__title">Добавить Валюту</div>
      <input class="currency-form__name form-row" type="text" name="title" v-model="title">
      <input class="currency-form__short form-row" type="text" name="short" v-model="short">
      <button class="currency-form__btn form-row" type="submit">ДОБАВИТЬ</button>
    </form>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: 'CreateCurrencyForm',
  data() {
    return {
      title: '',
      short: ''
    }
  },
  methods: {
    ...mapActions(['addCurrency']),
    async formHandler() {
      if (this.title && this.short) {
        const data = {
          title: this.title,
          short: this.short
        }
        await this.addCurrency(JSON.stringify(data));
        this.resetForm();
      } else {
        console.log('Enter data');
      }

    },
    resetForm() {
      this.title= '';
      this.short = '';
    }
  }
}
</script>

<style lang="scss" scoped>
  .currency-form {
    border-bottom: 1px solid #aaa;
    padding: 10px 0 20px;
    &__title {
      font-size: 18px;
      font-weight: 700;
    }
    &__name {
      height: 30px;
    }
    &__short {
      height: 30px;
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