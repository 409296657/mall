<template>
  <div id="ShoppingCar">
    <Head></Head>

    <div class="status">
        <div class="container">
            <router-link :to="{path:'/'}">主页</router-link>/
            <router-link :to="{path:''}">购物车</router-link>
        </div>
    </div>

    <div class="content">
        <div class="container">
            <p>购物车</p>
            <div class="goodList">
                <div class="titleBar">
                    <span>商品</span>
                    <span>价格</span>
                    <span>数量</span>
                    <span>总价</span>
                    <span>编辑</span>
                </div>
                <div class="goods">
                    <div class="good flex-box" v-for="item in goodsList" :key="item.Id">
                        <div class="commodity flex-box item-box">
                            <div class="select" @click="select(item)">
                                <img v-show="item.checked" src="@/images/finish.png" alt="">
                            </div>
                            <div class="pic">
                                <img :src="require(`@/images/${item.productImage}`)" alt="">
                            </div>
                            <span>{{item.productName}}</span>
                        </div>
                        <div class="price item-box">
                            {{item.salePrice|toPrice}}
                        </div>
                        <div class="num item-box">
                            <el-input-number v-model="item.productNum" size="small" :min="1" @change="handleChange(item)"></el-input-number>
                        </div>
                        <div class="totalPrice item-box">
                            {{item.productNum*item.salePrice|toPrice}}
                        </div>
                        <div class="edit item-box">
                            <i class="iconfont icon-lajitong" @click="delect(item.productId)"></i>
                        </div>
                    </div>
                </div>
                <div class="all flex-box">
                    <div class="left flex-box">
                        <div class="select flex-box">
                            <div class="circle" @click="allSelect">
                                <img src="@/images/finish.png" alt="" v-show="all">
                            </div>
                            <span>全部</span>
                        </div>
                        <div class="price">
                            合计: <span>{{totalPrice|toPrice}}</span>
                        </div>
                    </div>
                    <router-link :to="{path:'/order'}">
                        <div class="right">
                            去结算
                        </div>
                    </router-link>
                </div>
            </div>
        </div>

    
    </div>
  </div>
</template>

<script>
import Head from '@/components/comment/Head'
import store from '@/vuex/store'
import { mapState, mapMutations } from 'vuex'
export default {
    name: 'ShoppingCar',
    components:{
        Head
    },
    store,
    data () {
        return {
            goodsList:[],
            isLoad:true,
        }
    },
    methods:{
        ...mapMutations(['shoppingCar']),
        allSelect:function(){
            this.axios({
                method:'POST',
                url:'/api/users/carCheckAll',
                data:{
                    userId:this.userId,
                    checked:this.all?0:1,
                }
            })
            .then((res)=>{
                this.init()
            })
            .catch((err)=>{
            })
        },
        handleChange:function(data){
            this.axios({
                method:'POST',
                url:'/api/users/carEdit',
                data:{
                    Id:data.Id,
                    productNum:data.productNum,
                    checked:data.checked
                }
            })
            .then((res)=>{
                
            })
            .catch((err)=>{
            })
        },
        select:function(data){
            if(this.isLoad){
                this.isLoad = false
                this.axios({
                    method:'POST',
                    url:'/api/users/carEdit',
                    data:{
                        Id:data.Id,
                        productNum:data.productNum,
                        checked:data.checked == 0?1:0
                    }
                })
                .then((res)=>{
                    this.init();
                    this.isLoad = true;
                })
                .catch((err)=>{
                })
            }
        },
        delect:function(data){
            this.axios({
                method:'POST',
                url:'/api/users/carDel',
                data:{
                    userId:this.userId,
                    productId:data
                }
            })
            .then((res)=>{
                this.goodsList = []
                this.shoppingCar()
                this.init()
            })
            .catch((err)=>{
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
                this.goodsList = res.data.result;
            })
            .catch((err)=>{

            })
        },
    },
    computed: {
        ...mapState(['userId']),
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
        all:function(){
            let a = this.goodsList.every((item)=>{
                return item.checked == 1
            })
            return a
        }
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
#ShoppingCar{
    
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
                    width: 380px;
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
                        width: 380px;
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
            .all{
                height: 40px;
                border: 1px solid #dbd9db;
                margin-bottom: 100px;
                .right{
                    width: 100px;
                    background-color: #d1434a;
                    color: #fff;
                    line-height: 40px;
                    text-align: center;
                }
                .left{
                    flex:1;
                    justify-content: space-between;
                    align-items: center;
                    .select{
                        padding-left: 20px;
                        .circle{
                            width: 20px;
                            height: 20px;
                            margin-right: 30px;
                            border: 1px solid #dbd9db;
                            border-radius: 50%;
                            cursor: pointer;
                            img{
                                width: 100%;
                                height: 100%;
                            }
                        }
                    }
                    .price{
                        padding-right: 20px;
                        span{
                            color: #d1434a
                        }
                    }
                }
            }
        }
    }
}
</style>
