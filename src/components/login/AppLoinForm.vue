<template>
    <div class="create-form">
    <form @submit.prevent="formHandler">
      <div class="title">Log in</div>
      <div class="row">
        <div class="label">
          <label>Логин</label>
          <span class="error">{{error}}</span>
        </div>
        <input
          v-model.trim="login"
          @input="resetError">
      </div>
      <div class="row">
        <div class="label">
          <label>Пароль</label>
          <span class="error"></span>
        </div>
        <input
          type="password"
          v-model.trim="password"
          @input="resetError">
      </div>
      <button type="submit" class="row btn">
        ДОБАВИТЬ
      </button>
     </form>
  </div>
</template>

<script>
export default {
  name: 'AppLoinForm',
  data() {
    return {
      login: '',
      password: '',
      error: ''
    }
  },
  methods: {
    formHandler() {
      if (this.login === process.env.VUE_APP_AUTH_LOGIN && this.password === process.env.VUE_APP_AUTH_PASSWORD) {
        localStorage.setItem('id', 'true')
        this.$router.push('/statistics')
      } else {
        this.error = 'Логин или проль не верены'
      }
    },
    resetError() {
      this.error = ''
    }
  }
}
</script>
<style lang="scss" scoped>
  .bg {
    position: absolute;
    top: 50%;
    left: 50%;

    background: rgba(70, 70, 70, 0.7);
    & .info {
          position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: red;
    }
  }
</style>