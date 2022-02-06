<template>
  <div class="handler">
    <div class="handler__header">
      <div class="title">Валюты</div>
      <!-- <div class="btn" @click="btnActive = !btnActive" v-bind:class="{active: btnActive}"> -->
        <div class="btn" @click="createForm">
      </div>
    </div>
    <div class="handler__content">
      <div class="handler__content-form" v-bind:class="{done: !btnActive}">
        <!-- <create-currency-form/> -->
        <!-- <modal v-show="isPopupForm">
          <create-currency-form/>
        </modal> -->
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

<style lang="scss" scoped>
  .currency-handler {
    padding: 10px 20px;
    &__header {
      padding: 10px 0;
      border-bottom: 1px solid #aaa;
      &-title {
        font-size: 20px;
        font-weight: 700;
      }
    }
  }
  .main-currency {
    display: flex;
    align-items: center;
    margin-top: 10px;
    &__title {
      font-weight: 700;
      line-height: 30px;
    }
    &__btn {
      display: inline-block;
      margin-left: 10px;
      line-height: 14px;
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      background: #11aaf3;;
      padding: 8px 20px;
      border: none;
      cursor: pointer;
      max-width: 200px;
      overflow: hidden;
    }

  }
</style>