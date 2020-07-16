<template>

<div>
   
   <van-form @submit="onSubmit">
  <van-field
    v-model="user.username"
    name="用户名"
    label="用户名"
    placeholder="用户名"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <van-field
    v-model="user.password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>
 
</div>
</template>
<script>
export default {
   data() {
    return {
        user:{
            username: '',
            password: '',
        }
    
    }
  },

  methods:{
    async onSubmit() {
        const res = await this.$http.post("app/users/login",this.$qs.stringify(this.user)); 
        //1.将登录成功后的token保存到客户端的sessionStorage中
        window.sessionStorage.setItem("Authentication", res.data.data.token);
        const json = JSON.stringify( res.data.data.user);
        window.sessionStorage.setItem("User", json);
        //2跳转到后台主页。
        this.$router.push("/Mine");
    },
  }
}
</script>
<style  >
 
</style>