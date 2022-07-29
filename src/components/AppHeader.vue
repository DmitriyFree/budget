<template>
  <div class="header">
    <div class="header__btn">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="header__title">Budget</div>
    <div class="header__date">{{ getDate }}</div>
    <div
      class="header__logout"
      :class="{active: showLogout}"
      @click="showLogout = !showLogout">
      <img src="@/assets/images/triangle.svg" alt="">
    </div>
    <div
      class="logout-nemu"
      @click="logout"
      v-show="showLogout">
      logout
    </div>
  </div>
</template>
<script>
export default {
  name: "AppHeader",
  data() {
    return {
      showLogout: false
    }
  },
  computed: {
    getDate() {
      let date = new Date();
      return `${date.getDate()} ${this.convertMonth(
        date.getMonth()
      )} ${date.getFullYear()}`;
    },
  },
  methods: {
    logout() {
      localStorage.removeItem('id')
      this.$router.push('/login')
    },
    convertMonth(number) {
      let month = "";
      switch (number) {
        case 0: {
          month = "Января";
          break;
        }
        case 1: {
          month = "Февраля";
          break;
        }
        case 2: {
          month = "Марта";
          break;
        }
        case 3: {
          month = "Апреля";
          break;
        }
        case 4: {
          month = "Мая";
          break;
        }
        case 5: {
          month = "Июня";
          break;
        }
        case 6: {
          month = "Июля";
          break;
        }
        case 7: {
          month = "Августа";
          break;
        }
        case 8: {
          month = "Сентября";
          break;
        }
        case 9: {
          month = "Октября";
          break;
        }
        case 10: {
          month = "Ноября";
          break;
        }
        case 11: {
          month = "Декабря";
          break;
        }
        default: {
          month = "Января";
          break;
        }
      }
      return month;
    },
  },
};
</script>
<style lang="scss">
@import '@/assets/scss/variables.scss';
.header {
  background: $header_bg;
  padding: 10px 25px;
  display: flex;
  align-items: center;
  width: 100%;
  &__btn {
    cursor: pointer;
    div {
      width: 20px;
      height: 2px;
      background: $text_color;
      margin: 5px 0;
    }
  }
  &__title {
    font-size: 14px;
    line-height: 26px;
    margin-left: 20px;
  }
  &__date {
    font-size: 14px;
    line-height: 26px;
    margin-left: 20px;
  }
  &__logout {
    position: absolute;
    right: 40px;
    font-size: 14px;
    line-height: 26px;
    cursor: pointer;
    &.active {
      transform: rotate(90deg);
    }
  }
  & .logout-nemu {
    position: absolute;
    right: 0;
    top: 46px;
    padding: 8px 25px;
    cursor: pointer;
    background: $menu_active_color;
    z-index: 100;

  }
}
</style>