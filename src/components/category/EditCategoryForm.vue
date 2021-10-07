<template>
  <div class="edit-form">
     <form @submit.prevent="formHandler">
      <div class="row">
        <label>Название</label>
        <input type="text" required v-model="name">
      </div>
       <div class="row">
        <label>Валюта</label>
        <select v-model="type">
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
      type: ''
    }
  },
  methods: {
    ...mapActions(['putCategoryById']),
    ...mapMutations(['changeModalActive']),
    async formHandler() {
      if (!this.id || !this.name || !this.type) return
      const data = {
        id: this.id,
        category: {
          name: this.name,
          type: this.type
        }
      }
      await this.putCategoryById(data);
      this.changeModalActive(false);

    }
  },
  watch: {
    category() {
      this.id = this.category.id;
      this.name = this.category.name;
      this.type = this.category.type;
    }
  }
}
</script>
<style lang="scss" scoped></style>