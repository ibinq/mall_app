<template>

<div>
<van-nav-bar
  title="购物车"
/>

<van-swipe-cell style="padding-top:10px;" v-for="cart in carts" :key="cart.id">
    <div class="cart_item">
      <van-row>
        <van-col span="2" >  
          <van-checkbox v-model="cart.checked" checked-color="#07c160" style="vertical-align: middle;margin-top: 50px;" @click="changChecked(cart.id,cart.checked)"></van-checkbox>
        </van-col>
         <van-col span="22" >      
           <van-card
            :price="cart.productPrice"
            :desc="cart.productDesc"
            :title="cart.productName"
            :thumb="cart.productHomeImage"
            class="goods-card"
            @click-thumb="goProductDetail(cart.productId)"
          >
          <template #footer>
            <van-stepper v-model="cart.quantity" theme="round" button-size="22" disable-input @change="changgeProductNum(cart.id,cart.quantity)"/>
          </template>
          </van-card>
        </van-col>
      </van-row>
    </div>
</van-swipe-cell>

 

<van-submit-bar :price="totalPrice" button-text="去结算" @submit="onSubmit">
  <van-checkbox v-model="checked" @click="changAllChecked" checked-color="#07c160">全选</van-checkbox>
</van-submit-bar>

</div>
</template>
<script>
export default {
   data() {
    return {
       value:1,
       checked:"",
       carts:[],
       totalPrice:0,
    }
  },
  created(){
    this.getCartList();
  
   
  },
  methods: {
    
    goProductDetail(id){
        this.$router.push({path: '/productDetail',
          query: {   
            'id':id
          }  
        }) 
    },
    async changAllChecked(){
      var checked = this.checked;
      const res = await this.$http.get("app/carts/allChecked",{params:{uid:this.$user.id,checked:checked}});
      this.getCartList();
    },
    async changgeProductNum(id,quantity){
      
      const res = await this.$http.get("app/carts/num",{params:{id:id,quantity:quantity} });
      if(res.data.code == 0){
        this.getCartList();
      }
    },

    async changChecked(id,checked){
      checked= !checked;
      const res = await this.$http.get("app/products/checked",{params:{id:id,checked:checked} });
      if(res.data.code == 0){
        this.getCartList();
      }
    },

    async getCartList(){
      const res = await this.$http.get("app/carts/"+this.$user.id);
      this.carts = res.data.data;
      var totalPrice = 0;
      var currentChecked = true;
      for (var i = 0; i < res.data.data.length; i++) { 
        if(res.data.data[i].checked){
          totalPrice = totalPrice + (res.data.data[i].productPrice * res.data.data[i].quantity)
        }
        if(currentChecked){
          currentChecked = res.data.data[i].checked
        }
      }
      this.totalPrice = totalPrice*100
      this.checked = currentChecked
    },
    onSubmit(){
       this.$router.push({path: '/order'}) 
    },
  },
}
</script>
<style  >
body{width: 100%;height: 100%;position: relative;background-color: rgb(238, 238, 238)}
 .van-tabbar{
   z-index: 200;
 }
 .van-submit-bar{
   padding-bottom: 60px;
 }
 .van-checkbox{
  margin-left: 10px;
  /* margin-top: 50px; */
 }
 .cart_item{
   background-color: #fff;
   margin-left: 10px;
   margin-right: 10px;
   border-radius: 10px;
 
 }
 .van-card {
   background-color: #fff;
 }
 /* .goods-card {
    margin: 0;
    background-color: #FFF;
    border-radius: 10px;
    margin-left: 8px;
    margin-right: 8px;
  } */

  .delete-button {
    height: 100%;
  }
</style>