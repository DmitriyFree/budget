<template>
  <div class="create-form">
    <form @submit.prevent="formHandler">
      <div class="title">Добавить Валюту</div>
      <div class="row">
        <div class="label">
          <label>Выберете валюту</label>
        </div>
        <select required v-model="candidate.symbol" @input="selectCurrencyHandler">
          <option  v-for="item in getAvailableCurrenceis" :key="item.symbol" :value="item.symbol">{{item.symbol}} {{item.name}}</option>
        </select>
        <!-- <input type="text" required v-model="short" @input="resetShortError"> -->
      </div>
      <div class="row">
        <div class="label">
          <label>Код</label>
          <span class="error show">{{shortError}}</span>
        </div>
        <input type="text" required disabled v-model="candidate.symbol">
      </div>
      <div class="row">
        <div class="label">
          <label>Название</label>
          <span class="error show">{{titleError}}</span>
        </div>
        <input type="text" required v-model="candidate.title" @input="resetTitleError">
      </div>
      <div class="row">
        <div class="label">
          <label>Курс к 1USD</label>
          <span class="error show"></span>
        </div>
        <input type="text" required v-model="candidate.price" :disabled="isMainCurrency">
      </div>

      <button  class="row refresh" @click.prevent="getPrice" >
        Обновить курс
      </button>

      <button type="submit" class="row btn" @input="resetRateError">
        ДОБАВИТЬ
      </button>
     </form>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
export default {
  name: 'CreateCurrencyForm',
  computed: {
    ...mapGetters(['getAvailableCurrenceis']),
    isMainCurrency() {
      if (this.candidate.symbol === 'USD') {
       this.candidate.price = 1;
       return true;
      } else false;
    },
    // selectedCurrency() {
    //   const selectedObj = this.getAvailableCurrenceis.find((item) => item.symbol === value);
    // }
  },
  data() {
    return {
      candidate: {
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
    ...mapActions(['addCurrency', 'refreshPrice']),
    ...mapGetters(['getAllCurrencies']),
    ...mapMutations(['changeCreateForm']),
    selectCurrencyHandler (e) {
      this.resetShortError();
      const value = e.target.value;
      const selectedObj = this.getAvailableCurrenceis.find((item) => item.symbol === value);
      this.candidate.title = selectedObj.name;
      if (this.isCurrencyCode(value)) this.shortError = 'валюта уже существует';
    },
    async getPrice(){
      if (this.candidate.price) {
        await this.refreshPrice();
        const selectedObj = this.getAvailableCurrenceis.find((item) => item.symbol === this.candidate.symbol);
        this.candidate.price = selectedObj.price;
      } else this.candidate.price = 1;

    },
    async formHandler() {
      if (this.checkFormData()) {
        if (this.main) this.resetMainCurrency();
        // const data = {
        //   title: this.title,
        //   short: this.short,
        //   main: this.main,
        //   rate: this.rate

        // }
        await this.addCurrency(this.candidate);
        this.resetForm();
        this.changeCreateForm(false);
      } else {
      }

    },
    checkFormData() {
      if (!this.candidate.title && !this.candidate.symbol) return false;
      this.candidate.symbol = this.candidate.symbol.toUpperCase();

      if (this.candidate.title.length < 3) this.titleError = 'минимум 3 символа';
      if (this.candidate.title.length > 20) this.titleError = 'максимум 20 символов';
      if (this.candidate.symbol.length != 3) this.shortError = 'длина 3 символа';
      if (this.isCurrencyCode(this.candidate.symbol)) this.shortError = 'валюта уже существует';
      if (isNaN(this.candidate.price)) this.rateError = 'только число';


      if(this.titleError || this.shortError || this.rateError) return false;
      return true;

    },
    isCurrencyCode(code) {
      let result = false;
      const currencies = this.getAllCurrencies();
      currencies.forEach(item => {
        if (item.symbol == code) result = true;
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
      this.candidate.title= '';
      this.candidate.symbol = '';
      this.candidate.price = 1
    }
  },
}
</script>

<style lang="scss" scoped>
.refresh {
  display: block;
  margin-right: 50px;
  padding: 5px 10px;
  color: #fff;
  background: #1e5f7e;
  margin-top: 17px;
  border: none;
  cursor: pointer;
  max-width: 200px;
  overflow: hidden;
}

</style>