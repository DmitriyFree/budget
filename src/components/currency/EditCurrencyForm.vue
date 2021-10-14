<template>
  <div class="edit-form">
     <form @submit.prevent="formHandler">
      <div class="row">
        <div class="label">
          <label>Название</label>
          <span class="error show">{{titleError}}</span>
        </div>
        <input type="text" required v-model="title" @input="resetTitleError">
      </div>
      <div class="row">
        <div class="label">
          <label>Название</label>
          <span class="error show">{{shortError}}</span>
        </div>
        <input type="text" required v-model="short" @input="resetShortError">
      </div>
      <button type="submit" class="row btn">
        Изменить
      </button>
     </form>
  </div>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: "EditCurrencyForm",
  props: ['currency'],
  data() {
    return {
      id: 1,
      title: '',
      short: '',
      titleError: '',
      shortError: ''
    }
  },
  methods: {
    ...mapActions(['putCurrencyById']),
    ...mapMutations(['changeModalActive']),
    async formHandler() {
      if (!this.checkFormData()) return
      const data = {
        id: this.id,
        currency: {
          title: this.title,
          short: this.short
        }

      }
      await this.putCurrencyById(data);
      this.changeModalActive(false);
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
  },
  watch: {
    currency() {
      this.id = this.currency.id;
      this.title = this.currency.title;
      this.short = this.currency.short;
  }
},
};
</script>
<style lang="scss" scoped></style>