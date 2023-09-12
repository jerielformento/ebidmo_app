import { createRouter, createWebHistory } from "vue-router";

// main pages
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import ForgotPassword from "../views/ForgotPassword.vue";
import Register from "../views/Register.vue";
import AuctionDetails from "../views/AuctionDetails.vue";
import ProductDetails from "../views/ProductDetails.vue";
import Vendors from "../views/Vendors.vue";
import VendorDetails from "../views/VendorDetails.vue";
import Marketplace from "../views/Marketplace.vue";
import Sell from "../views/Sell.vue";
import Support from "../views/Support.vue";
import Auctions from "../views/Auctions.vue";
import LiveAuctions from "../views/LiveAuctions.vue";
import FutureAuctions from "../views/FutureAuctions.vue";
import CustomerProfile from "../views/CustomerProfile.vue";
import CustomerDashboard from "../customer/Dashboard.vue";
import CustomerWonAuctions from "../customer/WonAuctions.vue";
import CustomerTransactions from "../customer/Transactions.vue";
import CheckoutTransaction from "../customer/components/Checkout.vue";
import TransactionList from "../customer/components/TransactionList.vue";
import Transactions from "../views/Transactions.vue";
import Settings from "../views/Settings.vue";
import StoreProducts from '../components/StoreProducts.vue';
import StoreAuctions from '../components/StoreAuctions.vue';

// vendor module
import VendorDashboard from "../views/VendorDashboard.vue";
import VendorBoard from "../vendor/Home.vue";
import VendorProducts from "../vendor/Products.vue";
import VendorAuction from "../vendor/Auction.vue";
import VendorTransaction from "../vendor/Transaction.vue";
import VendorSettings from "../vendor/Settings.vue";
import VendorAuctionView from "../vendor/ViewAuction.vue";
import VendorAuctionStats from "../vendor/components/AuctionStats.vue";
import AddProduct from '../vendor/components/AddProduct.vue';
import EditProduct from '../vendor/components/EditProduct.vue';

// static page
import PageNotFound from '../views/static/PageNotFound.vue';

import store from '../store';

const routes = [
    // default route
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { title: 'Home' }
    },
    {
        path: '/me/transactions',
        name: 'transactions',
        component: Transactions,
        meta: { requiresAuth: true, title: 'Transactions' },
    },
    {
        path: '/me/profile',
        name: 'profile',
        component: CustomerProfile,
        redirect: {name: 'customer-dashboard'},
        meta: { requiresAuth: true, title: 'Dashboard' },
        children: [
            {
                path: '',
                name: 'customer-dashboard',
                component: CustomerDashboard,
                meta: { title: 'Dashboard' }
            },
            {
                path: 'won',
                name: 'customer-won',
                component: CustomerWonAuctions,
                meta: { title: 'Won Auctions' }
            },
            {
                path: 'transactions',
                name: 'customer-transactions',
                component: CustomerTransactions,
                redirect: {name: 'transaction-home'},
                meta: { title: 'Transactions' },
                children: [
                    {
                        path: '',
                        name: 'transaction-home',
                        component: TransactionList,
                        meta: { title: 'Transactions' }
                    },
                    {
                        path: 'checkout/:id',
                        name: 'transaction-checkout',
                        component: CheckoutTransaction,
                        meta: { title: 'Checkout' }
                    },
                ]
            },
        ]
    },
    {
        path: '/me/settings',
        name: 'settings',
        component: Settings,
        meta: { requiresAuth: true, title: 'Settings' },
    },
    // auction items route
    {
        path: '/auctions',
        name: 'auctions',
        component: Auctions,
        meta: { title: 'Auctions' },
    },
    // live auction route
    {
        path: '/auctions-live',
        name: 'auctions-live',
        component: LiveAuctions,
        meta: { title: 'Live Auctions' },
    },
    // future auction route
    {
        path: '/auctions-future',
        name: 'auctions-future',
        component: FutureAuctions,
        meta: { title: 'Future Auctions' },
    },
    // vendor routes
    {
        path: '/me/vendor',
        component: VendorDashboard,
        redirect: {name: 'vendor-home'},
        meta: { requiresAuth: true, title: 'Dashboard' },
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
                meta: { title: 'Products' },
                children: [
                    {
                        path: 'create',
                        name: 'product-create',
                        component: AddProduct,
                        meta: { title: 'Add Product' },
                    },
                    {
                        path: 'edit/:store/:slug',
                        name: 'product-edit',
                        component: EditProduct,
                        meta: { title: 'Edit Product' },
                    },
                    {
                        path: 'view/:id',
                        name: 'product-auction',
                        component: VendorAuctionView,
                        meta: { title: 'View Auction' },
                    },
                ]
            },
            {
                path: 'auction',
                name: 'vendor-auction',
                component: VendorAuction,
                meta: { title: 'Auctions' },
                children: [
                    {
                        path: 'view/:id',
                        name: 'auction-view',
                        component: VendorAuctionStats,
                        meta: { title: 'Auction Stats' },
                    },
                ]
            },
            {
                path: 'transaction',
                name: 'vendor-transaction',
                component: VendorTransaction,
                meta: { title: 'Transactions' },
            },
            {
                path: 'settings',
                name: 'vendor-settings',
                component: VendorSettings,
                meta: { title: 'Store Settings' },
            },
        ]
    },
    // vendor routes
    {
        path: '/store/:store',
        name: 'vendor-details',
        redirect: {name: 'store-products'},
        component: VendorDetails,
        meta: { requiresAuth: false, title: 'Vendor' },
        children: [
            {
                path: '',
                name: 'store-products',
                component: StoreProducts
            },
            {
                path: 'auctions',
                name: 'store-auctions',
                component: StoreAuctions
            },
        ]
    },
    // vendor routes
    {
        path: '/vendors',
        name: 'vendors',
        component: Vendors,
        meta: { requiresAuth: false, title: 'Vendors' },
    },
    // auction route
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
        path: '/marketplace',
        name: 'marketplace',
        component: Marketplace,
        meta: { requiresAuth: false, title: 'Marketplace' }
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