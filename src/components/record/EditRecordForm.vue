<template>
  <div class="edit-form">
    <form @submit.prevent="formHandler">
      <div class="row">
        <div class="label">
        <label>Счет</label>
          <span class="error"></span>
        </div>
        <select v-model="bill">
          <option v-for="bill in getAllBills" :key="bill.id">{{bill.name}}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">
        <label>Категория</label>
          <span class="error"></span>
        </div>
        <select v-model="category">
          <option v-for="item in getAllCategories" :key="item.id">{{item.name}}</option>
        </select>
      </div>
      <div class="row">
        <div class="label">
        <label>Сумма</label>
          <span class="error">{{sumError}}</span>
        </div>
        <input type="text" required v-model="sum" @input="resetSumError">
      </div>

      <div class="row">
        <div class="label">
        <label>Дата</label>
          <span class="error">{{dateError}}</span>
        </div>
        <input type="date" required v-model="date" @input="resetDateError">
      </div>

      <div class="row">
        <div class="label">
        <label>Описание</label>
          <span class="error">{{descriptionError}}</span>
        </div>
        <input type="text" v-model="description" @input="resetDescriptionError">
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
  props: ['record'],
  computed: mapGetters(['getAllBills', 'getAllCategories', 'getFormData']),
  data() {
    return {
      id: 0,
      bill: '',
      type: '',
      category: '',
      date: '',
      sum: 0,
      description: '',
      sumError: '',
      dateError: '',
      descriptionError: ''
    }
  },
  methods: {
    ...mapMutations(['changePopupForm']),
    ...mapActions(['getBillsData', 'putRecordById']),
    formHandler() {
      if (!this.checkFormData()) return;
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
      this.changePopupForm(false);
    },
    checkFormData() {
      if (!this.bill || !this.type || !this.category) return false;
      if (this.description.length > 20) this.descriptionError = 'максимум 20 символов';
      if (!this.date) this.dateError = 'выберите дату';
      if (isNaN(this.sum)) this.sumError = 'только число';


      if(this.sumError || this.dateError || this.descriptionError) return false;
      return true;

    },
    resetSumError() {
      this.sumError = '';
    },
    resetDateError() {
      this.dateError = '';
    },
    resetDescriptionError() {
      this.descriptionError = '';
    },
  },
  watch: {
    record() {
      this.id = this.record.id;
      this.bill = this.record.bill;
      this.type = this.record.type;
      this.category = this.record.category;
      this.date = this.record.date;
      this.sum = this.record.sum;
      this.description = this.record.description;
    }
  },
  async mounted() {
    this.getBillsData();
   }
}
</script>