import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import Graph from '../views/Graph.vue'
import Table from '../views/Table.vue'
import Sample from '../views/Sample.vue'
import Tokens from '../views/Tokens.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "home",
            component: () => Home
        },
        {
            path: "/graph",
            name: "graph",
            component: () => Graph
        },
        {
            path: "/table",
            name: "table",
            component: () => Table
        },
        {
            path: "/sample",
            name: "sample",
            component: () => Sample
        },
        {
            path: "/tokens",
            name: "tokens",
            component: () => Tokens
        }
    ]
})

export default router
