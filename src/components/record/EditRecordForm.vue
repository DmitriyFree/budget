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
      <!-- <div class="row">
        <label>Категория</label>
        <select v-model="category">
          <option v-for="item in incomeCategories" :key="item.id">{{item.name}}</option>
        </select>
      </div> -->
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
  computed: mapGetters(['getAllBills', 'getFormData']),
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
    ...mapActions(['getBills', 'putRecordById']),
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