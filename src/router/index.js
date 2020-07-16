import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index.vue'
import Login from '@/components/Login.vue'
import Home from '@/components/home/Home.vue'
import Category from '@/components/category/Category.vue'
import Cart from '@/components/cart/Cart.vue'
import Order from '@/components/cart/Order.vue'
import Comment from '@/components/cart/Comment.vue'
import CommentDetail from '@/components/cart/CommentDetail.vue'
import AddCommentDetail from '@/components/cart/AddCommentDetail.vue'
import OrderDetail from '@/components/cart/OrderDetail.vue'
import Mine from '@/components/mine/Mine.vue'
import Address from '@/components/mine/Address.vue'
import AddAddress from '@/components/mine/AddAddress.vue'
import Product from '@/components/product/Product.vue'
import ProductDetail from '@/components/product/ProductDetail.vue'
Vue.use(Router)

export default new Router({
  routes: [
   
    {
      path: '/',
      component: Index,
      redirect: '/Home',
      children:
          [
              { path: '/Home', component: Home },
              { path: '/Category', component: Category },
              { path: '/Cart', component: Cart },
              { path: '/order', component: Order },
              { path: '/comment', component: Comment },
              { path: '/commentDetail', component: CommentDetail },
              { path: '/addCommentDetail', component: AddCommentDetail },
              { path: '/orderDetail', component: OrderDetail },
              { path: '/Mine', component: Mine },
              { path: '/address', component: Address },
              { path: '/addAddress', component: AddAddress },
              { path: '/product', component: Product },
              { path: '/productDetail', component: ProductDetail },
              { path: '/login', component: Login },
          ]
  }
  ]
})
