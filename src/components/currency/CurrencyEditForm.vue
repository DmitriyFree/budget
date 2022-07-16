<template>
  <div class="edit-form">
     <form @submit.prevent="formHandler">
      <div class="row">
        <div class="label">
          <label>Код</label>
          <span class="error show">{{symbolError}}</span>
        </div>
        <input required
          type="text"
          v-model="candidate.symbol"
          @input="resetSymbolError">
      </div>
      <div class="row">
        <div class="label">
          <label>Название</label>
          <span class="error show">{{titleError}}</span>
        </div>
        <input required
          type="text"
          v-model="candidate.title"
          @input="resetTitleError">
      </div>
      <div class="row">
        <div class="label">
          <label>Курс к USD</label>
          <span class="error show"></span>
        </div>
        <input required
          type="text"
          :disabled="isMainCurrency"
          v-model="candidate.price">
      </div>

      <div class="row-refresh">
        <span class="error show">{{refreshError}}</span>
        <div class="wrap">
          <button  class="btn" @click.prevent="getPrice">
            Обновить курс
          </button>
        <img class="img" src="@/assets/images/refresh.svg">
        </div>
      </div>
      <button type="submit" class="row btn">
        Изменить
      </button>
     </form>
  </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
import currencyMixin from '@/mixins/validator/currency.mixin'
import useVuelidate from '@vuelidate/core'
export default {
  name: "CurrencyEditForm",
  props: {
    currency: {
      type: Object,
      required: true
    }
  },
  mixins: [currencyMixin],
    setup () {
    return { v$: useVuelidate() }
  },
  computed: {
    ...mapGetters(['getAvailableCurrenceis']),
    isMainCurrency() {
      if (this.candidate.symbol === 'USD') {
       this.candidate.price = 1
       return true
      } else false
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
    }
  },
  methods: {
    ...mapActions(['putCurrencyById', 'refreshPrice']),
    ...mapGetters(['getAllCurrencies']),
    async formHandler() {
      if (!this.checkFormData()) return
      if (this.main) {
        await this.changeMainCurrency(this.id)
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
      await this.putCurrencyById(data)
      this.$emit('hideForm', true)
    },
    async getPrice(){
      if (this.candidate.price) {
        if (!this.candidate.symbol) this.refreshError = 'валюта не выбрана'
        else {
          await this.refreshPrice()
          const selectedObj = this.getAvailableCurrenceis.find((item) => item.symbol === this.candidate.symbol)
          this.candidate.price = selectedObj.price
        }
      } else this.candidate.price = 1

    },
    isCurrencyCode(code) {
      let result = false
      const currencies = this.getAllCurrencies()
      currencies.forEach(item => {
        if (item.price == code) result = true
      });
      return result

    },
  },
  watch: {
    currency() {
      this.candidate = {...this.currency}
    }
  },
  mounted() {
    this.candidate = {...this.currency}
  }
};
</script>
<style lang="scss" scoped></style>