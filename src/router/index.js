import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue'; // Importa AboutView
import Login from '../views/LoginView.vue'; // Importa la vista de inicio de sesión
import Presentation from '../views/PresentationView.vue'; // Importa la vista de presentación
import { auth } from '../firebase.js'; // Asegúrate de que estás importando la autenticación

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: AboutView // Asegúrate de que AboutView esté definido
  // },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/presentation',
    name: 'presentation',
    component: Presentation,
    meta: { requiresAuth: true } // Indica que esta ruta requiere autenticación
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Guarda de navegación
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser; // Verifica si hay un usuario autenticado

  if (requiresAuth && !isAuthenticated) {
    next('/'); // Redirige al login si no está autenticado
  } else {
    next(); // Permite la navegación
  }
});

export default router;
