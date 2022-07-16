import {required, decimal} from '@vuelidate/validators'
export default {
  data() {
    return {
      billError: '',
      categoryError: '',
      sumError: '',
      dateError: '',
      descriptionError: ''
    }
  },
  validations: {
    candidate: {
      bill: {required},
      category: {required},
      sum: {required, decimal},
      // date: {required}
    }
  },
  methods: {
    checkFormData() {
      if (!this.v$.candidate.bill.$dirty && this.v$.candidate.bill.required.$invalid) this.billError = 'нет значения'
      else this.billError = ''

      if (!this.v$.candidate.category.$dirty && this.v$.candidate.category.required.$invalid) this.categoryError = 'нет значения'
      else this.categoryError = ''

      if (!this.v$.candidate.sum.$dirty && this.v$.candidate.sum.required.$invalid) this.sumError = 'нет значения'
      if (!this.v$.candidate.sum.$dirty && this.v$.candidate.sum.decimal.$invalid) this.sumError = 'только число'
      else this.sumError = ''

      // if (!this.v$.candidate.date.$dirty && this.v$.candidate.date.required) this.dateError = 'нет значения'
      // else this.dateError = ''

      if(this.billError || this.categoryError || this.sumError || this.dateError) return false
      return true;
    },
    resetSumError() {
      this.sumError = ''
    },
    resetDateError() {
      this.dateError = ''
    },
    resetDescriptionError() {
      this.descriptionError = ''
    },
    resetForm() {
      this.candidate.bill = ''
      this.candidate.category = ''
      this.candidate.sum = ''
      this.candidate.category = ''
    },
  }
}