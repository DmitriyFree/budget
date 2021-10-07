<template>
  <div class="create-form">
    <form @submit.prevent="formHandler">
      <div class="title">Добавить Валюту</div>
      <div class="row">
        <label>Title</label>
        <input type="text" required v-model="title">
      </div>
      <div class="row">
        <label>Short</label>
        <input type="text" required v-model="short">
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
      short: ''
    }
  },
  methods: {
    ...mapActions(['addCurrency']),
    async formHandler() {
      if (this.title && this.short) {
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