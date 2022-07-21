<template>
  <div>
    <div class="main-currency">
      <div class="main-currency__title">В качестве основной валюты выбран {{mainCurrency.symbol}}</div>
      <div class="main-currency__btn" @click="formActive = !formActive">
        <span>{{buttonText}}</span>
        <img
          :class="{active: formActive}"
          src="@/assets/images/triangle.svg"
          alt="">
      </div>
    </div>
    <form @submit.prevent="formHandler" v-bind:class="{done: !formActive}">
      <div class="row">
        <div class="label">
          <label>Выберете валюту</label>
          <span class="error show"></span>
        </div>
        <select v-model="selectedOption">
          <option
            v-for="item of getAllCurrencies"
            :key="item.id"
            :value="item">
            {{item.title}}
          </option>
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
    ...mapGetters(['getAllCurrencies']),
    buttonText() {
      if (this.formActive) return 'Скрыть'
      else return 'Изменить'
    }
  },
  data() {
    return {
      mainCurrency: {
        symbol: 'USD'
      },
      selectedOption: {},
      formActive: false
    }
  },
  methods: {
    ...mapActions(['putCurrencyById']),
    formHandler() {
      this.mainCurrency = this.selectedOption;
      this.$emit('changeCurrency', this.mainCurrency.symbol);
      this.formActive = false;
    }
  },
}
</script>
<style lang="scss" scoped>
  .main-currency {
    margin-top: 20px;
    &__title {
      font-weight: 700;
      line-height: 30px;
    }
    &__btn {
      display: flex;
      margin-top: 10px;
      line-height: 20px;
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      background: #1e5f7e;
      padding: 8px 15px 8px 20px;
      max-width: 140px;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      cursor: pointer;
      & span {
        display: inline-block;
      }
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