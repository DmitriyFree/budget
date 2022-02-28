<template>
  <div class="edit-form">
     <form @submit.prevent="formHandler">
      <div class="row">
        <div class="label">
          <label>Название</label>
          <span class="error">{{nameError}}</span>
        </div>
        <input type="text" required v-model="name" @input="resetNameError">
      </div>
       <div class="row">
        <div class="label">
          <label>Тип</label>
          <span class="error">{{typeError}}</span>
        </div>
        <select v-model="type" required @input="resetTypeError">
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
import {mapMutations, mapActions} from 'vuex';
export default {
  name: 'EditCategoryForm',
  props: ['category'],
  data() {
    return {
      id: 0,
      name: '',
      type: '',
      nameError: '',
      typeError: ''
    }
  },
  methods: {
    ...mapActions(['putCategoryById']),
    ...mapMutations(['changePopupForm']),
    async formHandler() {
      if (!this.checkFormData()) return
      const data = {
        id: this.id,
        category: {
          name: this.name,
          type: this.type
        }
      }
      await this.putCategoryById(data);
      this.changePopupForm(false);

    },
    checkFormData() {
      if (!this.name) return false;
      if (this.name.length < 3) this.nameError = 'минимум 3 символа';
      if (this.name.length > 20) this.nameError = 'максимум 20 символов';
      if (!this.type) this.typeError = 'выбирете тип';

      if(this.nameError || this.typeError) return false;
      return true;

    },
    resetNameError() {
      this.nameError = '';
    },
    resetTypeError() {
      this.typeError = '';
    },
  },
  watch: {
    category() {
      // console.log(this.category);
      this.id = this.category.id;
      this.name = this.category.name;
      this.type = this.category.type;
    }
  }
}
</script>
<style lang="scss" scoped></style>