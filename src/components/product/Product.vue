<template>
  <div >
      <van-nav-bar
        :title="categoryName"
        left-arrow
        @click-left="onClickLeft"
        />
   <div class="product" v-for="item in product" :key="item.id"  @click="detail(item.id)">
    <img class="product_images" :src=item.homeImage>
    
    <div  style="margin-left:10px"><span>{{item.title}}</span></div>
    <div  style="margin-left:10px;margin-top:10px"><span>￥{{item.price}}</span></div>
  </div> 

  </div>
</template>

<script>
export default {
    data() {
        return {
            categoryId:"",
            product:[],
            categoryName:"",

        }
    },
    mounted(){
        this.categoryId = this.$route.query.categoryId;
        const id =  this.categoryId;
        this.categoryName = this.$route.query.categoryName;
        if(id != null && id != ""){
            this.getProductList(id)
        }
    },
    created(){
        
    },
    methods:{
        detail(id){
            this.$router.push({path: '/productDetail',
            query: {   
                'id':id,
                
            }  })  
        },
        onClickLeft(){
            this.$router.push({path: '/Category' })  
        },
        async getProductList(id){
        const res = await this.$http.get("app/products/"+id); 
        this.product = res.data.data
        console.log(res);
        }
    }
}
</script>

<style>
body{width: 100%;height: 100%;position: relative;background-color: rgb(238, 238, 238)}
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
