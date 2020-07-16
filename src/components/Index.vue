<template>

<div>
  <div>
    <router-view></router-view>
  </div>
<div v-if="$route.path=='/Home' || $route.path=='/Category' || 
            $route.path=='/Cart' || $route.path=='/Mine'  ">
  <van-tabbar v-model="active"> 
  <van-tabbar-item icon="home-o" :to="{path:'/Home'}">主页</van-tabbar-item>
  <van-tabbar-item icon="label-o" :to="{path:'/Category'}">分类</van-tabbar-item>
  <van-tabbar-item icon="shopping-cart-o" :to="{path:'/Cart'}">购物车</van-tabbar-item>
  <van-tabbar-item icon="friends-o" :to="{path:'/Mine'}">我的</van-tabbar-item>
</van-tabbar>
</div>
</div>
</template>
<script>
export default {
   data() {
    return {
       active: 0
    }
  }
}
</script>
<style  >
 
</style>