import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/pages/MainPage/MainPage'
import ShoppingCar from '@/pages/ShoppingCar/ShoppingCar'
import Order from '@/pages/Order/Order'
import OrderSuccess from '@/pages/OrderSuccess/OrderSuccess'

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
        },{
            path: '/order',
            name: 'Order',
            component: Order
        },{
            path: '/ordersuccess',
            name: 'OrderSuccess',
            component: OrderSuccess
        },
    ]
})
