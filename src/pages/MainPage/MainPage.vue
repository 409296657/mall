<template>
  <div id="MainPage">
    <Head></Head>

    <div class="shadow" v-show="car">
        <div class="flex-box">
            <div class="card">
                <p>加入购物车成功</p>
                <div class="btn-box">
                    <div class="btn" @click="car=''">继续购物</div>
                    <router-link :to="{path:'/car'}"><div class="btn">查看购物车</div></router-link>
                </div>
            </div>
        </div>
    </div>

    <div class="status">
        <div class="container">
            <router-link :to="{path:''}">主页</router-link>/
            <router-link :to="{path:''}">商品</router-link>
        </div>
    </div>

    <div class="content">
        <div class="condition container">
            <p>
                排序：<span>默认</span><span class="price" @click="sorting">价格</span><span class="sort" :class="{active:!isUp}">↑</span>
            </p>
        </div>

        <div class="goods container flex-box">
            <div class="price">
                <div class="section" v-for="(item,index) in priceList" :key="item.id" :class="{active:isActive==item.id}" @click="selectPrice(item,index)">
                    <span>{{item.price}}</span>
                </div>
            </div>
            <div class="goodsList">
                <router-link :to="{path:''}" v-for="item in goodsList" :key="item.id">
                    <div class="goodsBox">
                        <img :src="require(`@/images/${item.productImg}`)">
                        <p>{{item.productName}}</p>
                        <span>{{item.productPrice|toPrice}}</span>
                        <div class="btn" @click.prevent="addShoppingCar(item)">
                            加入购物车
                        </div>
                    </div>
                </router-link>
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
    name: 'MainPage',
    components:{
        Head
    },
    store,
    data () {
        return {
            car:'',
            isUp:true,
            isLoading:true,
            goodsList:[],
            page:0,
            isActive:this.$route.query.price?this.$route.query.price:4,
            priceList:[
                {id:4,price:'全部'},
                {id:0,price:'0-100'},
                {id:1,price:'100-500'},
                {id:2,price:'500-1000'},
                {id:3,price:'1000-8000'},
            ]
        }
    },
    methods:{
        ...mapMutations(['shoppingCar']),
        sorting:function(){
            function sortUp(type){
                return function(obj1,obj2){
                    if(obj1[type]<obj2[type]){
                        return -1;
                    }else if(obj1[type]===obj2[type]){
                        return 0;
                    }else{
                        return 1;
                    }
                };
            };
            function sortDown(type){
                return function(obj1,obj2){
                    if(obj1[type]<obj2[type]){
                        return 1;
                    }else if(obj1[type]===obj2[type]){
                        return 0;
                    }else{
                        return -1;
                    }
                };
            };
            if(this.isUp){
                this.goodsList.sort(sortDown('productPrice'))
                this.isUp = !this.isUp
            }else{
                this.goodsList.sort(sortUp('productPrice'))
                this.isUp = !this.isUp
            }
        },
        scroll:function(){
            let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight;
            if (bottomOfWindow <= 0 && this.isLoading == false){
                this.isLoading = true;
                    this.axios({
                    method:'GET',
                    url:'/api/goods/list',
                    params:{
                        page:this.page,
                        pageSize:8,
                        orderFlag:true,
                        priceLevel:this.isActive,
                    }
                })
                .then((res)=>{
                    this.page++;
                    let goods = res.data;
                    this.goodsList = this.goodsList.concat(goods)
                    this.isLoading = false
                })
            }
        },
        selectPrice:function(item,index){
            this.page = 0;
            this.isUp = true;
            let data = {
                price:item.id,
            }
            this.$router.push({path:'/',query:data})
        },
        addShoppingCar:function(data){
            if(this.userId){
                this.axios({
                    method:'POST',
                    url:'/api/goods/addCar',
                    data:{
                        productId:data.productId,
                        userId:this.userId
                    }
                })
                .then((res)=>{
                    this.shoppingCar(this.userId)
                    this.car = 1;
                })
                .catch((err)=>{
                    
                })
            }else{
                alert('请登陆后操作')
            }
        },
        init:function(){
            this.axios({
                method:'GET',
                url:'/api/goods/list',
                params:{
                    page:this.page,
                    pageSize:8,
                    orderFlag:true,
                    priceLevel:this.isActive,
                }
            })
            .then((res)=>{
                this.page++;
                let goods = res.data;
                this.goodsList = this.goodsList.concat(goods);
                this.isLoading = false;
            })
            .catch((err)=>{

            })
        }
    },
    computed: {
        ...mapState(['userId']),
    },
    mounted(){
        this.init()
        window.addEventListener("scroll", this.scroll)
    },
    watch:{
        '$route' (to,from){
            this.isActive = this.$route.query.price;
            this.goodsList = [];
            this.init()
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#MainPage{
    
    .shadow{
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .7);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
        .flex-box{
            justify-content: center;
            align-items: center;
            width: 500px;
            height: 300px;
            background-color: #fff;
            .card{

                p{
                    font-size: 24px;
                    text-align: center;
                }
                .btn-box{
                    display: flex;
                    .btn{
                        width: 150px;
                        height: 40px;
                        margin: 10px 20px;
                        background-color: #1e90ff;
                        color: #fff;
                        font-size: 18px;
                        line-height: 40px;
                        text-align: center;
                        cursor: pointer;
                    }
                }
            }
        }
    }
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
        padding-top: 120px;
        .condition{
            background-color: #fff;
            line-height: 110px;
            margin-bottom: 60px;
            padding: 0 50px;
            p{
                margin: 0;
                text-align: right;
                span{
                    margin-left: 20px;
                }
                .price{
                    cursor: pointer;
                    &:hover{
                        color: #ee7a23
                    }
                }
                .sort{
                    margin:0 10px;
                    transition: .3s;
                    display: inline-block;
                    &.active{
                        transform: rotate(180deg);
                    }
                }
            }
        }
        .goods{

            .price{
                padding-left: 30px;
                width: 200px;
                .section{
                    margin: 50px 0;
                    border-left: 2px solid transparent;
                    box-sizing: border-box;
                    cursor: pointer;
                    transition: .5s;
                    &.active{
                        color: #ee7a23;
                        border-left: 2px solid #ee7a23;
                        padding-left: 25px;
                    }
                    &:hover{
                        color: #ee7a23;
                        border-left: 2px solid #ee7a23;
                        padding-left: 25px;
                    }
                    &:first-child{
                        margin-top: 0;
                    }
                }
            }
            .goodsList{
                flex: 1;
                display: flex;
                flex-wrap: wrap;
                min-height: 800px;
                .goodsBox{
                    padding: 20px;
                    border: 2px solid #e9e9e9;
                    display: inline-block;
                    background-color: #fff;
                    margin: 0 0 14px 14px;
                    transition: .3s;
                    &:hover{
                        transform: translateY(-3px);
                        box-shadow: 3px 3px 3px #ff9900;
                    }
                    img{
                        width: 180px;
                        height: 180px;
                    }
                    p{
                        color: #605f5f;
                        font-weight: 700;
                        font-size: 18px;
                    }
                    span{
                        font-size: 18px;
                        color: #d1434a;
                    }
                    .btn{
                        margin-top: 30px;
                        border: 2px solid #d1434a;
                        line-height: 40px;
                        height: 40px;
                        text-align: center;
                        color: #d1434a;
                        width: 180px;
                        &:hover{
                            background-color: #e38e92;
                            color: #fff;
                        }
                    }
                }
            }
        }
    }
}
</style>
