<template>
  <div class="create-form">
    <form @submit.prevent="formHandler">
      <div class="title">Добавить Категорию</div>
      <div class="row">
        <label>Название</label>
        <input type="text" required v-model="name">
      </div>
       <div class="row">
        <label>Валюта</label>
        <select class="category-form__type form-row" v-model="type">
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
import {mapActions} from 'vuex';
export default {
  name: 'CreateCategoryForm',
  data() {
    return {
      name: '',
      type: ''
    }
  },
  methods: {
    ...mapActions(['addCategory']),
    formHandler() {
      if (this.name && this.type) {
        const newCategory = {
          name: this.name,
          type: this.type
        }
        this.addCategory(JSON.stringify(newCategory));
        this.resetForm();
      }
    },
    resetForm() {
      this.name = '';
      this.type = '';
    }
  }
}
</script>

<style lang="scss" scoped></style>