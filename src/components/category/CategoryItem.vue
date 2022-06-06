<template>
  <tr>
    <td>{{category.id}}</td>
    <td>{{category.name}}</td>
    <td>{{category.type}}</td>
    <td class="action">
      <div class="td-btn">
        <edit-button class="edit__btn" @clickButton="editCategory"></edit-button>
        <delete-button class="remove__btn" @clickButton="confirm"></delete-button>
      </div>
    </td>
  </tr>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
import ConfirmModal from '../modal/ConfirmModal.vue';
import DeleteButton from '../ui/DeleteButton.vue';
import EditButton from '../ui/EditButton.vue';
export default {
  name: 'CategoryItem',
  components: {EditButton, DeleteButton, ConfirmModal},
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  computed: {
     ...mapGetters(['getConfirmResult'])
  },
  methods: {
    ...mapMutations(['changePopupForm', 'setSelectedCategory', 'setConfirmModalText']),
    editCategory() {
      this.setSelectedCategory(this.category);
      this.changePopupForm(true);
    },
    async confirm() {
      await this.setConfirmModalText('Вы уверены? Будут удалены все связанные записи');
      this.setSelectedCategory(this.category);
    },

  },


}
</script>