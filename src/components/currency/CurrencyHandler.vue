<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Валюты</div>
      <create-button class="btn" @clickButton="createForm"></create-button>
    </div>
    <div class="handler__content">
      <div class="handler__content-form" v-bind:class="{done: !btnActive}">
      <create-modal v-show="isCreateForm">
        <create-currency-form/>
      </create-modal>
      </div>
      <currency-list/>
    </div>
    <modal v-show="isPopupForm">
      <edit-currency-form />
    </modal>
  </div>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import CreateCurrencyForm from './CreateCurrencyForm.vue'
import CurrencyList from './CurrencyList.vue'
import MainCurrencyHandler from '../balance/MainCurrencyHandler.vue'
import CreateModal from '../modal/CreateModal.vue'
import EditCurrencyForm from './EditCurrencyForm.vue'
export default {
  components: { CreateCurrencyForm, CurrencyList, MainCurrencyHandler, CreateModal, EditCurrencyForm },
  name: 'CurrencyHandler',
  computed: {
    ...mapGetters(['isCreateForm', 'isPopupForm', 'getSelectedCurrency'])
  },
  data() {
    return {
      btnActive: false
    }
  },
  methods: {
    ...mapMutations(['changeCreateForm']),
    createForm(){
      this.changeCreateForm(true);
    },
  },
}
</script>

<style lang="scss" scoped></style>