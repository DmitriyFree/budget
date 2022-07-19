<template>
  <div class="login-page">
    <div class="login-page__bg">
      <app-modal
        :modal-active="true">
        <app-loin-form></app-loin-form>
      </app-modal>
    </div>
  </div>
</template>

<script>
import AppLoinForm from '@/components/login/AppLoinForm.vue'
export default {
  name: 'LoginView',
  components: {AppLoinForm}
}
</script>

<style lang="scss" scoped>
.login-page {
  &__bg {
    width: 100%;
    height: 100vh;
    background: rgba(20, 20, 20, 0.7);
  }
}
</style>