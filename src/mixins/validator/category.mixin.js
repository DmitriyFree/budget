import { required, minLength, maxLength } from '@vuelidate/validators'
export default {
  data() {
    return {
      nameError: '',
      typeError: ''
    }
  },
  validations: {
    candidate: {
      name: {required, minLength: minLength(3), maxLength: maxLength(30)},
      type: {required}
    }
  },
  methods: {
    checkFormData() {
      if (!this.v$.candidate.name.$dirty && this.v$.candidate.name.required.$invalid) this.nameError = 'нет значения'
      else if (!this.v$.candidate.name.$dirty && this.v$.candidate.name.minLength.$invalid)  this.nameError = 'минимум 3 символа'
      else if (!this.v$.candidate.name.$dirty && this.v$.candidate.name.maxLength.$invalid) this.nameError = 'максимум 30 символа'
      else this.nameError = ''

      if (!this.v$.candidate.type.$dirty && this.v$.candidate.type.required.$invalid) this.typeError = 'нет значения'
      else this.typeError = ''

      if(this.nameError || this.typeError) return false
      else return true

    },
    resetNameError() {
      this.nameError = ''
    },
    resetTypeError() {
      this.typeError = ''
    },
    resetForm() {
      this.candidate.name = ''
      this.candidate.type = ''
    }
  }
}