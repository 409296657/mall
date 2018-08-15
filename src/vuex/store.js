import Vue from 'vue'
import Vuex from 'vuex'
import common from '@/utils/common';
import axios from 'axios'
Vue.use(Vuex);

const state = {
    land:'',
    userId:'',
    num:'',
}

const mutations = {
    shoppingCar:function(data){ 
        axios({
            method:'GET',
            url:'/api/users/carlist',
            params:{
                userId:data
            }
        })
        .then((res)=>{
            state.num = res.data.result.length
        })
        .catch((err)=>{

        })
    },
    isLogin:function(state){  //检查用户是否登陆
        if(common.getCookie('useInfo')){
            state.land=true;
            let user = common.getCookie('useInfo');
            state.userId=user;
        }else if (sessionStorage.getItem("user")) {
            state.land=true;
            let user =JSON.parse(sessionStorage.getItem("user"));
            state.userId = user;
        }
        let id = state.userId;
        this.commit('shoppingCar',id)
    },
    isQuit:function(state){  //退出登陆
        if(common.getCookie('useInfo')){
            common.deleteCookie('useInfo')
        }else if (sessionStorage.getItem("user")) {
            sessionStorage.removeItem('user')
        };
        state.land = false;
        state.userId = '';
        state.num = '';
    },
}

const mapActions = {
    
}

export default new Vuex.Store({
    state,
    mutations
})