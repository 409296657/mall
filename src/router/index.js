import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/MainPage/MainPage'
import ShoppingCar from '@/pages/ShoppingCar/ShoppingCar'

Vue.use(Router)

export default new Router({
    mode:'history',
    routes: [
        {
            path: '/',
            name: 'MainPage',
            component: MainPage
        },{
            path: '/car',
            name: 'ShoppingCar',
            component: ShoppingCar
        },
    ]
})
