<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Валюты</div>
        <div class="btn" @click="createForm">
      </div>
    </div>
    <div class="handler__content">
      <div class="handler__content-form" v-bind:class="{done: !btnActive}">
      <create-modal v-show="isCreateForm">
        <create-currency-form/>
      </create-modal>
      </div>
      <currency-list/>
      <main-currency-handler/>
    </div>
  </div>
</template>

<script>
import CreateCurrencyForm from './CreateCurrencyForm.vue'
import CurrencyList from './CurrencyList.vue'
import {mapGetters, mapActions, mapMutations} from "vuex"
import MainCurrencyHandler from './MainCurrencyHandler.vue'
import CreateModal from '../modal/CreateModal.vue'
export default {
  components: { CreateCurrencyForm, CurrencyList, MainCurrencyHandler, CreateModal },
  name: 'CurrencyHandler',
  computed: {
    ...mapGetters(['getMainCurrency', 'isCreateForm'])
  },
  data() {
    return {
      btnActive: false
    }
  },
  methods: {
    ...mapActions(['getCurrencyData']),
    ...mapMutations(['changeCreateForm']),
    createForm(){
      this.changeCreateForm(true);
    }
  },
  async mounted() {
    this.getCurrencyData();
  }
}
</script>

<style lang="scss" scoped></style>