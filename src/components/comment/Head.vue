<template>
  <div id="Head">
    <div class="headbar">
        <div class="container flex-box">
            <img src="@/images/logo.jpg" alt="">
            <span>登录</span>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Head',
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
