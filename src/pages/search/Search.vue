<template>
<div id="scroll">
  <div>
  <div class="search">
   <span><</span>
    <div class="serch_box">
      <i class="iconfont  icon-changyonglogo40"></i>
      <input class="search_input" type="text" placeholder="输入商家、商品" v-model="search" @keyup="search_info">
      <!-- <span>X</span> -->
    </div>
    <p>搜索</p>
  </div>

  <div v-show="showsearch">
  <h2>热门搜索</h2>
    <ul  class="hot_search" v-if="this.goods_list.length>0">
      <li v-for="item of goods_list">{{item.word}}</li>
    </ul>
</div>

    <div v-show="!showsearch">
       <p v-show="this.restaurants.length==0">搜索{{this.search}}</p>
      <ul class="restaurants">
        <li v-for="item of this.restaurants">
          <img class="small_img" :src="item.image_path|replaceAutoImg" alt="">
          <div class="neirong">
          <div class="middle" v-if="item">
              <span>{{item.name}}</span>
              <span v-for="value of item.tags">{{value.name}}</span>
          </div>
            <span>评分{{item.rating}}</span>
            </div>
        </li>
      </ul>
       <ul class="wordss">
        <li v-for="value in this.wordsList">
         <i class="iconfont  icon-changyonglogo40"></i>
          <p>{{value}}</p>
        </li>
      </ul> 
      <p>test</p>
      <p>test</p>
    </div>
</div>
</div>
  </div>
</template>

<script>
import http from "utils/http";
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      goods_list: [],
      search: "",
      showsearch: true,
      wordsList: [],
      restaurants: []
    };
  },
  mounted(){
    let bscroll = new Bscroll("#scroll", {
      probeType: 1,
      click: true,
      pullUpLoad: {
        threshold: 50
      }
    });
  },
  methods: {
    async search_info() {
      this.showsearch = false;
      console.log(this.search);
      if (this.search == "") {
        this.showsearch = true;
      }
      //进行http请求
      if (this.search != "") {
        let result = await http({
          method: "get",
          url:
            "/restapi/shopping/v1/typeahead?kw=" +
            this.search +
            "&latitude=31.230378&longitude=121.473657&city_id=1"
        });
        console.log(result);
        this.wordsList = result.words || [];
        console.log(this.wrodList);
        this.restaurants = result.restaurants;
      }
    }
  },
  watch: {
    search() {
      // console.log(this.search)
    }
  },
  async beforeCreate() {
    let result = await http({
      method: "get",
      url:
        "/restapi/shopping/v3/hot_search_words?latitude=31.230378&longitude=121.473657"
    });
    console.log(result);
    this.goods_list = result;
  }
};
</script>

<style>
</style>




<style lang="stylus" scoped>
@import '~styles/border.styl';

#scroll
  width 100%;
  height 100%;

h2 {
  margin-left: 0.1rem;
  margin-top: 0.1rem;
}

.search {
  margin-top: 0.1rem;
  margin-left: 0.08rem;
  display: flex;
  width: 3.56rem;
  height: 0.3rem;
  justify-content: space-between;

  &>p {
    line-height: 0.3rem;
    font-size: 0.16rem;
  }
}

.serch_box {
  width: 2.78rem;
  background-color: #f8f8f8;

  &>input {
    line-height: 0.3rem;
    height: 0.3rem;
    border: 0 0 0 0, white;
    border-width: 0;
    color: black;
    background-color: #f8f8f8;
    width: 2.43rem;
  }

  &>img {
    line-height: 0.3rem;
    height: 0.3rem;
  }
}

.hot_search {
  height: 0.8rem;
  flex-wrap: wrap;
  display: flex;
  margin-top .1rem

  &>li {
    margin-left: 0.1rem;
    line-height: 0.35rem;
    height: 0.35rem;
    font-size: 0.14rem;
    padding-left: 0.1rem;
    background: #f7f7f7;
    padding-right: 0.1rem;
  }
}

.restaurants{ 
  width: 100%;
}
.restaurants >li{
    display: flex;
     justify-content: space-around;
     height: .54rem;
     line-height: .54rem; 
     width: 100%;
}
.restaurants>img{
  width: 0.3rem;
  height: 0.3rem;
  margin-left: 0.15rem;
  margin-top: 0.15rem;
  }

.neirong {
  width: 3.06rem;
  border: 0 0 1px 0, #ccc;
  display: flex;
}

.middle {
  padding-left: 0.15rem;
  width: 2.5rem;

  &>span:nth-child(2) {
    background-color: pink;
    color: white;
    margin-left: 0.08rem;
  }

  &>span:nth-child(3) {
    color: white;
    margin-left: 0.08rem;
    background-color: skyblue;
  }
}

.wordss {
  width: 100%;

  &>li {
    display: flex;
    width: 100%;
    height: 0.42rem;
    line-height: 0.42rem;
    justify-content: space-between;

    &>p {
      width: 3.2rem;
      border: 0 0 1px 0, #cccccc;
    }
  }
}

.small_img {
  width: 0.3rem;
  height: 0.3rem;
  margin-left: 0.15rem;
  margin-top: 0.15rem;
}
</style>
