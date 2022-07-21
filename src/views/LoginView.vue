<template>
  <div class="login-page">
    <div class="login-page__bg">
      <app-modal
        :modal-active="true">
        <app-loin-form></app-loin-form>
      </app-modal>
      <!-- <div class="bg">
        <div class="info">ddd</div>
     </div> -->
     <app-info-modal :text='message' :show='true'  class="ff"></app-info-modal>
    </div>
  </div>
</template>

<script>
import AppLoinForm from '@/components/login/AppLoinForm.vue'
export default {
  name: 'LoginView',
  components: {AppLoinForm},
  data() {
    return {
      message: 'Для входа используйте guest и 1111'
    }
  }
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
  .ff {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>