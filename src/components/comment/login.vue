<template>
  <div class="login">
    <span @click="centerDialogVisibleLogin = true">登陆</span>
    <el-dialog
      title="用户登录"
      :visible.sync="centerDialogVisibleLogin"
      width="360px"
      :close-on-click-modal="false"
      :lock-scroll="false"
      center>
      <form class="">
        <input type="text" name="" placeholder="请输入账号" v-model="mobile">
        <input type="password" name="" placeholder="请输入密码" v-model="psw">
        <div class="check"><span>7天内自动登陆  </span><el-checkbox v-model="save"></el-checkbox></div>
        <el-button type="primary" @click="login">登 录</el-button>
      </form>
    </el-dialog>

  </div>


</template>

<script>
import store from '@/vuex/store'
import { mapMutations } from 'vuex'
export default {
  name:'login',
  data(){
    return{
      save:'',
      mobile:'',
      psw:'',
      centerDialogVisibleRegister: false,
      centerDialogVisibleLogin: false,
    }
  },
  store,
  methods:{
    ...mapMutations(['isLogin','shoppingCar']),
    login(){
      this.axios({
        method:'POST',
        url:'/api/users/login',
        data:{
          'userName':this.mobile,
          'userPwd':this.psw,
        }
      })
      .then((res)=>{
        console.log(res)
        if(res.data.status==0){
          if (this.save) {
            this.centerDialogVisibleLogin = false
            let userData = res.data.result.userName;
            this.common.setCookie('useInfo',userData,'7')
          }else{
            this.centerDialogVisibleLogin = false
            let userData = res.data.result.userName;
            sessionStorage.setItem("user",JSON.stringify(userData));
            let user =JSON.parse(sessionStorage.getItem("user"));
          }
          this.isLogin()
          // this.shoppingCar()
        }else{
          alert('用户名或密码错误')
        }
      })
      .catch((err)=>{

      })
    }
  }
}
</script>


<style>
.login .info span{
  cursor: pointer;
}
.login .el-dialog{
  height: 350px;
  margin: 0 auto;
}
.login .el-dialog .el-button{
  width: 200px;
  display: block;
  margin: 0 auto;
  margin-top: 40px;
}
.login .el-dialog input{
  width: 300px;
  height: 40px;
  margin: 0;
  text-indent: 10px;
  font-size: 16px;
  margin-bottom: 20px;
}
.login .el-dialog form .info{
  width: 300px;
  display:flex;
  justify-content: space-between;
}
.login a{
  color: inherit;
  text-decoration: none;
}
.login .check{
  width: 115px !important;
  margin-bottom: 5px;
}


</style>
