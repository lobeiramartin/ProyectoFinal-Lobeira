import { createRouter, createWebHistory } from 'vue-router'
import Productos from '@/views/Productos.vue'
import Carrito from '@/views/VistaCarrito.vue'
import Login from '@/views/Login.vue'

const routes = [
  { path: '/', redirect: '/productos' },
  { path: '/productos', component: Productos },
  { path: '/carrito', component: Carrito },
  { path: '/login', component: Login }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

