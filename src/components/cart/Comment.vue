<template>

<div>
    <van-nav-bar
    title="评价管理"
    left-text="返回"
    left-arrow
    @click-left="onClickLeft"
    
    />
    <van-tabs v-model="active" swipeable swipe-threshold=2 animated @change="getProductCommentList"  >
        <van-tab title="待评价">
            <van-card v-for="product in products" :key="product.id"
            :desc="product.productName"
            :thumb="product.productImage"
            >
             <template #tags>
                <van-button size="small" round   @click="toCommentDetail(product.productId,product.orderId)">去评价</van-button>
            </template>
            </van-card>
        </van-tab>
        <van-tab title="追评">
             <van-card v-for="product in products" :key="product.id"
            :desc="product.productName"
            :thumb="product.productImage"
            >
             <template #tags>
                <van-button size="small" round type="info" @click="toAddCommentDetail(product.productId,product.orderId)">追加评价</van-button>
            </template>
            </van-card>
        </van-tab>
    </van-tabs>
 
</div>
</template>
<script>
export default {
  
   data() {
    return {
       products:[],
       active:""
       
    }
  },
   mounted(){
        this.getProductCommentList();
    },
  methods:{
    async getProductCommentList(){
        if(this.active === 0){
            const res = await this.$http.get("app/comment/list/"+this.$user.id );
            this.products = res.data.data;
        }else{
            const res = await this.$http.get("app/comment/list1/"+this.$user.id );
            this.products = res.data.data;
        }
    },
    toCommentDetail(id,orderId){
        // console.log(orderId)
        this.$router.push({path:"/commentDetail" ,
            query:{
                id:id,orderId:orderId
            }
        });
    },
    toAddCommentDetail(id,orderId){
        // console.log(orderId)
        this.$router.push({path:"/addCommentDetail" ,
            query:{
                id:id,orderId:orderId
            }
        });
    },
    onClickLeft(){
        this.$router.push({path:"/Mine" 
        });
    },
  
  }
}
</script>
<style  >
 body{width: 100%;height: 100%;position: relative;background-color: rgb(238, 238, 238)}
 .van-card{
     border-radius: 10px;
 }
 .van-button--small {
 
    margin-left: 170px;
    margin-top: 20px;
}
</style>