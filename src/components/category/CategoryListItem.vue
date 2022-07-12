<template>
  <tr>
    <td>{{category.id}}</td>
    <td>{{category.name}}</td>
    <td>{{category.type}}</td>
    <td class="action">
      <div class="td-btn">
        <app-edit-button class="edit__btn" @clickButton="edit"></app-edit-button>
        <app-delete-button class="remove__btn" @clickButton="confirm"></app-delete-button>
      </div>
    </td>
  </tr>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex';
export default {
  name: 'CategoryListItem',
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
    edit() {
      this.$emit('edit', {...this.category})
    },
    async confirm() {
      this.$emit('delete', {...this.category})
    },

  },


}
</script>