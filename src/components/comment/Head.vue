<template>
  <div id="Head">
    <div class="headbar">
        <div class="container flex-box">
            <img src="@/images/logo.jpg" alt="">
            <div class="unlogin" v-if="!land"><Login></Login></div>
            <div class="user" v-else>
                <b>{{userId}}</b>&nbsp;&nbsp;
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
import store from '@/vuex/store'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'Head',
    components:{
        Login,
    },
    store,
    data () {
        return {
            
        }
    },
    methods:{
        ...mapMutations(['isLogin','isQuit','shoppingCar']),   
        quit:function(){
            this.isQuit();
            this.$router.push({path:'/'})
        }
    },
    computed: {
        ...mapState(['userId', 'land','num']),
    },
    mounted() {
        if(this.common.getCookie('useInfo')){
            this.isLogin()
            // this.shoppingCar(this.userId)
        }else if (sessionStorage.getItem("user")) {
            this.isLogin()
            // this.shoppingCar(this.userId)
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
