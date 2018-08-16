<template>
  <div id="Order">
    <Head></Head>

    <div class="status">
        <div class="container">
            <router-link :to="{path:'/'}">主页</router-link>/
            <router-link :to="{path:''}">订单确认</router-link>
        </div>
    </div>

    <div class="content">
        <div class="container">
            <p>订单详情</p>
            <div class="goodList">
                <div class="titleBar">
                    <span>商品</span>
                    <span>价格</span>
                    <span>数量</span>
                    <span>总价</span>
                </div>
                <div class="goods">
                    <div class="good flex-box" v-for="item in goodsList" :key="item.Id">
                        <div class="commodity flex-box item-box">
                            <div class="pic">
                                <img :src="require(`@/images/${item.productImage}`)" alt="">
                            </div>
                            <span>{{item.productName}}</span>
                        </div>
                        <div class="price item-box">
                            {{item.salePrice|toPrice}}
                        </div>
                        <div class="num item-box">
                            {{item.productNum}}
                        </div>
                        <div class="totalPrice item-box">
                            {{item.productNum*item.salePrice|toPrice}}
                        </div>
                    </div>
                </div>

                <div class="flex-box settlement">
                    <div class="money">
                        <p>{{totalPrice|toPrice}}</p>
                        <p>{{freight|toPrice}}</p>
                        <p>{{discount|toPrice}}</p>
                        <p>{{total|toPrice}}</p>
                    </div>
                    <div class="describe">
                        <p>商品总价:</p>
                        <p>快递费:</p>
                        <p>折扣:</p>
                        <p>合计:</p>
                    </div>
                </div>

                <div class="all flex-box">
                    <router-link :to="{path:'/car'}">
                        <div class="right">
                            上一步
                        </div>
                    </router-link>

                    <div class="right" @click="confirm">
                        确认支付
                    </div>
                    
                </div>
            </div>
        </div>

    
    </div>
  </div>
</template>

<script>
import Head from '@/components/comment/Head'
import store from '@/vuex/store'
import { mapState } from 'vuex'
export default {
    name: 'Order',
    components:{
        Head
    },
    store,
    data () {
        return {
            freight:10,
            discount:200,
            goodsList:[],
        }
    },
    methods:{
        confirm:function(){
            let orderId = new Date().getTime();
            this.$router.push({
                name:'OrderSuccess',
                params:{
                    price:this.total
                },
                query:{
                    orderId:orderId
                }
            })
        },
        init:function(){
            this.axios({
                method:'GET',
                url:'/api/users/carlist',
                params:{
                    userId:this.userId
                }
            })
            .then((res)=>{
                this.goodsList = res.data.result.filter((item)=>{
                    return item.checked == 1
                })
            })
            .catch((err)=>{

            })
        },
    },
    computed: {
        ...mapState(['userId']),
        total:function(){
            return this.totalPrice+this.freight-this.discount
        },
        totalPrice:function(){
            let all = 0;
            for(let item of this.goodsList){
                let p = item.salePrice*item.productNum;
                if(item.checked==1){
                    all += p
                }
            }
            return all
        },
    },
    mounted(){
        this.init()
    },
    watch:{
        
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#Order{
    
    .status{
        background: #f0f0f0;
        line-height: 90px;
        color: #a1a1a1;
        a{
            font-size: 14px;
            color: #a1a1a1;
        }
    }
    .content{
        background-color: #f5f7fc;
        padding-top: 30px;
        p{
            font-size: 28px;
        }
        .goodList{

            .titleBar{
                display: flex;
                background-color: #605f61;
                font-size: 16px;
                color: #fff;
                height: 40px;
                line-height: 40px;
                span{
                    width: 400px;
                    text-align: center;
                    display: inline-block;
                    & + span{
                        flex: 1;
                    }
                }
            }
            .goods{
                border: 1px solid #dbd9db;
                margin-bottom: 20px;
                .good{
                    height: 100px;
                    align-items: center;
                    .item-box{
                        line-height: 40px;
                        width: 400px;
                        text-align: center;
                        box-sizing: border-box;
                        & + .item-box{
                            flex: 1;
                        }
                    }
                    .commodity{
                        align-items: center;
                        padding-left: 20px;
                        .select{
                            width: 20px;
                            height: 20px;
                            border: 1px solid #dbd9db;
                            border-radius: 50%;
                            font-size: 0;
                            cursor: pointer;
                            img{
                                display: inline-block;
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .pic{
                            width: 60px;
                            height: 60px;
                            border: 1px solid #dbd9db;
                            margin-left: 40px;
                            img{
                                display: inline-block;
                                height: 100%;
                                width: 100%;
                            }
                        }
                        span{
                            margin-left: 60px;
                        }
                    }
                }
            }
            .settlement{
                flex-direction:row-reverse;
                p{
                    font-size: 16px;
                    line-height: 16px;
                }
                .describe{
                    width: 80px;
                    color: #a1a1a1
                }
                .money{

                    p:last-child{
                        color: #d1434a
                    }
                }
            }
            .all{
                height: 40px;
                margin-bottom: 100px;
                justify-content: space-between;
                .right{
                    width: 100px;
                    background-color: #d1434a;
                    color: #fff;
                    line-height: 40px;
                    text-align: center;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
