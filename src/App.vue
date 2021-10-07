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
      border-bottom: 1px solid #aaa;
      display: flex;
      .title {
        font-size: 20px;
        line-height: 30px;
        font-weight: 700;
      }
      .btn {
        position: relative;
        width: 30px;
        height: 30px;
        margin-left: 20px;
        border-radius: 3px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background: #ff4081;
        cursor: pointer;
        transition: all .5s;
        &.active {
          // background: #2196f3;
          background: #11aaf3;
        }
        &::before {
          content: "+";
          position: absolute;
          width: 30px;
          height: 30px;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 2em;
          font-weight: 400;
          color: #fff;
          transition: all .5s;
        }
        &.active::before {
          transform: rotate(315deg);
        }
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
    // background: #00aacc;
    background: #11aaf3;
    tr th {
      padding: 10px 15px;
    }
  }
  tbody {
    tr td {
      padding: 10px 15px;
    }
  }
  td, th {
      border: 1px solid #777;
  }
  .td-btn {
    display: flex;
    .edit__btn {
    background: #17ac17;
    padding: 5px 10px;
    text-align: center;
    cursor: pointer;
    }
    .remove__btn {
    background: #e90909;
    margin-left: 15px;
    padding: 5px 10px;
    text-align: center;
    cursor: pointer;
    }
  }
  form {
    .title {
      font-size: 18px;
      font-weight: 700;
    }
    .row {
      margin-top: 10px;
      label {
        display: block;
        font-size: 14px;
        color: #11aaf3;
        // color: #000;
        max-width: 220px;
        overflow: hidden;
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
    }
  }
  .create-form {
    position: relative;
    padding: 20px 0 20px;
    border-bottom: 1px solid #aaa;
  }
  .edit-form {
    padding: 25px 20px;
    box-shadow: 0 0 8px rgba(0,0,0,0.1);
  }
</style>
