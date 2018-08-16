<template>
  <div id="OrderSuccess">
    <Head></Head>

    <div class="content">
        <div class="container">
            <div class="pic flex-box">
                <img src="@/images/orderSuccess.png" alt="">
            </div>
            <p>恭喜您!</p>
            <p>您的订单已经完成!</p>
            <p>
                <span>订单号:{{this.$route.query.orderId}}</span>&nbsp;&nbsp;
                <span>订单合计:{{this.$route.params.price|toPrice}}</span>
            </p>
            <router-link :to="{path:'/'}">
                <div class="btn">
                    返回商品列表
                </div>
            </router-link>
        </div>
    </div>
  </div>
</template>

<script>
import Head from '@/components/comment/Head'
export default {
    name: 'OrderSuccess',
    components:{
        Head
    },
    data () {
        return {
            
        }
    },
    methods:{
        
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#OrderSuccess{
    
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
    .content{

        .pic{
            justify-content: center;
            margin-top: 100px;
        }
        p{
            text-align: center;
            font-size: 30px;
            span{
                font-size: 16px;
                color: #a1a1a1;
            }
        }
        .btn{
            width: 150px;
            height: 40;
            line-height: 40px;
            color: #fff;
            background-color: #d1434a;
            margin: 30px auto;
            text-align-last: center
        }
    }
}
</style>
