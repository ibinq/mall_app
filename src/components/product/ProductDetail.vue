<template>
  <div >
        
        <div class="main_image">
            <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white" >
            <van-swipe-item v-for="item in mainImageList" :key=item.id>  
                <img  style="width:100%;height:auto; "  :src="item" alt="" />
                </van-swipe-item>
           
            </van-swipe>
        </div>
        <div class="arrow-left" @click="back">
            <van-icon name="arrow-left" color="#000"/>
        </div>
        <div  class="price">
            <span>￥{{product.price}}</span>
        </div>
        <div  class="title">
           <span>{{product.title}}</span>
        </div>
         <div  class="content">
           <span>{{product.subTitle}}</span>
        </div>

        <div style="margin-top:10px;">
            <van-cell title="领券" is-link />
            <van-cell title="促销" is-link   />
        </div>

         <div style="margin-top:10px;">
            <van-cell title="单元格" is-link />
            <van-cell title="单元格" is-link value="内容" />
        </div>
        <img v-for="item in subImageList" :key="item.id" style="width:100%" :src="item" alt="" />
 
        <van-goods-action>
            <van-goods-action-icon icon="chat-o" text="客服" :dot=dot  />
            <van-goods-action-icon  icon="cart-o" text="购物车"  @click="goCartPage"  :badge="cartCount"/>
            <van-goods-action-button color="#be99ff" type="warning" text="加入购物车" @click="addInCart"/>
            <van-goods-action-button color="#7232dd" type="danger" text="立即购买" />
        </van-goods-action>
  </div>
</template>

<script>
export default {
    data() {
        return {
           product:"" ,
           mainImageList:[],
           subImageList:[],
           cart:{
               userId:"",
               productId:"",
               quantity:1,
               checked:1,
           },
           cartCount:0,
           dot:true,
        }
    },
    mounted(){
        const id =  this.$route.query.id;
        if(id != null && id != ""){
            this.getProductDetail(id)
        }
    },
    created(){
        this.getCartProductCount()
    },
    methods:{
        async getCartProductCount(){
            console.log()
            const res = await this.$http.get("app/carts/count",{params:{id:this.$user.id}}); 
            this.cartCount = res.data.data
        },
        async addInCart(){
            this.cart.userId=this.$user.id
            this.cart.productId = this.product.id
            console.log(this.cart)
            const res = await this.$http.post("app/carts",this.$qs.stringify(this.cart)); 
            if(res.data.code == 0){
                this.$toast.success("添加成功")
            }else{
                this.$toast.fail("添加失败")
            }
            this.getCartProductCount();
        },
        goCartPage(){
            this.$router.push({path: '/Cart' })  
        },
        back(){
             this.$router.go(-1);
        },
        async getProductDetail(id){
             const res = await this.$http.get("app/products/one/"+id);
             this.mainImageList =  res.data.data.mainImage.split(",");
             this.subImageList = res.data.data.subImage.split(",");
             console.log(this.mainImageList)
             this.product = res.data.data
        }
    }
}
</script>

<style>
body{width: 100%;height: 100%;position: relative;background-color: rgb(238, 238, 238)}
.price{
    color: red;
    padding-top: 380px;
    padding-left: 20px;
    background-color: white;
}
.title{
    font-family: Helvetica,Helvetica,Arial,sans-serif;
    padding-top: 20px;
    padding-left: 20px;
      background-color: white;
}
.content{
    font-family:  Helvetica,Helvetica,Arial,sans-serif;
    padding-top: 5px;
    padding-left: 20px;
    font-size: 12;
      background-color: white;
}
.arrow-left{
    position: relative;
    float: left;
    z-index: 999; 
    margin-left: 7%;
    margin-top: 50px;
}
.main_image{
    width: 100%;
    height:370px;
   
    float: left;
    position:absolute;
}
.my-swipe {
  height: 370px;
}
.my-swipe .van-swipe-item {
  
    color: #fff;
    font-size: 20px;
    line-height: 370px;
    text-align: center;
    background-color: #39a9ed;
    width: 100%;
}
</style>
