<template>

   <div class="list-header">
    <div class="list-header__title">Список категорий</div>
    <table>
      <thead>
        <tr>
         <th>№</th>
         <th>NAME</th>
         <th>TYPE</th>
         <th>ACTION</th>
       </tr>
      </thead>
      <tbody>
        <tr v-for="item of getAllCategories" :key="item.id">
          <td>{{item.id}}</td>
          <td>{{item.name}}</td>
          <td>{{item.type}}</td>
          <td>
            <div class="td-btn">
              <div class="edit__btn">Edit</div>
              <div class="remove__btn" @click="remove(item.id)">Remove</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
  name: 'CategoriesList',
  computed: mapGetters(['getAllCategories']),
  methods: {
    ...mapActions(['getData', 'removeCategoryById']),
    remove(id) {
      const result = confirm('Вы уверенны?');
      if(result) {
        this.removeCategoryById(id);
      }
    }
  },
  async mounted() {
    this.getData();
  }

}
</script>

<style lang="scss" scoped>
  // .categories {
  //   &__title {
  //     font-size: 18px;
  //     font-weight: 700;
  //     padding: 20px 0 10px;
  //   }
  //   &-list {
  //     list-style: none;
  //   }
  // }
</style>