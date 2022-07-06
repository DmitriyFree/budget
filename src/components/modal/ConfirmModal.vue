<template>
  <div class="bg" v-show="show" @click="clickListener">
    <div class="inner">
       <div class="message">{{text || "Вы уверены"}}</div>
      <div class="buttons">
        <div class="buttons__item-ok">Да</div>
        <div class="buttons__item-cansel">Отменить</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'confirmModal',
  props: {
    text: {
      type: String,
      required: false
    },
    show: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    clickListener(e) {
      const target = e.target;
      if (!target) return
      if (target.classList.contains('bg') || target.classList.contains('buttons__item-cansel')) {
        this.$emit('result', false);
      } else if (target.classList.contains('buttons__item-ok')) {
        this.$emit('result', true);
      }
    },
  },
  async mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Escape') {
        this.$emit('result', false)
      }
    })
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