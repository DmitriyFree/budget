import {required, minLength, maxLength} from 'vuelidate/lib/validators'
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
      if (!this.$v.candidate.name.$dirty && !this.$v.candidate.name.required) this.nameError = 'нет значения'
      else if (!this.$v.candidate.name.$dirty && !this.$v.candidate.name.minLength)  this.nameError = 'минимум 3 символа'
      else if (!this.$v.candidate.name.$dirty && !this.$v.candidate.name.maxLength) this.nameError = 'максимум 30 символа'
      else this.nameError = ''

      if (!this.$v.candidate.type.$dirty && !this.$v.candidate.type.required) this.typeError = 'нет значения'
      else this.typeError = ''

      if(this.nameError || this.typeError) return false
      return true

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