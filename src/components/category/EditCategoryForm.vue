<template>
  <div class="edit-form">
     <form @submit.prevent="formHandler">
      <div class="row">
        <div class="label">
          <label>Название</label>
          <span class="error">{{nameError}}</span>
        </div>
        <input type="text" required v-model="candidate.name" @input="resetNameError">
      </div>
       <div class="row">
        <div class="label">
          <label>Тип</label>
          <span class="error">{{typeError}}</span>
        </div>
        <select v-model="candidate.type" required @input="resetTypeError">
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
import {mapGetters, mapMutations, mapActions} from 'vuex'
import categoryMixin from '@/mixins/validator/category.mixin'
export default {
  name: 'EditCategoryForm',
  mixins: [categoryMixin],
  computed: {
    ...mapGetters(['getSelectedCategory'])
  },
  data() {
    return {
      candidate: {
        id: 0,
        name: '',
        type: '',
      },
    }
  },
  methods: {
    ...mapActions(['putCategoryById']),
    ...mapMutations(['changePopupForm']),
    async formHandler() {
      if (!this.checkFormData()) return
      const data = {
        id: this.candidate.id,
        category: {
          name: this.candidate.name,
          type: this.candidate.type
        }
      }
      await this.putCategoryById(data)
      this.changePopupForm(false)
    }
  },
  watch: {
    getSelectedCategory() {
      this.candidate = {...this.getSelectedCategory}
    }
  }
}
</script>
<style lang="scss" scoped></style>