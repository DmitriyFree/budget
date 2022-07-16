import {required, decimal} from '@vuelidate/validators'
export default {
  data() {
    return {
      firstBillError: '',
      secondBillError: '',
      firstSumError: '',
      secondSumError: '',
      rateError: '',
      dateError: '',
      descriptionError: ''
    }
  },
  validations: {
    firstBill: {required},
    secondBill: {required},
    firstSum: {required, decimal},
    secondSum: {required, decimal},
    rate: {required, decimal},
    date: {required}
  },
  methods: {
    secondSumHandler(e) {
      if (this.secondSumTimer) clearTimeout(this.secondSumTimer)
      this.resetSecondSumError()
      this.secondSumTimer = setTimeout(() => {
        const value = e.target.value
        this.secondSum = value
        if (isNaN(this.secondSum)) this.secondSumError = 'Только число'
        else if (this.secondSum <= 0) this.secondSumError = 'Введите число больше нуля'
        else this.rate = (this.secondSum / this.firstSum).toFixed(6)
      }, 1000);

    },
    checkFormData() {
      if (!this.v$.firstBill.$dirty && !this.v$.firstBill.required.$invalid) this.firstBillError = 'Выберете счет'
      else this.firstBillError = ''

      if (!this.v$.secondBill.$dirty && !this.v$.secondBill.required.$invalid) this.secondBillError = 'Выберете счет'
      else this.secondBillError = ''

      if (this.firstBill.name == this.secondBill.name) {
        this.secondBillError = 'Счета совпадают'
      }

      if (!this.v$.date.$dirty && !this.v$.date.required) this.dateError = 'нет значения'
      else this.dateError = ''

      if(this.firstSumError || this.secondSumError || this.rateError || this.dateError) return false
      return true;
    },

    resetFirstBillError() {
      this.firstBillError = ''
    },
    resetSecondBillError() {
      this.secondBillError = ''
    },
    resetFirstSumError() {
      this.firstSumError = ''
    },
    resetSecondSumError() {
      this.secondSumError = ''
    },
    resetRateError() {
      this.rateError = ''
    },
    resteDateError() {
      this.dateError = ''
    },

    resetForm() {
      this.firstBill = ''
      this.secondBill= ''
      this.firstSum = 0
      this.secondSum = 0
      this.rate = 1
      this.date = this.getCurrentData()
    },
  },
  watch: {
    firstSum() {
      if (this.firstSumTimer) clearTimeout(this.firstSumTimer);
      this.resetFirstSumError()
      this.firstSumTimer = setTimeout(() => {
        if (isNaN(this.firstSum)) this.firstSumError = 'Только число'
        else if (this.firstSum <= 0) this.firstSumError = 'Введите число больше нуля'
        else {
          if (this.isAvailableRate) this.secondSum = (this.firstSum * this.rate).toFixed(2);
        }

      }, 1000);
    },
    rate() {

      if (this.rateTimer) clearTimeout(this.rateTimer);
      this.resetRateError()
      this.rateTimer = setTimeout(() => {
        if (isNaN(this.rate)) this.rateError = 'Только число'
        else if (this.rate <= 0) this.rateError = 'Введите число больше нуля'
        else this.secondSum = (this.firstSum * this.rate).toFixed(2)
      }, 1000);


    }
  },
}