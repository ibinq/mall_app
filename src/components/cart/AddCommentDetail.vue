<template>

<div>
<van-nav-bar
    title="评价"
    right-text="提交"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
    />

    <van-card
    :desc="product.subTitle"
    :title="product.title"
    :thumb="product.homeImage"
    >
    <template #tags>
      <van-rate v-model="star"   void-icon="star" void-color="#eee" />
    </template>
   
    </van-card>
    <van-field
        v-model="comment.content"
        rows="8"
        autosize
        type="textarea"
        maxlength="500"
        placeholder="请输入内容"
        show-word-limit
        />
 
       
</div>
</template>
<script>
export default {
    
   data() {
    return {
        product:{},
        fileList: [
        ],
        comment:{
            parentId:"",
            userId:"",
            productId:"",
            orderId:"",
            content:"",
            status:3,
     
        },
        star:0,
       
    }
  },
    mounted(){
        this.getProduct( this.$route.query.id);
        this.comment.userId = this.$user.id;
        this.comment.orderId = this.$route.query.orderId
    },
  methods:{

       async getProduct(id){
        const res = await this.$http.get("app/products/one/"+this.$user.id );
        this.product = res.data.data;
        this.comment.productId = this.product.id;

        const res1 = await this.$http.get("app/comment/one/",{
            params:{userId:this.comment.userId,productId:this.comment.productId,orderId:this.comment.orderId}
        } );
        this.comment.parentId = res1.data.data.id;
        this.star = res1.data.data.productStar

    },
      onClickLeft(){
          this.$router.push({path:"/comment" });
      },
      async onClickRight(){ console.log(this.comment)
            const res = await this.$http.post("app/comment",this.$qs.stringify( this.comment));
          console.log(res)
      }
  
  }
}
</script>
<style  >
 body{width: 100%;height: 100%;position: relative;background-color: rgb(238, 238, 238)}
 .van-field__label {
    width: 3em;
 }
 
 
.van-cell,.van-card{
    border-radius: 10px;;
     margin-top:13px;
}
.van-radio{
    margin-left: 10px;
    padding-bottom: 10px;
}
.other{
    margin-top:13px;
 background-color: white;
 border-radius: 10px;; 
}
</style>