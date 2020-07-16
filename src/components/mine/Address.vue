<template>

<div  >
    <van-nav-bar
    title="地址管理"
    right-text="删除"
    left-arrow
    @click-left="onClickLeft"
    @click-right="onClickRight"
  />
<van-address-list
  v-model="chosenAddressId"
  :list="list"
  default-tag-text="默认"
  @add="onAdd"
  @edit="onEdit"
  @click-item="getNewAddress"
/>
</div>
</template>
<script>
export default {
   data() {
    return {
      chosenAddressId: '1',
      list: [],
      index:-1,
    }
  },
  mounted(){
    const index =  this.$route.query.index;
    if(index == null){
      this.index = -1;
    }else{
      this.index = index;
    }
    
  },
  created(){
    this.getAddressList();
  },
  methods:{
    getNewAddress(item,index){
      console.log(this.index)
        if(this.index != -1){
          this.$router.push({path: '/order',
            query: {   
                'index':item.id
              }  
          })  
        }
        
    },
    async getAddressList(){
       const res = await this.$http.get("app/addresses/list/"+this.$user.id); 
       this.list=res.data.data
       console.log(res);
    },
    onAdd() {
     this.$router.push({path: '/addAddress',
          query: {   
            'param':"新增地址"
          
        }  })  
    },
    onEdit(item, index) {
        console.log(item)
      console.log(index)
      this.$router.push({path: '/addAddress',
          query: {   
                  'id':item.id,
                  'param':"编辑地址"
                
              }  
      })  
    
    },
    onClickLeft() {
      this.$router.push({path: '/Mine'})  
    },
    async onClickRight(){
      // console.log(this.chosenAddressId)
       const res = await this.$http.delete("app/addresses/"+this.chosenAddressId); 
       if(res.data.code == 0){
        this.$toast.success("删除成功")
         this.getAddressList();
      }else{
        this.$toast.fail("删除失败")
      }
    }
  }
}
</script>
<style  > 
body{width: 100%;height: 100%;position: relative;background-color: rgb(238, 238, 238)}
</style>