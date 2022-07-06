<template>
  <div class="inner">
    <div class="inner__left">
      <div class="menu" @click="menuListener">
        <div class="menu__item active" data-id="balance">Баланс</div>
        <div class="menu__item" data-id="record">Записи</div>
        <div class="menu__item" data-id="kat">Категории</div>
        <div class="menu__item" data-id="bills">Счета</div>
        <div class="menu__item" data-id="currency">Валюты</div>
      </div>
    </div>
    <div class="inner__right">
      <div class="content">
        <div class="content-item" v-show="menuId == 'balance'">
          <balance-handler/>
        </div>
        <div class="content-item" v-show="menuId == 'record'">
         <record-handler/>
        </div>
        <div class="content-item" v-show="menuId == 'kat'">
          <category-handler />
        </div>
        <div class="content-item" v-show="menuId == 'bills'">
          <bill-handler/>
        </div>
        <div class="content-item" v-show="menuId == 'currency'">
          <currency-handler/>
        </div>
      </div>
    </div>
    <loader :isShow="isLoader"/>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import BalanceHandler from "./balance/BalanceHandler.vue"
import BillHandler from './bills/BillHandler.vue'
import CategoryHandler from "./category/CategoryHandler.vue"
import CurrencyHandler from './currency/CurrencyHandler.vue'
import RecordHandler from './record/RecordHandler.vue'
export default {
  components: { CategoryHandler, BalanceHandler, CurrencyHandler, RecordHandler, BillHandler },
  name: "MainContent",
  data() {
    return {
      menuId: "balance",
      isLoader: true
    };
  },
  methods: {
    ...mapActions(['getCategoriesData','getCurrencyData', 'getBillsData', 'getRecordsData']),
    menuListener(e) {
      const target = e.target
      const items = document.querySelectorAll(".menu__item")
      if (target.classList.contains("menu__item")) {
        items.forEach((item) => {
          item.classList.remove("active")
        });
        target.classList.add("active")
        this.menuId = target.dataset.id
      }
    },
  },
  computed: {
    ...mapGetters(['getAllCategories', 'getAllCurrencies', 'getAllBills', 'getAllRecords']),
  },
  async mounted() {
    this.isLoader = true

    try {
      await this.getRecordsData()
      await this.getBillsData()
      await this.getCategoriesData()
      await this.getCurrencyData()
    } catch (error) {
      console.log(error)
    }
    finally {
      this.isLoader = false
    }




  }
};
</script>

<style lang="scss" scoped>
.inner {
  width: 100%;
  height: 100vh;
  display: flex;
  position: relative;
  &__left {
    width: 220px;
    height: 100%;
    border-right: 1px solid #aaa;
    // background: #000;
    // background: #343434;
  }
  &__right {
    position: relative;
    width: 100%;
    height: 100%;
    // .content-item {
    //   position: relative;
    // }
  }
}
.menu {
  &__item {
    line-height: 28px;
    padding: 10px 25px;
    cursor: pointer;
    transition: 0.7s;
    // color: #fff;
    color: #000;
    // background: rgba(0, 0, 0, 0.1);
    &:hover {
      // background: #00aacc40;
      background: #11aaf340;
      // background: rgba(255, 255, 255, 0.2);
      // background: rgba(0, 0, 0, 0.2);
    }
    &.active {
      // background: #00aacc80;
      background: #11aaf380;
      // background: rgba(255, 255, 255, 0.3);
      // background: #000;
    }
  }
}
.content {
  color: #000;

}
</style>