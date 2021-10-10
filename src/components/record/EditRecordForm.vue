<template>
  <div class="edit-form">
    <form @submit.prevent="formHandler">
      <div class="row">
        <label>Счет</label>
        <select v-model="bill">
          <option v-for="bill in getAllBills" :key="bill.id">{{bill.name}}</option>
        </select>
      </div>
      <!-- <div class="row">
        <label>Категория</label>
        <select v-model="category">
          <option v-for="item in incomeCategories" :key="item.id">{{item.name}}</option>
        </select>
      </div> -->
      <div class="row">
        <label>Сумма</label>
        <input type="text" required v-model="sum">
      </div>
      <div class="row">
        <label>Описание</label>
        <input type="text" v-model="description">
      </div>
      <button type="submit" class="row btn">
        Изменить
      </button>
     </form>

  </div>
</template>
<script>
import {mapMutations, mapGetters, mapActions} from 'vuex';
export default {
  name: 'EditRecordForm',
  computed: mapGetters(['getAllBills', 'getFormData']),
  data() {
    return {
      id: 0,
      bill: '',
      type: '',
      category: '',
      date: '',
      sum: 0,
      description: ''
    }
  },
  methods: {
    ...mapMutations(['changeModalActive']),
    ...mapActions(['getBills', 'putRecordById']),
    formHandler() {
      if (!this.id || !this.bill || !this.type || !this.category || !this.date || !this.sum) return
      const data = {
        id: this.id,
        record: {
          bill: this.bill,
          type: this.type,
          category: this.category,
          date: this.date,
          sum: this.sum,
          description: this.description
        }
      }
      this.putRecordById(data);
      this.changeModalActive(false);
    }
  },
  watch: {
    getFormData() {
      this.id = this.getFormData.id;
      this.bill = this.getFormData.bill;
      this.type = this.getFormData.type;
      this.category = this.getFormData.category;
      this.date = this.getFormData.date;
      this.sum = this.getFormData.sum;
      this.description = this.getFormData.description;
    }
  },
  async mounted() {
    this.getBills();
   }
}
</script>