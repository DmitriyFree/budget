<template>
  <div class="edit-form">
     <form @submit.prevent="formHandler">
      <div class="row">
        <label>Название</label>
        <input type="text" required v-model="name">
      </div>
       <div class="row">
        <label>Валюта</label>
        <select v-model="currency">
          <option v-for="item in getAllCurrencies" :key="item.id" >{{item.short}}</option>
        </select>
      </div>
      <div class="row">
        <label>Начальный баланс</label>
        <input type="text" required v-model="startBalance">
      </div>
      <button type="submit" class="row btn">
        Изменить
      </button>
     </form>
  </div>
</template>
<script>
import {mapActions, mapMutations, mapGetters} from 'vuex'
export default {
  name: 'EditBillForm',
  props: ['bill'],
  computed: mapGetters(['getAllCurrencies']),
  data() {
    return {
      id: 1,
      name: '',
      currency: '',
      startBalance: 0
    }
  },
  methods: {
    ...mapActions(['putBillById']),
    ...mapMutations(['changeModalActive']),
    async formHandler() {
      if (!this.id || !this.name || !this.currency || this.startBalance) return
      const data = {
        id: this.id,
        bill: {
          name: this.name,
          currency: this.currency,
          startBalance: this.startBalance
        }
      }
      this.putBillById(data);
      this.changeModalActive(false);
    }
  },
  watch: {
    bill() {
      this.id = this.bill.id;
      this.name = this.bill.name;
      this.currency = this.bill.currency;
      this.startBalance = this.bill.startBalance;
  }
},
}
</script>
<style lang="scss" scoped></style>