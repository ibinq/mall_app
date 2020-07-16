<template>

    <div>
        <van-nav-bar
        title="填写订单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
        />
        

        <van-address-list
        :list="list"
        default-tag-text="默认"
        @click-item="getNewAddress"
        />
        
        <van-divider
        dashed
        :style="{ color: '#1989fa', borderColor: '#1989fa',  }"
        >
        </van-divider>

        <van-radio-group v-model="radio" style="margin-top:10px;">
        <van-cell-group>
            <van-cell title="微信" clickable @click="radio = '1'">
            <template #right-icon>
                <van-radio name="1" />
            </template>
            </van-cell>
            <van-cell title="支付宝" clickable @click="radio = '2'">
            <template #right-icon>
                <van-radio name="2" />
            </template>
            </van-cell>
        </van-cell-group>
        </van-radio-group>
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
                    <span>x {{cart.quantity}}</span>
                </template>
                </van-card>
                </van-col>
            </van-row>
            </div>
        </van-swipe-cell>
        <div style="margin-top:10px;">
            <van-cell title="领券" is-link />
            <van-cell title="促销" is-link   />
        </div>

         <div style="margin-top:10px;">
            <van-cell title="单元格" is-link />
            <van-cell title="单元格" is-link value="内容" />
        </div>

        <van-submit-bar :price="totalPrice" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checked">全选</van-checkbox>
     
        </van-submit-bar>

    </div>
</template>
<script>
export default {
   data() {
    return {
        chosenAddressId: '1',
        list: [],

        radio:2,

        value:1,
        checked:"",
        carts:[],
        totalPrice:0,

        index:-1,

        order:{
            uid:"",
            addressId:"",
            payway:"",
            totalPrice:"",
            carts:[],
        }
    }
  },
  computed: {
   
  },
mounted(){
    const index =  this.$route.query.index;
    this.index = index;
    this.chosenAddressId = index;
  },
  created(){
    this.getAddressList();
    this.getCartList();
   
  },
  methods: {
   
    async onSubmit(){
        this.order.uid=this.$user.id,
        this.order.addressId=this.chosenAddressId,
        this.order.payway=this.radio,
        this.order.totalPrice=this.totalPrice,
        this.order.carts=this.carts

        const res = await this.$http.post("app/orders",this.order);
    },
    getNewAddress(item,index){
        this.$router.push({path: '/address',
         query: {   
            'index':item.id
          }  
        })  
    },
    async getTotalPrice(){
        var totalPrice = 0;
        var currentChecked = true;
        for (var i = 0; i < this.carts.length; i++) { 
            if(this.carts[i].checked){
            totalPrice = totalPrice + (this.carts[i].productPrice * this.carts[i].quantity)
            }
             
        }
        this.totalPrice = totalPrice*100
    },
    async getCartList(){
        const res = await this.$http.get("app/carts/checked/"+this.$user.id);
        this.carts = res.data.data
        this.getTotalPrice();
    },
    async getAddressList(){
        const res = await this.$http.get("app/addresses/list/"+this.$user.id);
        res.data.data.forEach(element => {
             if(element.isDefault){
                 this.chosenAddressId = element.id
                var myArray=new Array()
                myArray[0] = element
                this.list = myArray
            }
            if(this.index != -1){
                console.log(this.index)
                if(this.index == element.id){
                    var myArray = new Array()
                    myArray[0] = element
                    this.list = myArray
                    return
                }
            }
           
        });
    },
     

 
    onClickLeft(){
       this.$router.push({path: '/Cart'
          
        })  
    }
  },
}
</script>
<style scoped >
body{width: 100%;height: 100%;position: relative;background-color: rgb(238, 238, 238)}
.van-address-list{
    padding: 0 !important;
}          
.van-radio__icon,.van-icon,.van-button--block,.van-checkbox{
     display: none;
 }
.van-submit-bar__text{
    text-align: left;
}
.van-submit-bar {
    padding-bottom: 0px;
}
.van-col--22 {
    width: 100%;
}
</style>