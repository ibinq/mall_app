<template>
<div>
     <van-swipe-cell style="padding-top:10px;" v-for="order in orders" :key="order.id">
                 <van-nav-bar
            left-text="订单号:123123123"
            />
                <div class="cart_item">
                <van-row>
                     <van-card v-for="item in order.orderItemList" :key="item.id"
                        :num="item.quantity"
                        :price="item.productPrice"
                        :title="item.productName"
                        :thumb="item.productImage"
                        />
                  
                </van-row>
                </div>
             <span style="padding-left:20px;">总价:{{order.payment}}</span>
            <van-button style="margin-left: 200px;margin-bottom: 7px;margin-top:7px;" round  size="small" color="#7232dd" plain type="info">去支付</van-button>
            </van-swipe-cell>
</div>
</template>
<script>
export default {
    data(){
        return{
            orderList:[],
        }
    },
    name:'OrderItem',
    props: {
      orders: Array,
    },
  
}
</script>
<style scoped>
 body{width: 100%;height: 100%;position: relative;background-color: rgb(238, 238, 238)}
 .van-swipe-cell,.van-card{
     background-color: white;
 }
 .van-swipe-cell{
     margin-top: 10px;
     border-radius: 10px;
 }
 .van-card {
     padding: 0px 16px;
 }
</style>