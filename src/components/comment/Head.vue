<template>
  <div id="Head">
    <div class="headbar">
        <div class="container flex-box">
            <img src="@/images/logo.jpg" alt="">
            <div class="unlogin" v-if="!land"><Login v-on:logining="change"></Login></div>
            <div class="user" v-else>
                <b>{{userId}}</b>&nbsp;&nbsp;
                {{$store.state.userId}}
                <span @click="quit">退出</span>&nbsp;&nbsp;
                <el-badge :value="num" class="item">
                    <i class="iconfont icon-gouwuche"></i>
                </el-badge>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/comment/login'
import store from '@/store/index'
export default {
    name: 'Head',
    components:{
        Login,
    },
    props:['num'],
    data () {
        return {
            land:'',
            userId:'',
        }
    },
    methods:{
        quit:function(){
            if(this.common.getCookie('useInfo')){
                this.common.deleteCookie('useInfo')
            }else if (sessionStorage.getItem("user")) {
                sessionStorage.removeItem('user')
            };
            this.land = false;
            this.$router.push({path:'/'})
        },
        change:function(data){
            this.land = data[0];
            this.userId = data[1];
        },
        
    },
    mounted() {
        if(this.common.getCookie('useInfo')){
            this.land=true;
            this.userId=this.common.getCookie('useInfo');
        }else if (sessionStorage.getItem("user")) {
            this.land=true;
            let user =JSON.parse(sessionStorage.getItem("user"));
            this.userId = user;
        }
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#Head{

    .headbar{
        background-color: #fff;
        .container{
            height: 140px;
            align-items: center;
            justify-content: space-between;
            .unlogin{
                cursor: pointer;
                &:hover{
                    color: red;
                }
            }
            .user{
                i{
                    font-size: 22px;
                }
            }
        }
    }
}
</style>
