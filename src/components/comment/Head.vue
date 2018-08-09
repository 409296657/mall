<template>
  <div id="Head">
    <div class="headbar">
        <div class="container flex-box">
            <img src="@/images/logo.jpg" alt="">
            <span><Login></Login></span>
        </div>
    </div>
  </div>
</template>

<script>
import Login from '@/components/comment/login'
export default {
    name: 'Head',
    components:{
        Login,
    },
    data () {
        return {
      
        }
    }
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
            span{
                cursor: pointer;
                &:hover{
                    color: red;
                }
            }
        }
    }
}
</style>
