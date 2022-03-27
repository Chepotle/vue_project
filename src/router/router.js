import Main from "@/pages/Main";
import PostPage from "@/pages/PostPage";
import About from "@/pages/About";
import OpenPost from "@/pages/OpenPost"
import StorePostPage from "@/pages/StorePostPage"
import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
    {
        path: '/',
        component: Main
    },
    {
        path: '/posts',
        component: PostPage
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/posts/:id',
        component: OpenPost
    },
    {
        path: '/store',
        component: StorePostPage
    },
]

const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL)
})

export default router;