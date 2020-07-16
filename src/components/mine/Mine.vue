<template>

<div>
<div class="mine_head">
  <van-row>
    <van-col span="6">
      <van-image
      round
      width="4rem"
      height="4rem"
      :src="user.avatar"
      class="head_image"
    />
    </van-col>
    <van-col span="12" class="head_name">
      <van-row  class="head_name_text">
        {{user.username}}
      </van-row>
      <van-row>
        <img src="../../assets/lv-_9.png" style="width:50px;"/>
      </van-row>
    </van-col>
       <van-col span="5" >
    
    
       <div class="sign" @click="sign">每日签到</div>
     
      </van-col>
  
  </van-row>
<div class="money">
  <van-grid :column-num="4">
  <van-grid-item v-for="value in 4" :key="value" icon="photo-o" text="文字" />
</van-grid>
 
</div>

</div>

<div class="order">
  <van-nav-bar
    left-text="我的订单"
    right-text="查看全部"
  />
   <van-grid   :column-num="5" >
    <van-grid-item @click="getOrderList(1)" icon="after-sale" text="待付款" :badge="orderStatus.badge1 > 0 ? orderStatus.badge1 : ''"/>
    <van-grid-item @click="getOrderList(2)" icon="notes-o" text="待收货" :badge="orderStatus.badge2 > 0 ? orderStatus.badge2 : ''"/>
    <van-grid-item @click="getOrderList(3)" icon="logistics" text="已完成" :badge="orderStatus.badge3 > 0 ? orderStatus.badge3 : ''"/>
    <van-grid-item @click="commentList" icon="comment-o" text="待评价" :badge="commentCount > 0 ? commentCount : ''" />
    <van-grid-item @click="getOrderList(4)" icon="comment-circle-o" text="退款/售后" :badge="orderStatus.badge4 > 0 ? orderStatus.badge4 : ''"/>
  </van-grid>
 



</div>
<div>
<van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
  <van-swipe-item>1</van-swipe-item>
  <van-swipe-item>2</van-swipe-item>
  <van-swipe-item>3</van-swipe-item>
  <van-swipe-item>4</van-swipe-item>
</van-swipe>

</div>
<div class="tool">
    <van-nav-bar
    left-text="我的服务"
  />
    <van-grid square>
  <van-grid-item v-for="value in 8" :key="value" icon="photo-o" text="文字" />
   <van-grid-item   icon="location-o" text="地址" @click="address" /> 
</van-grid>
</div>
<div><span style="margin-left:10px;font-size:16px;margin-top:10px">为你推荐</span></div>
<div>
  <div class="product">
    <img class="product_images" src="https://yanxuan-item.nosdn.127.net/03f54dbd1b6f8a26bbf53af899b0e3b2.jpg?type=webp&imageView&thumbnail=430x430&quality=95">
    
    <div  style="margin-left:10px"><span>这是一段描述性内容，描述当前商品qweqweqwe</span></div>
    <div  style="margin-left:10px;margin-top:10px"><span>￥45</span></div>
  </div>
   <div class="product">
    <img class="product_images" src="https://yanxuan-item.nosdn.127.net/03f54dbd1b6f8a26bbf53af899b0e3b2.jpg?type=webp&imageView&thumbnail=430x430&quality=95">
    
    <div  style="margin-left:10px"><span>这是一段描述性内容，描述当前商品qweqweqwe</span></div>
    <div  style="margin-left:10px;margin-top:10px"><span>￥45</span></div>
  </div>
    <div class="product">
    <img class="product_images" src="https://yanxuan-item.nosdn.127.net/03f54dbd1b6f8a26bbf53af899b0e3b2.jpg?type=webp&imageView&thumbnail=430x430&quality=95">
    
    <div  style="margin-left:10px"><span>这是一段描述性内容，描述当前商品qweqweqwe</span></div>
    <div  style="margin-left:10px;margin-top:10px"><span>￥45</span></div>
  </div>
    <div class="product">
    <img class="product_images" src="https://yanxuan-item.nosdn.127.net/03f54dbd1b6f8a26bbf53af899b0e3b2.jpg?type=webp&imageView&thumbnail=430x430&quality=95">
    
    <div  style="margin-left:10px"><span>这是一段描述性内容，描述当前商品qweqweqwe</span></div>
    <div  style="margin-left:10px;margin-top:10px"><span>￥45</span></div>
  </div>

</div>

 
</div>
</template>
<script>
export default {
   data() {
    return {
      user:{},
      orderStatus:{},
      commentCount:"",
    
    }
    
  },
 
  created(){
    if(window.sessionStorage.getItem('Authentication')==null){
       this.$router.push({path: '/login'})  
    }
   this.user = this.$user;
   this.getOrderStatusCount()
   this.getCommentCount();
  },
  methods:{
    //签到
    sign(){
      this.$toast({
        message: '签到成功，经验+3',
        // icon: 'https://img.yzcdn.cn/vant/logo.png',
      });
      
    },
    getOrderList(status){
      this.$router.push({path:"/orderDetail",
        query:{
          status:status
        }
      });
    },
     commentList(){
      this.$router.push({path:"/comment"
      });
    },
    async getCommentCount(){
      const res = await this.$http.get("app/comment/"+this.$user.id); 
      this.commentCount = res.data.data
    },
    async getOrderStatusCount(){
      const res = await this.$http.get("app/orders/count",{
        params:{uid:this.$user.id}
      }); 
      this.orderStatus = res.data.data
      console.log(res);
    },
    address(){
       this.$router.push({path: '/address'})  
    }
  }
}
</script>
<style  >
.sign{
  margin-top: 50px;
  height: 30px;
  background-color: rgb(184, 153, 89);
  border-radius: 15px;
  text-align:center;
  line-height:30px;
  color: #fff;
  font-size: 10px;
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

 .my-swipe .van-swipe-item {
    color: #fff;
    font-size: 20px;
    
    line-height: 100px;
    text-align: center;
    background-color: #39a9ed;
  }
body{width: 100%;height: 100%;position: relative;background-color: rgb(238, 238, 238)}
.money .van-grid-item__content {
  background-color: rgb(18   , 150, 218);
}
.tool{
  margin-top: 10px;
}
.order{
  background-color: rgb(255, 255, 255);

}
 .mine_head{
   width: 100%;
   height: 250px;
   background-color: rgb(18   , 150, 218);
 }
 .van-nav-bar__text{
   color:#000;
   font-size: 16px;
 }
 .head_image{
   margin-top: 85px;
   margin-left: 15px;
 }
 .head_name{
  margin-top: 95px;
  margin-left: 5px;

 }
 .head_name_text{
   font-size: 16px;
 }
</style>