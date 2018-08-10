<template>
  <div id="MainPage">
    <Head :num="num"></Head>

    <div class="status">
        <div class="container">
            <router-link :to="{path:''}">主页</router-link>/
            <router-link :to="{path:''}">商品</router-link>
        </div>
    </div>

    <div class="content">
        <div class="condition container">
            <p>
                排序：<span>默认</span><span @click="sorting">价格</span><span class="sort" :class="{active:!isUp}">↑</span>
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
                        <span>￥{{item.productPrice}}.00</span>
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
export default {
    name: 'MainPage',
    components:{
        Head
    },
    data () {
        return {
            userId:'',
            num:'',
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
        shoppingCar:function(){
            this.axios({
                method:'GET',
                url:'/api/users/carlist',
                params:{
                    userId:this.userId
                }
            })
            .then((res)=>{
                console.log(res)
                this.num = res.data.result.length
            })
            .catch((err)=>{

            })
        },
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
            console.log(this.$route.query.price)
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
                    console.log(res)
                    this.shoppingCar()
                })
                .catch((err)=>{
                    console.log(err)
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
                console.log(res)
                this.page++;
                let goods = res.data;
                this.goodsList = this.goodsList.concat(goods);
                this.isLoading = false;
            })
            .catch((err)=>{
                console.log(err)
            })
        }
    },
    mounted(){
        this.init()
        window.addEventListener("scroll", this.scroll)
        if(this.common.getCookie('useInfo')){
            this.userId=this.common.getCookie('useInfo');
            this.shoppingCar()
        }else if (sessionStorage.getItem("user")) {
            let user =JSON.parse(sessionStorage.getItem("user"));
            this.userId = user;
            this.shoppingCar()
        }
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
