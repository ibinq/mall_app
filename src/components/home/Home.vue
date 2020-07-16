<template>

<div>
  <!-- 搜索框 -->
<van-search v-model="value" placeholder="请输入搜索关键词" />
<!-- 轮播图 -->
<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item>1</van-swipe-item>
  <van-swipe-item>2</van-swipe-item>
  <van-swipe-item>3</van-swipe-item>
  <van-swipe-item>4</van-swipe-item>
</van-swipe>
<!-- 格子图  -->
<van-grid :gutter="10" style="margin-top:13px;">
  <van-grid-item
    v-for="value in 8"
    :key="value"
    icon="photo-o"
    text="文字"
  />
</van-grid>
<div>
  <div class="product" v-for="item in product" :key="item.id"  >
    <img class="product_images" :src=item.homeImage>
    
    <div  style="margin-left:10px"><span>{{item.title}}</span></div>
    <div  style="margin-left:10px;margin-top:10px"><span>￥{{item.price}}</span></div>
  </div>

    

</div>
</div>
</template>
<script>
export default {
   data() {
    return {
       value:"",
       product:[],
    }
  },
  created(){
    this.getProductList();
  },
  methods:{
    async getProductList(){
      const res = await this.$http.get("app/products"); 
      this.product=res.data.data
      console.log(res);
    }
  }
}
</script>
<style  >
 .my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.product_images{
  border-radius: 10px 10px 0 0;
  width: 100%;
  height: 180px;
}
.product{
  border-radius: 10px;
  float:left;
  width: 45%;
  height: 300px;
  margin-left: 3.3%;
  margin-top: 10px;
  /* margin-bottom: 80px; */
  background-color: rgb(255, 255, 255);
}
</style>