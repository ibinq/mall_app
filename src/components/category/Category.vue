<template>

<div>
  <van-search
  v-model="value"
  shape="round"
  background="#fff"
  placeholder="请输入搜索关键词"
/>

<van-row>
  <van-col span="4" > 
    <van-sidebar v-model="activeKey" >
    <van-sidebar-item v-for="(item) in options" :key="item.id" :title="item.name" @click="getChildCategories(item.id)" />
  </van-sidebar>
  </van-col>
  <van-col span="18" offset="1"   >  
    <div v-for="(item) in childCategories" :key="item.id">
      <van-nav-bar
      :left-text="item.name"
      right-text="热销榜"
      />
      <van-grid :column-num="3">
        <van-grid-item v-for="value in item.children" :key="value.id" :icon="value.icon" :text="value.name" @click="getProductList(value.id,value.name)"/>
      </van-grid>
    </div>
    
  </van-col>
</van-row>
 

</div>
</template>
<script>
export default {
   data() {
    return {
      value:"123",
        options:[],
        activeKey: 0,
        childCategories:[]
    }
  },
  created(){
    this.getCategoryTree();
  },
  methods: {
    getProductList(categoryId,categoryName){
      this.$router.push({path: '/product',
          query: {   
            'categoryId':categoryId,
            'categoryName':categoryName
            
        }  })  
    },
    async getChildCategories(id){
      const r = await this.$http.get("app/categories/"+id);
      this.childCategories = r.data.data
      console.log(r.data.data);
    },
    async getCategoryTree(){
      const r = await this.$http.get("app/categories");
      this.options = r.data.data;
      this.getChildCategories(this.options[0].id)
    }
  } 
}
</script>
<style  >
 
</style>