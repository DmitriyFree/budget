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
      </div>
      <div class="row">
        <div class="label">
          <label>Код</label>
          <span class="error show">{{symbolError}}</span>
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
          <span class="error show">{{rateError}}</span>
        </div>
        <input type="text" required v-model="candidate.price" :disabled="isMainCurrency"  @input="resetRateError">
      </div>

      <div class="row-refresh">
         <span class="error show">{{refreshError}}</span>
        <div class="wrap">
            <button  class="btn" @click.prevent="getPrice" >
          Обновить курс
        </button>
        <img class="img" :class="{spin: isSpin}" src="@/assets/images/refresh.svg">
        </div>
      </div>

      <button type="submit" class="row btn" @input="resetRateError">
        ДОБАВИТЬ
      </button>
     </form>
  </div>
</template>

<script>
import {mapActions, mapGetters, mapMutations} from 'vuex';
import currencyMixin from '@/mixins/validator/currency.mixin'
export default {
  name: 'CreateCurrencyForm',
  mixins: [currencyMixin],
  computed: {
    ...mapGetters(['getAvailableCurrenceis']),
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
        title: '',
        symbol: '',
        price: 1
      },
      isSpin: false
    }
  },
  methods: {
    ...mapActions(['addCurrency', 'refreshPrice']),
    ...mapGetters(['getAllCurrencies']),
    ...mapMutations(['changeCreateForm']),
    async getPrice(){
      if (this.candidate.price) {
        if (!this.candidate.symbol) this.refreshError = 'валюта не выбрана'
        else {
          this.isSpin = true
          await this.refreshPrice()
          const selectedObj = this.getAvailableCurrenceis.find((item) => item.symbol === this.candidate.symbol)
          this.candidate.price = selectedObj.price
          this.isSpin = false
        }
      } else this.candidate.price = 1

    },
    async formHandler() {
      if (this.checkFormData()) {
        if (this.main) this.resetMainCurrency()
        await this.addCurrency(this.candidate)
        this.resetForm()
        this.changeCreateForm(false)
      } else {
      }

    },
    isCurrencyCode(code) {
      let result = false
      const currencies = this.getAllCurrencies()
      currencies.forEach(item => {
        if (item.symbol == code) result = true
      })
      return result

    },
  },
}
</script>

<style lang="scss" scoped>
.row-refresh .wrap .img.spin {
  animation: spin 1s linear infinite

}
  @keyframes spin {
    0% {
      transform: rotate(deg)
    }
    100% {
      transform: rotate(360deg)
    }

  }
</style>