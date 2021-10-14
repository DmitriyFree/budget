<template>
  <div class="create-form">
    <form @submit.prevent="formHandler">
      <div class="title">Добавить Валюту</div>
      <div class="row">
        <div class="label">
          <label>Название</label>
          <span class="error show">{{titleError}}</span>
        </div>
        <input type="text" required v-model="title" @input="resetTitleError">
      </div>
      <div class="row">
        <div class="label">
          <label>Код</label>
          <span class="error show">{{shortError}}</span>
        </div>
        <input type="text" required v-model="short" @input="resetShortError">
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
  name: 'CreateCurrencyForm',
  data() {
    return {
      title: '',
      short: '',
      titleError: '',
      shortError: ''
    }
  },
  methods: {
    ...mapActions(['addCurrency']),
    async formHandler() {
      if (this.checkFormData()) {
        const data = {
          title: this.title,
          short: this.short
        }
        await this.addCurrency(data);
        this.resetForm();
      } else {
        console.log('Enter data');
      }

    },
    checkFormData() {
      if (!this.title && !this.short) return false;
      if (this.title.length < 3) this.titleError = 'минимум 3 символа';
      if (this.title.length > 20) this.titleError = 'максимум 20 символов';
      if (this.short.length != 3) this.shortError = 'длина 3 символа';

      if(this.titleError || this.shortError) return false;
      return true;

    },
    resetTitleError() {
      this.titleError = '';
    },
    resetShortError() {
      this.shortError = '';
    },
    resetForm() {
      this.title= '';
      this.short = '';
    }
  }
}
</script>

<style lang="scss" scoped>
  .create-form {
    position: relative;
    padding: 20px 0 20px;
    border-bottom: 1px solid #aaa;
  }
</style>