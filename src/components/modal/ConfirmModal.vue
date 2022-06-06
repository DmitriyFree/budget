<template>
  <div class="bg" v-show="getConfirmModalText" @click="clickListener">
    <div class="inner">
      <div class="message">{{getConfirmModalText}}</div>
      <div class="buttons">
        <div class="buttons__item-ok">Да</div>
        <div class="buttons__item-cansel">Отменить</div>
      </div>
    </div>
  </div>
</template>
<script>
import {mapGetters, mapActions, mapMutations} from 'vuex';
export default {
  name: 'confirmModal',
  computed: {
    ...mapGetters(['getConfirmModalText']),
  },
  methods: {
    ...mapMutations(['setConfirmModalText']),
    clickListener(e) {
      const target = e.target;
      if (!target) return
      if (target.classList.contains('bg') || target.classList.contains('buttons__item-cansel')) {
        this.$emit('result', false);
        this.setConfirmModalText('');
      } else if (target.classList.contains('buttons__item-ok')) {
        this.$emit('result', true);
        this.setConfirmModalText('');
      }
    }
  },
  watch: {
    getConfirmModalText() {
      if (this.getConfirmModalText) {
        document.documentElement.style.overflow = 'hidden';
        return
      }
      document.documentElement.style.overflow = 'auto';
     }
  },
  async mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Escape') {
        this.$emit('result', false);
        this.setConfirmModalText('');
      }
    });
  },
}
</script>
<style lang="scss" scoped>
  .bg {
    position: absolute;
    background: rgba(70, 70, 70, 0.7);
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    & .inner {
      position: relative;
      display: inline-block;
      min-width: 300px;
      padding: 20px 0;
      background: white;
      & .message {
        text-align: center;
        max-width: 320px;
      }
      & .buttons {
        margin-top: 20px;
        display: flex;
        justify-content: center;
        & div {
          background: #1e5f7e;
          color: #fff;
          cursor: pointer;
          margin: 0 10px;
          padding: 5px 10px;
          min-width: 70px;
          text-align: center;
        }

      }
      animation: animate 0.3s;


    }
    @keyframes animate {
      0% {
        transform: scale(0);
      }
      100% {
        transform: scale(1);
      }
    }

  }
</style>