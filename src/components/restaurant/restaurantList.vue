<template>
  <div>
      <restaurantitem :item="item" v-for="item of this.restaurantList"></restaurantitem>
  </div>
</template>

<script>
import restaurantitem from "components/restaurant/restauritem";
export default {
  props: {
    restaurantlist: Array
  },
  data() {
    return {
      item:null,
      restaurantList: []
    };
  },
  components: {
    restaurantitem
  },
  watch: {
    //监听传过来的数据
    restaurantlist() {
      this.restaurantList = this.restaurantlist || [];
      console.log(1111);
      console.log(this.restaurantList);
    }
  }
};
</script>

<style>
</style>
