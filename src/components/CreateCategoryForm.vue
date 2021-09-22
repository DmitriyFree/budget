<template>
  <div>
    <form class="category-form" @submit.prevent="formHandler">
      <div class="category-form__title">Создать</div>
      <input class="category-form__name form-row" type="text" name="name" v-model="name">
      <select class="category-form__type form-row" v-model="type">
        <option selected value="Доход">Доход</option>
        <option value="Расход">Расход</option>
      </select>
      <button class="category-form__btn form-row" type="submit">ДОБАВИТЬ</button>
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

<style lang="scss" scoped>
  .category-form {
    border-bottom: 1px solid #aaa;
    padding: 10px 0 20px;
    &__title {
      font-size: 18px;
      font-weight: 700;
    }
    &__name {
      height: 30px;
    }
    &__type {
      padding: 5px;
    }
    &__btn {
      font-weight: 700;
      color: #000;
      background: #00aacc80;
      padding: 10px 25px;
      border: none;
      cursor: pointer;
    }
  }
  .form-row {
    margin-top: 10px;
    display: block;
    outline: none;
  }
</style>