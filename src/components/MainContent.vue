<template>
  <div class="inner">
    <div class="inner__left">
      <div class="menu" @click="menuListener">
        <div class="menu__item" data-id="bill">Счет</div>
        <div class="menu__item" data-id="plus">Новый доход</div>
        <div class="menu__item" data-id="minus">Новый расход</div>
        <div class="menu__item" data-id="kat">Категории</div>
      </div>
    </div>
    <div class="inner__right">
      <div class="content">
        {{menuId}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MainContent',
  data() {
    return {
      menuId: 'bill'
    }
  },
  methods: {
    menuListener(e) {
      const target = e.target;
      const items = document.querySelectorAll('.menu__item')
      if (target.classList.contains('menu__item')) {
        items.forEach(item => {
          item.classList.remove('active');
        });
        target.classList.add('active');
        this.menuId = target.dataset.id;
      }
    }
  }
}
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
      transition: .7s;
      &:hover {
        background: #00aacc40;
      }
      &.active {
        background: #00aacc80;
      }
    }
  }
  .content {
    color: #000;
  }
</style>