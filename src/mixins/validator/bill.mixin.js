import { required, minLength, maxLength, integer } from '@vuelidate/validators'
export default {
  data() {
    return {
      nameError: '',
      currencyError: '',
      startBalanceError: ''
    }
  },
  validations: {
    candidate: {
      name: {required, minLength: minLength(3), maxLength: maxLength(30)},
      currency: {required},
      startBalance: {integer}
    }
  },
  methods: {
    checkFormData() {
      if (!this.v$.candidate.name.$dirty && this.v$.candidate.name.required.$invalid) this.nameError = 'нет значения'
      else if (!this.v$.candidate.name.$dirty && this.v$.candidate.name.minLength.$invalid)  this.nameError = 'минимум 3 символа'
      else if (!this.v$.candidate.name.$dirty && this.v$.candidate.name.maxLength.$invalid) this.nameError = 'максимум 30 символа'
      else this.nameError = ''

      if (!this.v$.candidate.currency.$dirty && this.v$.candidate.currency.required.$invalid) this.currencyError = 'нет значения'
      else this.currencyError = ''

      if (!this.v$.candidate.startBalance.$dirty && this.v$.candidate.startBalance.integer.$invalid) this.startBalanceError = 'только число'
      else this.startBalance = ''

      if(this.nameError || this.currencyError || this.startBalanceError) return false
      return true

    },
    resetNameError() {
      this.nameError = ''
    },
    resetCurrencyError() {
      this.currencyError = ''
    },
    resetStartBalanceError() {
      this.startBalanceError = ''
    },
    resetForm() {
      this.candidate.name = ''
      this.candidate.currency = '',
      this.candidate.startBalance = 0
    }
  }
}