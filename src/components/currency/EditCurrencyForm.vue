<template>
  <div class="edit-form">
     <form @submit.prevent="formHandler">
      <div class="row">
        <div class="label">
          <label>Код</label>
          <span class="error show">{{shortError}}</span>
        </div>
        <input type="text" disabled required v-model="candidate.symbol" @input="resetShortError">
      </div>
      <div class="row">
        <div class="label">
          <label>Название</label>
          <span class="error show">{{titleError}}</span>
        </div>
        <input type="text" required v-model="candidate.title" @input="resetTitleError">
      </div>
      <!-- <div class="row checkbox">
        <div class="label">
          <label>Зделать основной?</label>
          <span class="error show"></span>
        </div>
        <input type="checkbox" v-model="main">
      </div> -->
      <div class="row">
        <div class="label">
          <label>Курс к {{getMainCurrency.short}}</label>
          <span class="error show"></span>
        </div>
        <input type="text" :disabled="isMainCurrency" required v-model="candidate.price">
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
    ...mapGetters(['getMainCurrency', 'getSelectedCurrency']),
    isMainCurrency() {
      if (this.candidate.symbol === 'USD') {
       this.candidate.price = 1;
       return true;
      } else false;
    },
  },
  data() {
    return {
      candidate: {
        id: 1,
        title: '',
        symbol: '',
        price: 1
      },
      titleError: '',
      shortError: '',
      rateError: ''
    }
  },
  methods: {
    ...mapActions(['putCurrencyById', 'changeMainCurrency']),
    ...mapMutations(['changePopupForm']),
    ...mapGetters(['getAllCurrencies']),
    async formHandler() {
      if (!this.checkFormData()) return
      if (this.main) {
        await this.changeMainCurrency(this.id);
        this.rate = 1;
      }
      const data = {
        id: this.candidate.id,
        currency: {
          title: this.candidate.title,
          symbol: this.candidate.symbol,
          price: this.candidate.price,
        }

      }
      await this.putCurrencyById(data);
      this.changePopupForm(false);
    },
    checkFormData() {
      if (!this.candidate.title && !this.candidate.symbol) return false;
      if (this.candidate.title.length < 3) this.titleError = 'минимум 3 символа';
      if (this.candidate.title.length > 20) this.titleError = 'максимум 20 символов';
      if (this.isCurrencyCode(this.candidate.symbol)) this.shortError = 'не уникальный код';
      if (this.candidate.symbol.length != 3) this.shortError = 'длина 3 символа';



      if(this.titleError || this.shortError) return false;
      return true;

    },
    isCurrencyCode(code) {
      // if (code == this.currency) return false;
      let result = false;
      const currencies = this.getAllCurrencies();
      currencies.forEach(item => {
        if (item.price == code) result = true;
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
    getSelectedCurrency() {
      this.candidate = {...this.getSelectedCurrency}
  }
},
};
</script>
<style lang="scss" scoped></style>