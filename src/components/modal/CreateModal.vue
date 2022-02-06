  <template>
  <div class="modal" @click="clickListener" v-bind:class="{show: active}">
    <div class="modal__content">
      <div class="modal-close__btn">x</div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import {mapMutations} from 'vuex';
export default {
  name: 'EditForm',
  computed: {
    // ...mapGetters(['getModalActive']),
    active() {
       return this.$store.getters.isCreateForm;
    }
  },
  methods: {
    ...mapMutations(['changeCreateForm']),
    closeModal() {
      this.changeCreateForm(false);
    },
    clickListener(e) {
      const target = e.target;
      if (!target) return
      if (target.classList.contains('modal') || target.classList.contains('modal-close__btn')) {
        this.closeModal();
      }
    }
  },
  async mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.code == 'Escape') {
        this.closeModal();
      }
    });
  },
  watch: {
    active() {
      if (this.active) {
        document.documentElement.style.overflow = 'hidden';
        return
      }
      document.documentElement.style.overflow = 'auto';
     }
  }

}
</script>
<style lang="scss" scoped>
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
      background: white;
    }
  }
  .modal.show {
    background: rgba(116, 116, 116, 0.425);
    & .modal__content{
      animation: showModalF .5s;
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
  @keyframes showModalF {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }

  }
</style>