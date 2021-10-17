<template>
  <div class="create-form">
    <form @submit.prevent="formHandler">
      <div class="title">Добавить Валюту</div>
      <div class="row">
        <div class="label">
          <label>Название</label>
          <span class="error show">{{titleError}}</span>
        </div>
        <input type="text" required v-model="title" @input="resetTitleError">
      </div>
      <div class="row">
        <div class="label">
          <label>Код</label>
          <span class="error show">{{shortError}}</span>
        </div>
        <input type="text" required v-model="short" @input="resetShortError">
      </div>
      <div class="row checkbox">
        <div class="label">
          <label>Зделать основной?</label>
          <span class="error show"></span>
        </div>
        <input type="checkbox" v-model="main">
      </div>
      <div class="row">
        <div class="label">
          <label>Курс к {{getMainCurrency.short}}</label>
          <span class="error show"></span>
        </div>
        <input type="text" required v-model="rate">
      </div>
      <button type="submit" class="row btn" @input="resetRateError">
        ДОБАВИТЬ
      </button>
     </form>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
  name: 'CreateCurrencyForm',
  computed: {
    ...mapGetters(['getMainCurrency'])
  },
  data() {
    return {
      title: '',
      short: '',
      main: false,
      rate: 1,
      titleError: '',
      shortError: '',
      rateError: ''
    }
  },
  methods: {
    ...mapActions(['addCurrency', 'resetMainCurrency']),
    ...mapGetters(['getAllCurrencies']),
    async formHandler() {
      if (this.checkFormData()) {
        if (this.main) this.resetMainCurrency();
        const data = {
          title: this.title,
          short: this.short,
          main: this.main,
          rate: this.rate

        }
        await this.addCurrency(data);
        this.resetForm();
      } else {
      }

    },
    checkFormData() {
      if (!this.title && !this.short) return false;
      this.short = this.short.toUpperCase();

      if (this.title.length < 3) this.titleError = 'минимум 3 символа';
      if (this.title.length > 20) this.titleError = 'максимум 20 символов';
      if (this.short.length != 3) this.shortError = 'длина 3 символа';
      if (this.isCurrencyCode(this.short)) this.shortError = 'не уникальный код';
      if (isNaN(this.rate)) this.rateError = 'только число';


      if(this.titleError || this.shortError || this.rateError) return false;
      return true;

    },
    isCurrencyCode(code) {
      let result = false;
      const currencies = this.getAllCurrencies();
      currencies.forEach(item => {
        if (item.short == code) result = true;
      });
      return result;

    },
    resetTitleError() {
      this.titleError = '';
    },
    resetShortError() {
      this.shortError = '';
    },
    resetRateError() {
      this.rateError = '';
    },
    resetForm() {
      this.title= '';
      this.short = '';
    }
  },
  watch: {
    main() {
      this.rate = 1;
    }
  }
}
</script>

<style lang="scss" scoped>
  .create-form {
    position: relative;
    padding: 20px 0 20px;
    border-bottom: 1px solid #aaa;
  }
  .checkbox {
    // display: flex;
    // align-items: flex-end;
    // line-height: 16px;
    // max-width: 300px;
    input {
      width: 25px;
      height: 25px;
      border: none;
    }
  }
</style>