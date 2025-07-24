const Inicio = { template: '<web-home></web-home>' }
const Web_dashBoard = { template: '<web-dashBoard></web-dashBoard>' }
const Web_regDoc = { template: '<web-regDoc></web-regDoc>' }
const Web_citas = { template: '<web-citas></web-citas>' }

const routes = [
  { path: '/', component: Inicio },
  { path: '/web-dashBoard', component: Web_dashBoard, meta: { requiresAuth: true } },
  { path: '/web-regDoc', component: Web_regDoc },
  { path: '/web-citas', component: Web_citas }
]

const router = VueRouter.createRouter({
    history: VueRouter.createWebHashHistory(),
    routes,
})

// Función global para reinicializar Material Dashboard
window.reinitializeMaterialDashboard = function() {
  // Código de inicialización aquí
};

// Ejecutar después de cada cambio de ruta
router.afterEach((to, from) => {
  setTimeout(() => {
    if (typeof window.reinitializeMaterialDashboard === 'function') {
      window.reinitializeMaterialDashboard();
    }
  }, 200);
});

// Inicia Autenticación
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      next({
        path: '/',
        query: { redirect: to.fullPath }
      });
    } else {
      next();
    }
  } else {
    next();
  }
});
// Termina Autenticación

const app = Vue.createApp({
    data() {
        return {}
    }
})
