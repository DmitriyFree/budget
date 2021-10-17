<template>
  <div class="edit-form">
     <form @submit.prevent="formHandler">
      <div class="row">
        <div class="label">
          <label>Название</label>
          <span class="error show">{{titleError}}</span>
        </div>
        <input type="text" required v-model="title" @input="resetTitleError">
      </div>
      <div class="row">
        <div class="label">
          <label>Название</label>
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
      <button type="submit" class="row btn">
        Изменить
      </button>
     </form>
  </div>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: "EditCurrencyForm",
  props: ['currency'],
  computed: {
    ...mapGetters(['getMainCurrency'])
  },
  data() {
    return {
      id: 1,
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
    ...mapActions(['putCurrencyById', 'resetMainCurrency']),
    ...mapMutations(['changeModalActive']),
    ...mapGetters(['getAllCurrencies']),
    async formHandler() {
      if (!this.checkFormData()) return
      const data = {
        id: this.id,
        currency: {
          title: this.title,
          short: this.short,
          main: this.main,
          rate: this.rate
        }

      }
      await this.putCurrencyById(data);
      this.changeModalActive(false);
    },
    checkFormData() {
      if (!this.title && !this.short) return false;
      if (this.main) this.resetMainCurrency();
      if (this.title.length < 3) this.titleError = 'минимум 3 символа';
      if (this.title.length > 20) this.titleError = 'максимум 20 символов';
      if (this.isCurrencyCode(this.short)) this.shortError = 'не уникальный код';
      if (this.short.length != 3) this.shortError = 'длина 3 символа';



      if(this.titleError || this.shortError) return false;
      return true;

    },
    isCurrencyCode(code) {
      if (code == this.currency.short) return false;
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
  },
  watch: {
    currency() {
      this.id = this.currency.id;
      this.title = this.currency.title;
      this.short = this.currency.short;
      this.main = this.currency.main;
      this.rate = this.currency.rate;
  }
},
};
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
  }</style>