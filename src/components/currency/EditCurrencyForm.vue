<template>
  <div class="edit-form">
     <form @submit.prevent="formHandler">
      <div class="row">
        <label>Title</label>
        <input type="text" required v-model="title">
        <!-- v-bind:value="currency.title" -->
      </div>
      <div class="row">
        <label>Short</label>
        <input type="text" required v-model="short">
      </div>
      <button type="submit" class="row btn">
        Изменить
        <!-- <div class="inner"></div>
        <button type="submit">login</button> -->
      </button>
     </form>
  </div>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from 'vuex'
export default {
  name: "EditCurrencyForm",
  props: ['currency'],
  computed: mapGetters(['getCurrencyById']),
  data() {
    return {
      id: 1,
      title: '',
      short: ''
    }
  },
  methods: {
    ...mapActions(['putCurrencyById']),
    ...mapMutations(['changeModalActive']),
    async formHandler() {
      if (!this.id || !this.title || !this.short) return
      const data = {
        id: this.id,
        currency: {
          title: this.title,
          short: this.short
        }

      }
      await this.putCurrencyById(data);
      this.changeModalActive(false);
    }
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
<style lang="scss" scoped>
  .edit-form {
    padding: 25px 20px;
    box-shadow: 0 0 8px rgba(0,0,0,0.1);
  }

</style>