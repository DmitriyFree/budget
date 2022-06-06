<template>
  <div class="create-form">
    <form @submit.prevent="formHandler">
      <div class="title">Добавить Категорию</div>
      <div class="row">
        <div class="label">
          <label>Название</label>
          <span class="error">{{nameError}}</span>
        </div>
        <input type="text" required v-model="candidate.name" @input="resetNameError">
      </div>
       <div class="row">
        <div class="label">
          <label>Тип</label>
          <span class="error">{{typeError}}</span>
        </div>
        <select class="category-form__type form-row" required v-model="candidate.type" @input="resetTypeError">
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
import {mapActions, mapMutations} from 'vuex';
export default {
  name: 'CreateCategoryForm',
  data() {
    return {
      candidate: {
        name: '',
        type: ''
      },
      nameError: '',
      typeError: ''
    }
  },
  methods: {
    ...mapActions(['addCategory']),
    ...mapMutations(['changeCreateForm']),
    formHandler() {
      if (this.checkFormData()) {
        this.addCategory(JSON.stringify(this.candidate));
        this.resetForm();
        this.changeCreateForm(false);
      }
    },
    checkFormData() {
      if (!this.candidate.name) return false;
      if (this.candidate.name.length < 3) this.nameError = 'минимум 3 символа';
      if (this.candidate.name.length > 20) this.nameError = 'максимум 20 символов';
      if (!this.candidate.type) this.typeError = 'выбирете тип';

      if(this.nameError || this.typeError) return false;
      return true;

    },
    resetNameError() {
      this.nameError = '';
    },
    resetTypeError() {
      this.typeError = '';
    },
    resetForm() {
      this.candidate.name = '';
      this.candidate.type = '';
    }
  }
}
</script>

<style lang="scss" scoped></style>