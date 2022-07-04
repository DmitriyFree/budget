<template>
  <div class="create-form">
    <form @submit.prevent="formHandler">
      <div class="title">Добавить Категорию</div>
      <div class="row">
        <div class="label">
          <label>Название</label>
          <span class="error">{{nameError}}</span>
        </div>
        <input type="text" required v-model.trim="candidate.name" @input="resetNameError">
      </div>
       <div class="row">
        <div class="label">
          <label>Тип</label>
          <span class="error">{{typeError}}</span>
        </div>
        <select class="category-form__type form-row" required v-model.trim="candidate.type" @input="resetTypeError">
          <option selected value="Доход">Доход</option>
          <option value="Расход">Расход</option>
        </select>
      </div>
      <button type="submit" class="row btn">
        ДОБАВИТЬ
      </button>
     </form>
  </div>
</template>

<script>
import {mapActions, mapMutations} from 'vuex'
import categoryMixin from '@/mixins/validator/category.mixin'
export default {
  name: 'CreateCategoryForm',
  mixins: [categoryMixin],
  data() {
    return {
      candidate: {
        name: '',
        type: ''
      },
    }
  },
  methods: {
    ...mapActions(['addCategory']),
    ...mapMutations(['changeCreateForm']),
    formHandler() {
      if (this.checkFormData()) {
        console.log()
        this.addCategory(JSON.stringify(this.candidate))
        this.resetForm()
        this.changeCreateForm(false)
      }
    },
  }
}
</script>

<style lang="scss" scoped></style>