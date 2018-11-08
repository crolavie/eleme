import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//组件导入  路由配置组件
import Index from 'pages/index/Index'
import Mine from 'pages/mine/Mine'
import Order from 'pages/order/Order'
import Discover from 'pages/discover/Discover'
import Home from 'pages/Home'
import Search from 'pages/search/Search'

const routes = [{
    path: '/',
    redirect: '/home'
  },{
    name:'search',
    path:'/search',
    component:Search
  },
  {
    name:'home',
    path:'/home',
    component:Home,
    redirect:'/home/index',
    children:[
      {
       name: 'index',
       path: 'index',
       component: Index
      }
    ]
  } ,
  {
    name: 'index',
    path: '/index',
    component: Index
  }, {
    name: 'discover',
    path: '/discover',
    component: Discover
  }, {
    name: 'order',
    path: '/order',
    component: Order
  }, {
    name:'mine',
    path:'/mine',
    component:Mine
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router