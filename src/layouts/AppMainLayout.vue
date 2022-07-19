<template>
  <app-header></app-header>
  <div class="inner">
    <div class="inner__left">
      <div class="menu">
        <div class="menu__item" :class="{active: $route.path === '/statistics'}" @click="$router.push('/statistics')">Баланс</div>
        <div class="menu__item" :class="{active: $route.path === '/records'}" @click="$router.push('/records')">Записи</div>
        <div class="menu__item" :class="{active: $route.path === '/categories'}" @click="$router.push('/categories')">Категории</div>
        <div class="menu__item" :class="{active: $route.path === '/bills'}" @click="$router.push('/bills')">Счета</div>
        <div class="menu__item" :class="{active: $route.path === '/currencies'}" @click="$router.push('/currencies')">Валюты</div>
      </div>
    </div>
    <div class="inner__right">
      <div class="content">
        <div class="content-item">
          <router-view/>
        </div>
      </div>
    </div>
    <app-loader :isShow="isLoader"></app-loader>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import MainContent from '@/components/MainContent.vue'
import {mapGetters, mapActions} from 'vuex'
export default {
  name: 'AppMainLayout',
  components: {AppHeader, MainContent},
  data() {
    return {
      menuId: "balance",
      isLoader: true
    };
  },
  computed: {
    ...mapGetters(['getAllCategories', 'getAllCurrencies', 'getAllBills', 'getAllRecords']),
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

}
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
  }
  &__right {
    position: relative;
    width: 100%;
    height: 100%;
  }
}
.menu {
  &__item {
    line-height: 28px;
    padding: 10px 25px;
    cursor: pointer;
    transition: 0.7s;
    color: #000;
    &:hover {
      background: #11aaf340;
    }
    &.active {
      background: #11aaf380;
    }
  }
}
.content {
  color: #000;

}
</style>