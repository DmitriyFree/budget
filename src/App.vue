<template>
  <div id="app">
    <Header/>
    <main-content/>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import MainContent from './components/MainContent.vue'

export default {
  name: 'App',
  components: {Header, MainContent}
}
</script>

<style lang="scss">
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
    padding: 10px 20px;
    &__header {
      padding: 10px 0;
      display: flex;
      .title {
        font-size: 20px;
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

    // background: #11aaf3;
    tr th {
      padding:  10px 15px;
      // padding: 10px 15px;
      text-align: start;
    }
  }
  tbody {
    tr td {
      padding: 10px 15px;
    }
  }
  td, th {
      // border: 1px solid #777;
    border-bottom: 1px solid rgba(35, 35, 35, 0.5);
    line-height: 28px;
    // width: 100%;
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
          color: #11aaf3;
        // color: #000;
        }
        .error {
          color: #e90909;
          font-size: 12px;
          margin-left: 15px;
          // display: none;
        }
      }

      input {
        height: 32px;
        width: 220px;
        padding: 0 10px;
        border: 1px solid #11aaf3;
        // border: 1px solid #000;
        font-size: 16px;
        line-height: 17px;
        color: #232323;
      }
      select {
        display: block;
        outline: none;
        padding: 6px 10px;
        border: 1px solid #11aaf3;
        background: transparent;
      }
      &.btn {
        display: inline-block;
        font-size: 14px;
        font-weight: 700;
        color: #fff;
        background: #11aaf3;;
        padding: 10px 25px;
        margin-top: 22px;
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
  .modal {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(20, 20, 20, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    &__content {
      position: relative;
      max-width: 270px;
      // height: 100%;
      // left: 50%;
      // top: 200px;
      // transform: translateX(-50%);
      background: rgb(255, 253, 253);
    }
  }
  .modal.show {
    background: rgba(70, 70, 70, 0.7);
    & .modal__content{
      animation: showModal .5s;
    }

  }
  .modal-close__btn {
    position: absolute;
    top: 0px;
    right: 0px;
    font-size: 18px;
    line-height: 18px;
    font-weight: 700;
    color: #fff;
    background: #11aaf3;
    padding: 8px 8px 10px 10px;
    cursor: pointer;
  }
  @keyframes showModal {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }

  }
  .create-form {
    // position: relative;
    padding: 20px 20px;
    box-shadow: 0 0 8px rgba(0,0,0,0.1);
    // border-bottom: 1px solid #aaa;
  }
  .edit-form {
    padding: 25px 20px;
    box-shadow: 0 0 8px rgba(0,0,0,0.1);
  }
  .checkbox {
        input {
         width: 25px;
         height: 25px;
         border: none;
    }
  }
</style>
