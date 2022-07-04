import {required, minLength, maxLength, decimal} from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      titleError: '',
      symbolError: '',
      rateError: '',
      refreshError: '',
    }
  },
  validations: {
    candidate: {
      title: {required, minLength: minLength(3), maxLength: maxLength(30)},
      symbol: {required},
      price: {decimal}
    }
  },
  methods: {
    selectCurrencyHandler (e) {
      this.resetSymbolError()
      const value = e.target.value
      const selectedObj = this.getAvailableCurrenceis.find((item) => item.symbol === value)
      this.candidate.title = selectedObj.name
      this.resetRefreshError()
      if (this.isCurrencyCode(value)) this.symbolError = 'валюта уже существует'
    },
    checkFormData() {
      if (!this.$v.candidate.title.$dirty && !this.$v.candidate.title.required) this.titleError = 'нет значения'
      else if (!this.$v.candidate.title.$dirty && !this.$v.candidate.title.minLength)  this.titleError = 'минимум 3 символа'
      else if (!this.$v.candidate.title.$dirty && !this.$v.candidate.title.maxLength) this.titleError = 'максимум 30 символа'
      else this.titleError = ''

      if (!this.$v.candidate.symbol.$dirty && !this.$v.candidate.symbol.required) this.symbolError = 'нет значения'
      else this.symbolError = ''

      if (!this.$v.candidate.price.$dirty && !this.$v.candidate.price.decimal) this.rateError = 'только число'
      else this.rateError = ''

      if(this.titleError || this.symbolError || this.rateError) return false
      return true

    },
    resetTitleError() {
      this.titleError = ''
    },
    resetSymbolError() {
      this.symbolError = ''
    },
    resetRateError() {
      this.rateError = ''
    },
    resetRefreshError(){
      this.refreshError = ''
    },
    resetForm() {
      this.candidate.title= ''
      this.candidate.symbol = ''
      this.candidate.price = 1
    }
  }
}