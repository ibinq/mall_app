<template>
<div>
    <van-nav-bar
    :title="param"
    left-arrow
    @click-left="onClickLeft"
  />
<van-address-edit
  :area-list="areaList"
  :address-info="AddressInfo"
  show-postal
  show-delete
  show-set-default
  show-search-result
  :search-result="searchResult"
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="onSave"
  @delete="onDelete"
  @change-detail="onChangeDetail"
/>
  
</div>

</template>
<script>
import areaList from "../../assets/js/area.js";
export default {
   data() {
    return {
      areaList,
      searchResult: [],
      currentAddressId:"",
      AddressInfo:{
        name:'',//姓名
        tel:'',//电话
        province:'',//省份
        city:'',//城市
        country:'',//区县
        areaCode:'',//地址code：ID
        addressDetail:'',//详细地址
        isDefault:false,//是否选择默认
        id:"",
        userId:"",
      },
      param:"",
    }
  },
  mounted(){
    this.param = this.$route.query.param;
    this.currentAddressId = this.$route.query.id;
     const id =  this.currentAddressId;
      if(id != null && id != ""){
          this.getAddressInfo(id)
          
      }
    this.AddressInfo.userId = this.$user.id
  },
  methods:{
     async onSave(content) {
       if(this.currentAddressId != null && this.currentAddressId != ""){//编辑
          const res = await this.$http.put("app/addresses",this.$qs.stringify(content)); 
          if(res.data.code == 0){
            this.$toast.success("保存成功")
             this.$router.push({path: '/address'  }) 
          }else{
             this.$toast.success("保存失败")
          }
       }else{//新增
      //  console.log(content);
          const res = await this.$http.post("app/addresses",this.$qs.stringify(content)); 
       }
      
    },
    async getAddressInfo(id) {
        const res = await this.$http.get("app/addresses/"+id); 
        this.AddressInfo = res.data.data
      console.log(this.AddressInfo)
    },
    async onDelete(content) {
      const res = await this.$http.delete("app/addresses/"+content.id); 
      if(res.data.code == 0){
        this.$toast.success("删除成功")
        this.$router.push({path:'/address'}) 
      }else{
        this.$toast.fail("删除失败")
      }
    },
    onChangeDetail(val) {
      if (val) {
          
        this.searchResult = [
          {
            // name: '黄龙万科中心',
            // address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
     onClickLeft() {
      this.$router.push({path: '/address'})  
    },
  }
}
</script>
<style  >
 /* .van-tabbar{
     display: none;
 } */
</style>