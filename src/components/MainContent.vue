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
  </div>
</template>

<script>
import BalanceHandler from "./balance/BalanceHandler.vue";
import BillHandler from './bills/BillHandler.vue';
import CategoryHandler from "./category/CategoryHandler.vue";
import CurrencyHandler from './currency/CurrencyHandler.vue';
import RecordHandler from './record/RecordHandler.vue';
export default {
  components: { CategoryHandler, BalanceHandler, CurrencyHandler, RecordHandler, BillHandler },
  name: "MainContent",
  data() {
    return {
      menuId: "balance",
    };
  },
  methods: {
    menuListener(e) {
      const target = e.target;
      const items = document.querySelectorAll(".menu__item");
      if (target.classList.contains("menu__item")) {
        items.forEach((item) => {
          item.classList.remove("active");
        });
        target.classList.add("active");
        this.menuId = target.dataset.id;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.inner {
  width: 100%;
  height: 100vh;
  display: flex;
  &__left {
    width: 200px;
    height: 100%;
    border-right: 1px solid #aaa;
    // background: #22222240;
  }
  &__right {
    width: 100%;
    height: 100%;
  }
}
.menu {
  &__item {
    padding: 10px 25px;
    cursor: pointer;
    transition: 0.7s;
    &:hover {
      // background: #00aacc40;
      background: #11aaf340;
    }
    &.active {
      // background: #00aacc80;
      background: #11aaf380;
    }
  }
}
.content {
  color: #000;
}
</style>