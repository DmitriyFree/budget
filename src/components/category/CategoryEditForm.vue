<template>
  <div class="edit-form">
     <form @submit.prevent="formHandler">
      <div class="row">
        <div class="label">
          <label>Название</label>
          <span class="error">{{nameError}}</span>
        </div>
        <input required
          type="text"
          v-model="candidate.name"
          @input="resetNameError">
      </div>
       <div class="row">
        <div class="label">
          <label>Тип</label>
          <span class="error">{{typeError}}</span>
        </div>
        <select required
          v-model="candidate.type"
          @input="resetTypeError">
          <option>Доход</option>
          <option>Расход</option>
        </select>
      </div>
      <button type="submit" class="row btn">
        Изменить
      </button>
     </form>
  </div>
</template>
<script>
import {mapActions} from 'vuex'
import categoryMixin from '@/mixins/validator/category.mixin'
import useVuelidate from '@vuelidate/core'
export default {
  name: 'CategoryEditForm',
  mixins: [categoryMixin],
  setup () {
    return { v$: useVuelidate() }
  },
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      candidate: {
        id: 0,
        name: '',
        type: '',
      },
    }
  },
  methods: {
    ...mapActions(['putCategoryById']),
    async formHandler() {
      if (!this.checkFormData()) return
      const data = {
        id: this.candidate.id,
        category: {
          name: this.candidate.name,
          type: this.candidate.type
        }
      }
      await this.putCategoryById(data)
      this.$emit('hideForm', true)
    }
  },
  watch: {
    category() {
      this.candidate = {...this.category}
    }
  },
  mounted() {
    this.candidate = {...this.category}
  }

}
</script>
<style lang="scss" scoped></style>