<template>
  <div class="modal"
    @click="clickListener"
    v-if="showModal"
    :class="{show: showModal}">

    <div class="modal__content">
      <div class="modal-close__btn" v-if="closeble">x</div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AppModal',
  props: {
    modalActive: {
      type: Boolean,
      required: false
    }
  },
  data() {
    return {
      showModal: false,
    }
  },
  computed: {
    closeble() {
      if (this.$route.path === '/login') return false
      else return true
    }

  },
  methods: {
    closeModal() {
      if (this.closeble) this.showModal = false
      this.$emit('hideModal', true);
    },
    clickListener(e) {
      const target = e.target
      if (!target) return
      if (target.classList.contains('modal') || target.classList.contains('modal-close__btn')) {
        this.closeModal()
      }
    }
  },
  async mounted() {
    this.showModal = this.modalActive || false
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Escape') {
        this.closeModal()
      }
    });
  },
  watch: {
    modalActive() {
      this.showModal = this.modalActive || false
    },
    showModal() {
      if (this.showModal) {
        document.documentElement.style.overflow = 'hidden'
      } else  document.documentElement.style.overflow = 'auto'
     }
  },


}
</script>
<style lang="scss" scoped>
@import '@/assets/scss/variables.scss';
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
    color: $button_text_color;
    background: $button_bg;
    padding: 7px 7px 8px 8px;
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
</style>