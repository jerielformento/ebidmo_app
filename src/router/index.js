import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Register from "../views/Register.vue";
import AuctionDetails from "../views/AuctionDetails.vue";
import ProductDetails from "../views/ProductDetails.vue";
import Vendor from "../views/Vendor.vue";
import VendorDashboard from "../views/VendorDashboard.vue";
import VendorBoard from "../components/vendor/Home.vue";
import VendorProducts from "../components/vendor/Products.vue";
import VendorAuction from "../components/vendor/Auction.vue";
import VendorTransaction from "../components/vendor/Transaction.vue";
import VendorSettings from "../components/vendor/Settings.vue";
import VendorAuctionView from "../components/vendor/ViewAuction.vue";
import VendorAuctionStats from "../components/vendor/AuctionStats.vue";
import Vendors from "../views/Vendors.vue";
import VendorDetails from "../views/VendorDetails.vue";
import Category from "../views/Category.vue";
import Sell from "../views/Sell.vue";
import Support from "../views/Support.vue";
import Hottest from "../views/Hottest.vue";
import Popular from "../views/Popular.vue";
import Profile from "../views/Profile.vue";
import Settings from "../views/Settings.vue";
import AddProduct from '../components/vendor/AddProduct.vue';
import EditProduct from '../components/vendor/EditProduct.vue';
import ViewAuction from '../views/ViewAuction.vue';
import PageNotFound from '../views/static/PageNotFound.vue';
import store from '../store';
import axiosClient from "../axios";

const routes = [
    // default route
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: 'Home' }
    },
    {
        path: '/me/profile',
        name: 'profile',
        component: Profile,
        meta: { requiresAuth: true, title: 'Your Profile' },
    },
    {
        path: '/me/settings',
        name: 'settings',
        component: Settings,
        meta: { requiresAuth: true, title: 'Settings' },
    },
    // hottest items route
    {
        path: '/hottest',
        name: 'hottest',
        component: Hottest,
        meta: { requiresAuth: true, title: 'Hottest' }
    },
    // hottest items route
    {
        path: '/popular',
        name: 'popular',
        component: Popular,
        meta: { requiresAuth: true, title: 'Popular' }
    },
    // vendor routes
    {
        path: '/me/store',
        name: 'vendor',
        component: Vendor,
        meta: { requiresAuth: true, title: 'Your Store' },
        children: [
            {
                path: 'product/create',
                name: 'product-create',
                component: AddProduct
            },
            {
                path: 'product/edit/:slug',
                name: 'product-edit',
                component: EditProduct
            }
        ]
    },
    {
        path: '/me/vendor',
        //name: 'vendor-dashboard',
        component: VendorDashboard,
        meta: { requiresAuth: true, title: 'Vendor | Dashboard' },
        children: [
            {
                path: '',
                name: 'vendor-home',
                component: VendorBoard
            },
            {
                path: 'products',
                name: 'vendor-products',
                component: VendorProducts,
                meta: { title: 'Vendor | Products' },
                children: [
                    {
                        path: 'create',
                        name: 'product-create',
                        component: AddProduct,
                        meta: { title: 'Vendor | Add Product' },
                    },
                    {
                        path: 'edit/:store/:slug',
                        name: 'product-edit',
                        component: EditProduct,
                        meta: { title: 'Vendor | Edit Product' },
                    },
                    {
                        path: 'view/:id',
                        name: 'product-auction',
                        component: VendorAuctionView,
                        meta: { title: 'Vendor | View Auction' },
                    },
                ]
            },
            {
                path: 'auction',
                name: 'vendor-auction',
                component: VendorAuction,
                meta: { title: 'Vendor | Auctions' },
                children: [
                    {
                        path: 'view/:id',
                        name: 'auction-view',
                        component: VendorAuctionStats,
                        meta: { title: 'Vendor | Auction Stats' },
                    },
                ]
            },
            {
                path: 'transaction',
                name: 'vendor-transaction',
                component: VendorTransaction,
                meta: { title: 'Vendor | Transactions' },
            },
            {
                path: 'settings',
                name: 'vendor-settings',
                component: VendorSettings,
                meta: { title: 'Vendor | Store Settings' },
            },
        ]
    },
    // vendor routes
    {
        path: '/store/:store',
        name: 'vendor-details',
        component: VendorDetails,
        meta: { requiresAuth: false, title: 'Vendor' },
    },
    // vendor routes
    {
        path: '/vendors',
        name: 'vendors',
        component: Vendors,
        meta: { requiresAuth: false, title: 'Vendors' },
    },
    // auction routes
    {
        path: '/auction/view/:id',
        name: 'create-auction',
        component: ViewAuction,
        meta: { requiresAuth: true, title: 'Auction View' }
    },
    {
        path: '/auction/live/:store/:id',
        name: 'auction-details',
        component: AuctionDetails,
        meta: { requiresAuth: false, title: 'Live Auction' }
    },
    {
        path: '/product/:store/:id',
        name: 'product-details',
        component: ProductDetails,
        meta: { title: 'Product Info' }
    },
    // categories route
    {
        path: '/categories',
        name: 'category',
        component: Category,
        meta: { requiresAuth: false, title: 'Categories' }
    },
    // sell route
    {
        path: '/sell',
        name: 'sell',
        component: Sell,
        meta: { requiresAuth: false, title: 'Sell' }
    },
    // support route
    {
        path: '/support',
        name: 'support',
        component: Support,
        meta: { requiresAuth: false, title: 'Support' }
    },
    // no auth routes
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: { requiresAuth: false, title: 'Login' }
    },
    {
        path: '/account/forgot-password',
        name: 'forgot-password',
        component: ForgotPassword,
        meta: { requiresAuth: false, title: 'Forgot Password' }
    },
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: { requiresAuth: false, title: 'Register' }
    },
    { 
        path: '/:pathMatch(.*)*', 
        component: PageNotFound, 
        meta: { requiresAuth: true, title: 'Page Not Found' } 
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
})


router.beforeEach((to, from, next) => {
    if(to.meta.title) {
        store.state.site.title = to.meta.title;
        document.title = store.state.site.prefix + " - " + store.state.site.title;
    }

    if(to.meta.requiresAuth && !store.state.user.token) {
        store.state.guest.permission = true;
        localStorage.setItem('_guest', true);
        next({name: 'home'});
    } else if (store.state.user.token && !to.meta.requiresAuth) {
        next();
    } else {
        /* if(!store.state.user.token && !to.meta.requiresAuth) {
            next();
        } else {
            axiosClient('api/v1/customer')
                .then(response => {
                    next();
                })
                .catch((errors) => {
                    if(errors.response.status === 401) {
                        store.state.user.token = null;
                        //sessionStorage.removeItem("_ebm_app_session");
                        store.state.guest.permission = true;
                        localStorage.setItem('_guest', true);
                        next({name: 'login'});
                    }
                });
        } */
        next();
    }
})


export default router;