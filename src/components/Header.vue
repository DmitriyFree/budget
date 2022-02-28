<template>
  <div class="header">
    <div class="header__btn">
      <div></div>
      <div></div>
      <div></div>
    </div>
    <div class="header__title">Budget</div>
    <div class="header__date">{{ getDate }}</div>
  </div>
</template>
<script>
export default {
  name: "Header",
  computed: {
    getDate() {
      let date = new Date();
      return `${date.getDate()} ${this.convertMonth(
        date.getMonth()
      )} ${date.getFullYear()}`;
    },
  },
  methods: {
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
.header {
  background: #11aaf3;
  padding: 10px 25px;
  display: flex;
  align-items: center;
  &__btn {
    cursor: pointer;
    div {
      width: 20px;
      height: 2px;
      background: #000;
      margin: 5px 0;
    }
  }
  &__title {
    font-size: 14px;
    line-height: 26px;
    color: #000;
    margin-left: 20px;
  }
  &__date {
    font-size: 14px;
    line-height: 26px;
    color: #000;
    margin-left: 20px;
  }
}
</style>