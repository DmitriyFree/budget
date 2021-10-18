<template>
  <div>
    <div class="main-currency">
      <div class="main-currency__title">Основная валюта {{getMainCurrency.title}} ({{getMainCurrency.short}})</div>
      <div class="main-currency__btn" @click="formActive = !formActive">
        <span>Изменить</span>
        <img v-bind:class="{active: !formActive}" src="@/assets/images/triangle.svg" alt="">
      </div>
    </div>
    <form class="" @submit.prevent="formHandler" v-bind:class="{done: formActive}">
      <div class="row">
        <div class="label">
          <label>Выберете валюту</label>
          <span class="error show"></span>
        </div>
        <select v-model="currency">
        <option v-for="item of getAllCurrencies" :key="item.id" :value="item">{{item.title}}</option>
      </select>
      </div>
      <button type="submit" class="row btn">
        ПОДТВЕРДИТЬ
      </button>

    </form>
  </div>
</template>
<script>
import {mapActions, mapGetters} from 'vuex'
export default {
  name: 'MainCurrencyHandler',
  computed: {
    ...mapGetters(['getMainCurrency', 'getAllCurrencies'])
  },
  data() {
    return {
      currency: null,
      formActive: false
    }
  },
  methods: {
    ...mapActions(['resetMainCurrency', 'putCurrencyById']),
    formHandler() {
      this.resetMainCurrency();
      const data = {
        id: this.currency.id,
        currency: {
          title: this.currency.title,
          short: this.currency.short,
          main: true,
          rate: this.currency.rate
        }

      }
      this.putCurrencyById(data);

    }
  },
  async mounted() {
    this.currency = await this.getMainCurrency;
  }
}
</script>
<style lang="scss" scoped>
  .main-currency {
    margin-top: 10px;
    &__title {
      font-weight: 700;
      line-height: 30px;
    }
    &__btn {
      display: flex;
      line-height: 20px;
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      background: #11aaf3;
      padding: 8px 20px;
      max-width: 140px;
      margin-bottom: 15px;
      & img {
        margin-left: 10px;
      }
    }

  }
  form.done {
      display: none;
  }
  .main-currency__btn img.active {
    transform: rotate(90deg);
  }
</style>