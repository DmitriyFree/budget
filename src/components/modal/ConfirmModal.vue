<template>
  <div class="bg" v-show="text" @click="clickListener">
    <div class="inner">
      <div class="message">{{text}}</div>
      <div class="buttons">
        <div class="buttons__item-ok">Ок</div>
        <div class="buttons__item-cansel">Отменить</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'confirmModal',
  props: ['text'],
  methods: {
    clickListener(e) {
      const target = e.target;
      if (!target) return
      if (target.classList.contains('bg') || target.classList.contains('buttons__item-cansel')) {
        this.$emit('result', false);
      } else if (target.classList.contains('buttons__item-ok')) {
        this.$emit('result', true);
      }
    }
  },
  watch: {
    text() {
      if (this.text) {
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
      padding: 10px 0;
      background: white;

      // max-width: 320px;
      & .message {
        text-align: center;
        max-width: 320px;
      }
      & .buttons {
        margin-top: 10px;
        display: flex;
        justify-content: center;
        & div {
          background: #11aaf3;
          cursor: pointer;
          margin: 0 10px;
          padding: 5px 10px;
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