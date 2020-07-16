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
      <van-rate v-model="comment.productStar"   void-icon="star" void-color="#eee" />
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
        <div class="imageList" >
            <van-uploader v-model="fileList" multiple   :before-read ="uploadImage" />
           <van-field >
            <template #input>
                <van-checkbox name="1" v-model="comment.status" shape="square">匿名评价</van-checkbox>
            </template>
            </van-field>
             
        </div>
         <div class="other" >
            <van-field  label="物流服务评价" label-width="12em"	>
            </van-field>
            <van-field name="rate" label="评分">
            <template #input>
                <van-rate v-model="comment.deliveryStar" />
            </template>
            </van-field>
            <van-field name="rate" label="评分">
            <template #input>
                <van-rate v-model="comment.speedStar" />
            </template>
            </van-field>
            <van-field name="rate" label="评分">
            <template #input>
                <van-rate v-model="comment.serviceStar" />
            </template>
            </van-field>
        </div>
       
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
            parentId:0,
            userId:"",
            productId:"",
            orderId:"",
            content:"",
            imageList:"",
            status:"",
            productStar:0,
            deliveryStar:0,
            speedStar:0,
            serviceStar:0
        }
       
    }
  },
    mounted(){
        this.getProduct( this.$route.query.id);
        this.comment.userId = this.$user.id;
        this.comment.orderId = this.$route.query.orderId
        console.log(this.$route.query.orderId)
    },
  methods:{
      async uploadImage(file){
            let params = new FormData()
            params.append('file', file)
            let config = {
                headers: { //添加请求头
                    'Content-Type': 'multipart/form-data'
                }
            } 
           const res = await this.$http.post(
               "app/upload/image", 
                params, config
            );
           this.comment.imageList = this.comment.imageList +"," + res.data
      },
       async getProduct(id){
        const res = await this.$http.get("app/products/one/"+this.$user.id );
        this.product = res.data.data;
        this.comment.productId = this.product.id;
    },
      onClickLeft(){
          this.$router.push({path:"/comment" });
      },
      async onClickRight(){ console.log(this.comment)
           this.comment.imageList = this.comment.imageList.slice(1);
            const res = await this.$http.post("app/comment/",this.$qs.stringify( this.comment));

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
.imageList{
 margin-top:13px;
 background-color: white;
 border-radius: 10px;;
 }
 .van-uploader__preview,.van-uploader__upload {
    margin:  8px 8px ;
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