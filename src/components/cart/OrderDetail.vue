<template>

<div>
    <van-nav-bar
    title="订单"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    
    />
    <van-tabs v-model="active" swipeable swipe-threshold=5 animated @change="getOrders"  >
        <van-tab title="全部">
            <OrderItem  :orders='orders' />
        </van-tab>
        <van-tab title="待付款">
            <OrderItem  :orders='orders' />
        </van-tab>
        <van-tab title="待发货"> <OrderItem  :orders='orders' />
        </van-tab>
        <van-tab title="已发货"> <OrderItem  :orders='orders' />
        </van-tab>
        <van-tab title="退款/售后"> <OrderItem  :orders='orders' />
        </van-tab>
    </van-tabs>
 
</div>
</template>
<script>
import OrderItem from './OrderItem.vue';
export default {
    components: {
        'OrderItem': OrderItem 
    },

   data() {
    return {
       active:"",
       orders:[],
       
    }
  },
 mounted(){
    this.active =  this.$route.query.status;
    this.getOrders(this.active);
  },
  methods:{
      onClickLeft(){
        this.$router.push({path:"/Mine" 
        });
      },
      async getOrders(name){
            const res = await this.$http.get("app/orders/list",{
                params:{uid:this.$user.id,status:this.active}
            });
            this.orders = res.data.data
            console.log(this.orders)
           
      }
  }
}
</script>
<style  >
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