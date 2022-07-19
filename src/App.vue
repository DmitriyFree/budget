<template>
  <div>
    <component :is="layout">
    </component>
  </div>
</template>

<script>
import AppMainLayout from '@/layouts/AppMainLayout.vue'
import AppLoginLayout from '@/layouts/AppLoginLayout.vue'
export default {
  components: {
    AppMainLayout,
    AppLoginLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'app-main-layout')
    }
  }
}
</script>

<style lang="scss">

$button_bg: #1e5f7e;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
input {
  outline: none;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
  .handler {
    padding: 0 20px;
    &__header {
      margin-top: 30px;
      padding: 5px 0;
      display: flex;
      .title {
        font-size: 24px;
        line-height: 30px;
        font-weight: 700;
      }
      .btn {
        margin-left: 20px;
        transform: translateY(3px);
      }
    }
    &__content-form {
      overflow: hidden;
      &.done {
        height: 0;
      }
    }
  }
.list-header {
  padding-top: 10px;
    &__title {
      font-size: 18px;
      font-weight: 700;
      padding: 20px 0 10px;
    }
    &-list {
      list-style: none;
    }
  }
table {
    border-collapse: collapse;
  }
  thead {

    tr th {
      padding:  10px 15px;
      text-align: start;
    }
  }
  tbody {
    tr td {
      padding: 10px 15px;
    }
  }
  td, th {
    border-bottom: 1px solid rgba(35, 35, 35, 0.5);
    line-height: 28px;
  }
  .td-btn {
    display: flex;
    .remove__btn {
       margin-left: 10px;
    }
  }
  form {
    .title {
      font-size: 18px;
      font-weight: 700;
    }
    .row {
      margin-top: 10px;
      .label {
        display: block;
        max-width: 220px;
        overflow: hidden;
        label {
          display: inline-block;
          font-size: 14px;
          color: rgba(35, 35, 35, 0.5);;
        }
        .error {
          color: #e90909;
          font-size: 12px;
          margin-left: 15px;
        }
      }

      input {
        height: 32px;
        width: 220px;
        padding: 0 10px;
        border: 1px solid rgba(35, 35, 35, 0.5);
        font-size: 16px;
        line-height: 17px;
        color: #000;
      }
      select {
        display: block;
        outline: none;
        padding: 6px 10px;
        border: 1px solid rgba(35, 35, 35, 0.5);
        background: transparent;
      }
      &.btn {
        display: inline-block;
        font-size: 14px;
        font-weight: 700;
        color: #fff;
        background: $button_bg;
        padding: 10px 25px;
        margin-top: 27px;
        border: none;
        cursor: pointer;
        max-width: 200px;
        overflow: hidden;
      }
      &.checkbox {
        input {
         width: 25px;
         height: 25px;
         border: none;
    }
  }

    }
  }
  .create-form {
    padding: 25px 25px 40px;
    box-shadow: 0 0 8px rgba(0,0,0,0.1);
  }
  .edit-form {
    padding: 25px 25px 30px;
    box-shadow: 0 0 8px rgba(0,0,0,0.1);
  }
  .checkbox {
    input {
      width: 25px;
      height: 25px;
      border: none;
    }
  }
.row-refresh {
  margin-top: 5px;
  & .error {
    display: block;
    color: #e90909;
    font-size: 12px;
    line-height: 15px;
    min-height: 15px;
  }
  & .wrap {
    display: flex;
    & .btn {
      padding: 5px 10px;
      color: #fff;
      background: $button_bg;
      border: none;
      cursor: pointer;
      overflow: hidden;
  }
  & .img {
    margin-left: 10px;
  }
  }

}
</style>
