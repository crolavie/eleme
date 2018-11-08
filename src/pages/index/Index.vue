<template>
<div id="scroll">
  <div>
  <div class="top">
    <div class="location">上海市人民政府</div>
    <div class="input" @click="goSearch()">
     <input  type="text" readonly="true" placeholder="搜索饿了么商家、商品名称">
    </div>
  </div>
    <swipe-list :banner="banner">
      
    </swipe-list>

    <div class="middle">
    <div :item="item" v-for="item of this.xlqg" :key =item.activity_id>
      <h1>{{item.description}}</h1>
      <p>{{item.name}}</p>
      <img :src="item.image_hash|replaceImg" alt="">
    </div>

        <div v-if="this.xlqg[0]">
       <h1>{{this.xlqg[0].description}}</h1>
        <p>{{this.xlqg[0].name}}</p>
        <img :src="this.xlqg[0].image_hash|replaceImg"></img>
    </div>
      </div>
    <auto-list :autolist="autolist" ></auto-list>
      <h2>---推荐商家---</h2>
      <ul class="menu_list">
        <li>综合排序</li>
        <li>距离最近</li>
        <li>品质联盟</li>
        <li>筛选</li>
      </ul>
      
<restaurantlist :restaurantlist="restaurantlist"></restaurantlist>
<!-- <div>{{restaurantlist}}</div> -->
</div>
</div>

</template>

<script>
//首页 全部都是可以滚动的,把轮播当做组件处理
//暂且写静态的,滚动事件后面处理,
//当前页面进行网络数据请求，将banner图的数据传递给
//swiper组件
import http from "utils/http";
import SwipeList from "components/banner/SwipeList";
import AutoList from "components/common/autolist";
import restaurantlist from "components/restaurant/restaurantList";
import { scroll } from "utils/scroll";
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      banner: [],
      xlqg: [],
      autolist: [],
      restaurantlist: [],
      test: Object
    };
  },
  methods:{
   goSearch(){
     alert(1)
    console.log(this.$router);
     this.$router.push('/search')
   }
  },
  mounted() {
    let count = 8;
    //声明bscroll
    let bscroll = new Bscroll("#scroll", {
      probeType: 1,
      click: true,
      pullUpLoad: {
        threshold: 50
      }
    });
    //监听 pullingUp 触发加载更多
    bscroll.on("pullingUp", async () => {
      let result = await http({
        method: "get",
        url:
          "/restapi/shopping/v3/restaurants?latitude=31.230378&longitude=121.473657&offset=" +
          count +
          "&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=793f4acf7cdf43d5b9d12c8751eb8952&terminal=h5"
      });
      if (!!result) {
        console.log(6666);
        this.restaurantlist.push(...result.items);
        console.log(this.restaurantlist);

        this.$nextTick(() => {
          bscroll.refresh();
          this.$forceUpdate();
          count += 8;
          bscroll.finishPullUp();
        });
      } else {
        Toast({
          message: "到底了~",
          position: "bottom",
          duration: 1000
        });
      }
    });

  },

  components: {
    SwipeList,
    AutoList,
    restaurantlist
  },
  async beforeCreate() {
    let result = await http({
      method: "get",
      url:
        "/restapi/shopping/openapi/entries?latitude=31.23037&longitude=121.473701&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template&terminal=h5"
    });
    this.banner = result;
    this.xlqg = this.banner[1].entries;

    let autoPlayResource = await http({
      method: "get",
      url:
        "/restapi/shopping/v2/banners?consumer=1&type=1&latitude=31.230378&longitude=121.473657"
    });
    this.autolist = autoPlayResource;

    //获取店家数据
    let restaurantSource = await http({
      method: "get",
      url:
        "/restapi/shopping/v3/restaurants?latitude=31.230378&longitude=121.473657&offset=0&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5"
    });
    this.restaurantlist = restaurantSource.items;
  }
};
</script>

<style lang="stylus" scoped>
@import '~styles/border.styl';

.top {
  width: 100%;
  height: 0.96rem;
  background-color: skyblue;
  padding-top: 0.1rem;
}

.location {
  color: white;
  line-height: 0.18rem;
  height: 0.18rem;
  font-weight: 700;
  padding-left: 0.15rem;
  font-size: 0.18rem;
}

.input {
  height: 0.52rem;
  width: 100%;
  background-color: white;
  margin-top: 0.16rem;
  background-color: skyblue;

  &>input {
    height: 0.36rem;
    width: 3.5rem;
    text-align: center;
    margin-top: 0.08rem;
    margin-left: 0.12rem;
  }
}

.middle {
  height: 1.5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &>div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 50%;
    height: 100%;
  }
}

h2 {
  text-align: center;
  height: 0.5rem;
  line-height: 0.5rem;
  font-size: 0.16rem;
}

.menu_list {
  border: 0 0 1px 0, #ff0;
  display: flex;
  line-height: 0.36rem;
  height: 0.36rem;
  font-size: 0.15rem;
  text-align: center;
  justify-content: space-between;
}

#scroll {
  width: 100%;
  height: 100%;
}
</style>

