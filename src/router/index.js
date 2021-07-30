import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Agregar from '../views/Agregar.vue'
import Editar from '../views/Editar.vue'
import Visualizar from '../views/Visualizar.vue'
import Detalle from '../views/Detalle.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/visualizar/',
    name: 'Visualizar',
    component: Visualizar
  },
  {
    path: '/visualizar/detalle/:id',
    name: 'Detalle',
    component: Detalle
  },
  {
    path: '/agregar',
    name: 'Agregar',
    component: Agregar
  },
  {
    path: '/editar/:id',
    name: 'Editar',
    component: Editar
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
