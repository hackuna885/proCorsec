app.component("web-home", {
  template: /*html*/ `
        <!-- Inicia Código -->
        <header>
          <div class="centrado-h-v" id="vantaHalo">
            <div class="row">
              <div class="col-md-8 p-5 mx-auto">
        
                <div class="shadow border-0 rounded border-light p-4 p-lg-5 text-white"
                  style="background-color: rgba(0, 0, 0, .5); width: 100%;">
                  <div class="row">
                    <div class="col-8 mx-auto">
                      <img src="assets/img/logoCorsecTech.png" class="img-fluid my-3" alt="logo">
                    </div>
                  </div>
                  <div class="text-center text-md-center mb-4 mt-md-0">
                    <h1 class="mb-0 h3">Inicio de Sesión</h1>
                  </div>
        
                  <form class="mt-4" @submit.prevent="revDatos">
                    <div class="form-group mb-4">
                      <label for="email">Correo</label>
                      <div class="input-group">
                        <span class="input-group-text" id="basic-addon1">
                          <svg class="icon icon-xs text-gray-600" fill="currentColor" viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                            <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                          </svg>
                        </span>
                        <input type="email" class="form-control" placeholder="ejemplo@correo.com" id="email" autofocus
                          v-model="nCorreo" required>
                      </div>
                    </div>
                    <div class="form-group" v-html="datos"></div>
                    <div class="form-group">
        
                      <div class="form-group mb-4">
                        <label for="password">Contraseña</label>
                        <div class="input-group">
                          <span class="input-group-text" id="basic-addon2">
                            <svg class="icon icon-xs text-gray-600" fill="currentColor" viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clip-rule="evenodd"></path>
                            </svg>
                          </span>
                          <input type="password" placeholder="Contraseña" class="form-control" id="password" v-model="passUsr"
                            required>
                        </div>
                      </div>
        
                      <div class="form-group mb-4">
                        <label for="confirm_password">Confirmar contraseña</label>
                        <div class="input-group">
                          <span class="input-group-text" id="basic-addon2">
                            <svg class="icon icon-xs text-gray-600" fill="currentColor" viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg">
                              <path fill-rule="evenodd"
                                d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                                clip-rule="evenodd"></path>
                            </svg>
                          </span>
                          <input type="password" placeholder="Confirmar contraseña" class="form-control" id="confirm_password"
                            v-model="passUsrDos" :disabled="estadoPass" required>
                        </div>
                      </div>
                      <div :class="notificaEstadoPass" role="alert">
                        {{validaContrasena}}
                      </div>
        
                    </div>
                    <br>
                    <div class="d-grid">
                      <button type="submit" class="btn btn-gray-800" :disabled="!formularioValido">Iniciar Sesión</button>
                    </div>
                  </form>
        
                </div>
        
              </div>
            </div>
          </div>
        </header>
        <!-- Inicia Código -->


`,
  data() {
    return {
      datos: "",
      nCorreo: "",
      passUsr: "",
      passUsrDos: "",
      msgAlert: "",
      estadoPass: true,
      notificaEstadoPass: "",
      validaBtn: false,
      estadoBtn: false,
      redirectUrl: null,
      vantaEffect: null, // Añadimos una propiedad para almacenar la referencia al efecto
    };
  },
  computed: {
    validaContrasena() {
      this.notificaEstadoPass = "small alert alert-light text-muted";
      this.validaBtn = false;

      if (this.passUsr.length < 6) {
        this.estadoPass = true;
        return "La contraseña debe tener al menos seis (6) caracteres.";
      }

      this.estadoPass = false;

      if (this.passUsrDos.length < 6) {
        return "La segunda contraseña también debe tener al menos seis (6) caracteres.";
      }

      if (this.passUsr !== this.passUsrDos) {
        this.notificaEstadoPass = "small alert alert-danger";
        return "¡Error! Las contraseñas no coinciden.";
      }

      this.notificaEstadoPass = "small alert alert-success";
      this.validaBtn = true;
      return "Contraseña válida.";
    },
    // valida boton
    formularioValido() {
      return this.nCorreo && this.passUsr && this.passUsrDos && this.validaBtn;
    },

   },
  methods: {
    revDatos() {
      axios
        .post("../proveedores-corsec/verifica/verifica.app", {
          opcion: 1,
          nCorreo: this.nCorreo,
          passUsr: this.passUsr,
        })
        .then((response) => {
          if (response.data === "correcto") {
            // Guardar estado de autenticación
            localStorage.setItem("isAuthenticated", "true");

            Swal.fire({
              icon: "success",
              title: "¡Bienvenido!",
              showConfirmButton: false,
              timer: 2000,
              willClose: () => {
                // Obtener la URL de redirección si existe
                const redirectUrl = new URLSearchParams(
                  window.location.search
                ).get("redirect");
                // Redireccionar a la ruta original o a web-dashBoard
                if (redirectUrl) {
                  // no pasa
                  this.$router.push(redirectUrl);
                } else {
                  // manda al home
                  this.$router.push('/web-dashBoard');
                }
              },
            });
          } else {
            this.datos = response.data;
            // console.log(response.data)
          }
        })
        .catch((error) => {
          console.error("Error de autenticación:", error);
          Swal.fire({
            icon: "error",
            title: "Error de inicio de sesión",
            text: "No se pudo iniciar sesión. Intente nuevamente.",
          });
        });
    },

    // ####
    checkAuth() {
      return localStorage.getItem("isAuthenticated") === "true";
    },
    // ####
   },
  created() {
    // Captura el parámetro de redirección de la URL si existe
    const urlParams = new URLSearchParams(window.location.search);
    this.redirectUrl = urlParams.get("redirect");

    // Si el usuario ya está autenticado, redirigir inmediatamente
    if (this.checkAuth()) {
      const redirectTo = this.redirectUrl || "/web-dashBoard";
      this.$router.push(redirectTo);
    }
  },
  mounted() { 
    // Inicializar el efecto VANTA.HALO cuando el componente esté montado
    this.vantaEffect = VANTA.HALO({
      el: "#vantaHalo",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00
    });
  },
    // Importante: limpiar el efecto cuando el componente se destruya para evitar memory leaks
  beforeUnmount() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy();
    }
  }
  
});

app.component("web-dashBoard", {
  template: /*html*/ `
        <!-- Inicia Código -->
         <div class="dashboard-container d-flex flex-column min-vh-100">

           <nav class="navbar navbar-dark navbar-theme-primary px-4 col-12 d-lg-none">
             <a class="navbar-brand me-lg-5" href="#">
               <img class="navbar-brand-dark" src="assets/img/brand/light.svg" alt="Volt logo" /> <img
                 class="navbar-brand-light" src="assets/img/brand/dark.svg" alt="Volt logo" />
             </a>
             <div class="d-flex align-items-center">
               <button class="navbar-toggler d-lg-none collapsed" type="button" data-bs-toggle="collapse"
                 data-bs-target="#sidebarMenu" aria-controls="sidebarMenu" aria-expanded="false" aria-label="Toggle navigation">
                 <span class="navbar-toggler-icon"></span>
               </button>
             </div>
           </nav>

           <div class="d-flex flex-grow-1">

             <nav id="sidebarMenu" class="sidebar d-lg-block bg-gray-800 text-white collapse" data-simplebar>
               <div class="sidebar-inner px-4 pt-3">
                 <div class="user-card d-flex d-md-none align-items-center justify-content-between justify-content-md-center pb-4">
                   <div class="d-flex align-items-center">
                     <div class="avatar-lg me-4">
                       <img src="assets/img/team/teamCorsec.jpg" class="card-img-top rounded-circle border-white"
                         alt="Bonnie Green">
                     </div>
                     <div class="d-block">
                       <h2 class="h5 mb-3">Hola, Administrador!</h2>
                       <router-link to="/" @click="logout" class="btn btn-secondary btn-sm d-inline-flex align-items-center">                
                       <span class="sidebar-icon d-inline-flex align-items-center justify-content-center">
                         <svg class="icon icon-xxs me-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                             d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                         </svg>
                       </span>
                       Cerrar de sesión
                     </router-link>
                     </div>
                   </div>
                   <div class="collapse-close d-md-none">
                     <a href="#sidebarMenu" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="sidebarMenu"
                       aria-expanded="true" aria-label="Toggle navigation">
                       <svg class="icon icon-xs" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                         <path fill-rule="evenodd"
                           d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                           clip-rule="evenodd"></path>
                       </svg>
                     </a>
                   </div>
                 </div>
                 <ul class="nav flex-column pt-3 pt-md-0">
                   <li class="nav-item">
                     <a href="#" class="nav-link d-flex align-items-center">
                       <span class="sidebar-icon">
                         <img src="assets/img/brand/light.svg" height="20" width="20" alt="Volt Logo">
                       </span>
                       <span class="mt-1 ms-1 sidebar-text">Proveedores</span>
                     </a>
                   </li>
                   <li class="nav-item  active ">
                     <a href="#" class="nav-link">
                       <span class="sidebar-icon">
                         <svg class="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                           <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
                           <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
                         </svg>
                       </span>
                       <span class="sidebar-text">Tablero</span>
                     </a>
                   </li>
                   <li class="nav-item">
                     <a href="#" target="_blank"
                       class="nav-link d-flex justify-content-between">
                       <span>
                         <span class="sidebar-icon">
                           <svg class="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                             <path
                               d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z">
                             </path>
                           </svg>
                         </span>
                         <span class="sidebar-text">Menú</span>
                       </span>
                       <span>
                         <span class="badge badge-sm bg-secondary ms-1 text-gray-800">Admin</span>
                       </span>
                     </a>
                   </li>
                   <li class="nav-item ">
                     <a href="#" class="nav-link">
                       <span class="sidebar-icon">
                         <svg class="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                           <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                           <path fill-rule="evenodd"
                             d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z"
                             clip-rule="evenodd"></path>
                         </svg>
                       </span>
                       <span class="sidebar-text">Menú</span>
                     </a>
                   </li>
                   <li class="nav-item ">
                     <a href="#" class="nav-link">
                       <span class="sidebar-icon">
                         <svg class="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                           <path fill-rule="evenodd"
                             d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                             clip-rule="evenodd"></path>
                         </svg>
                       </span>
                       <span class="sidebar-text">Menú</span>
                     </a>
                   </li>
                   <li class="nav-item">
                     <a href="https://demo.themesberg.com/volt-pro/pages/calendar.html" target="_blank"
                       class="nav-link d-flex justify-content-between">
                       <span>
                         <span class="sidebar-icon">
                           <svg class="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                             <path fill-rule="evenodd"
                               d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z"
                               clip-rule="evenodd"></path>
                           </svg>
                         </span>
                         <span class="sidebar-text">Menú</span>
                       </span>
                       <span>
                         <span class="badge badge-sm bg-secondary ms-1 text-gray-800">Admin</span>
                       </span>
                     </a>
                   </li>
                   <li class="nav-item">
                     <a href="#" target="_blank"
                       class="nav-link d-flex justify-content-between">
                       <span>
                         <span class="sidebar-icon">
                           <svg class="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                             <path fill-rule="evenodd"
                               d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                               clip-rule="evenodd"></path>
                           </svg>
                         </span>
                         <span class="sidebar-text">Menú</span>
                       </span>
                       <span>
                         <span class="badge badge-sm bg-secondary ms-1 text-gray-800">Admin</span>
                       </span>
                     </a>
                   </li>
                   <li class="nav-item">
                     <span class="nav-link  collapsed  d-flex justify-content-between align-items-center" data-bs-toggle="collapse"
                       data-bs-target="#submenu-app">
                       <span>
                         <span class="sidebar-icon">
                           <svg class="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                             <path fill-rule="evenodd"
                               d="M5 4a3 3 0 00-3 3v6a3 3 0 003 3h10a3 3 0 003-3V7a3 3 0 00-3-3H5zm-1 9v-1h5v2H5a1 1 0 01-1-1zm7 1h4a1 1 0 001-1v-1h-5v2zm0-4h5V8h-5v2zM9 8H4v2h5V8z"
                               clip-rule="evenodd"></path>
                           </svg>
                         </span>
                         <span class="sidebar-text">Menú</span>
                       </span>
                       <span class="link-arrow">
                         <svg class="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                           <path fill-rule="evenodd"
                             d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                             clip-rule="evenodd"></path>
                         </svg>
                       </span>
                     </span>
                     <div class="multi-level collapse " role="list" id="submenu-app" aria-expanded="false">
                       <ul class="flex-column nav">
                         <li class="nav-item ">
                           <a class="nav-link" href="#">
                             <span class="sidebar-text">Sub Menú</span>
                           </a>
                         </li>
                       </ul>
                     </div>
                   </li>
                   <li class="nav-item">
                     <span class="nav-link  collapsed  d-flex justify-content-between align-items-center" data-bs-toggle="collapse"
                       data-bs-target="#submenu-pages">
                       <span>
                         <span class="sidebar-icon">
                           <svg class="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                             <path fill-rule="evenodd"
                               d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                               clip-rule="evenodd"></path>
                             <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z"></path>
                           </svg>
                         </span>
                         <span class="sidebar-text">Menú</span>
                       </span>
                       <span class="link-arrow">
                         <svg class="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                           <path fill-rule="evenodd"
                             d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                             clip-rule="evenodd"></path>
                         </svg>
                       </span>
                     </span>
                     <div class="multi-level collapse " role="list" id="submenu-pages" aria-expanded="false">
                       <ul class="flex-column nav">
                         <li class="nav-item">
                           <a class="nav-link" href="#">
                             <span class="sidebar-text">Sub Menú</span>
                           </a>
                         </li>
                         <li class="nav-item">
                           <a class="nav-link" href="#">
                             <span class="sidebar-text">Sub Menú</span>
                           </a>
                         </li>
                         <li class="nav-item">
                           <a class="nav-link" href="#">
                             <span class="sidebar-text">Sub Menú</span>
                           </a>
                         </li>
                         <li class="nav-item">
                           <a class="nav-link" href="#">
                             <span class="sidebar-text">Sub Menú</span>
                           </a>
                         </li>
                         <li class="nav-item">
                           <a class="nav-link" href="#">
                             <span class="sidebar-text">Sub Menú</span>
                           </a>
                         </li>
                         <li class="nav-item">
                           <a class="nav-link" href="#">
                             <span class="sidebar-text">Sub Menú</span>
                           </a>
                         </li>
                         <li class="nav-item">
                           <a class="nav-link" href="#">
                             <span class="sidebar-text">Sub Menú</span>
                           </a>
                         </li>
                       </ul>
                     </div>
                   </li>
                   <li class="nav-item">
                     <span class="nav-link  collapsed  d-flex justify-content-between align-items-center" data-bs-toggle="collapse"
                       data-bs-target="#submenu-components">
                       <span>
                         <span class="sidebar-icon">
                           <svg class="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                             <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path>
                             <path fill-rule="evenodd"
                               d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                               clip-rule="evenodd"></path>
                           </svg>
                         </span>
                         <span class="sidebar-text">Menú</span>
                       </span>
                       <span class="link-arrow">
                         <svg class="icon icon-sm" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                           <path fill-rule="evenodd"
                             d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                             clip-rule="evenodd"></path>
                         </svg>
                       </span>
                     </span>
                     <div class="multi-level collapse " role="list" id="submenu-components" aria-expanded="false">
                       <ul class="flex-column nav">
                         <li class="nav-item">
                           <a class="nav-link" target="_blank"
                             href="#">
                             <span class="sidebar-text">Sub Menú</span>
                           </a>
                         </li>
                         <li class="nav-item ">
                           <a class="nav-link" href="#">
                             <span class="sidebar-text">Sub Menú</span>
                           </a>
                         </li>
                         <li class="nav-item ">
                           <a class="nav-link" href="#">
                             <span class="sidebar-text">Sub Menú</span>
                           </a>
                         </li>
                         <li class="nav-item ">
                           <a class="nav-link" href="#">
                             <span class="sidebar-text">Sub Menú</span>
                           </a>
                         </li>
                         <li class="nav-item ">
                           <a class="nav-link" href="#">
                             <span class="sidebar-text">Sub Menú</span>
                           </a>
                         </li>
                         <li class="nav-item ">
                           <a class="nav-link" href="#">
                             <span class="sidebar-text">Sub Menú</span>
                           </a>
                         </li>
                       </ul>
                     </div>
                   </li>
                   <li role="separator" class="dropdown-divider mt-4 mb-3 border-gray-700"></li>
                   <li class="nav-item">
                     <a href="#" target="_blank"
                       class="nav-link d-flex align-items-center">
                       <span class="sidebar-icon">
                         <svg class="icon icon-xs me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                           <path fill-rule="evenodd"
                             d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                             clip-rule="evenodd"></path>
                         </svg>
                       </span>
                       <span class="sidebar-text">Documentación <span
                           class="badge badge-sm bg-secondary ms-1 text-gray-800">v1.0</span></span>
                     </a>
                   </li>
                   <li class="nav-item">
                     <router-link to="/" @click="logout" class="btn btn-secondary d-flex align-items-center justify-content-center btn-upgrade-pro">                
                       <span class="sidebar-icon d-inline-flex align-items-center justify-content-center">
                         <svg class="icon icon-xxs me-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                           xmlns="http://www.w3.org/2000/svg">
                           <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                             d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                         </svg>
                       </span>
                       Cerrar de sesión
                     </router-link>
                   </li>
                 </ul>
               </div>
             </nav>
     
             <!-- contenido ventada -->
             <main class="content d-flex flex-column flex-grow-1">
             
               <nav class="navbar navbar-top navbar-expand navbar-dashboard navbar-dark ps-0 pe-2 pb-0">
                 <div class="container-fluid px-0">
                   <div class="d-flex justify-content-between w-100" id="navbarSupportedContent">
                     <div class="d-flex align-items-center">
                       <!-- Search form -->
                       <form class="navbar-search form-inline" id="navbar-search-main">
                         <div class="input-group input-group-merge search-bar">
                           <span class="input-group-text" id="topbar-addon">
                             <svg class="icon icon-xs" x-description="Heroicon name: solid/search" xmlns="http://www.w3.org/2000/svg"
                               viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                               <path fill-rule="evenodd"
                                 d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                 clip-rule="evenodd"></path>
                             </svg>
                           </span>
                           <input type="text" class="form-control" id="topbarInputIconLeft" placeholder="Search" aria-label="Search"
                             aria-describedby="topbar-addon">
                         </div>
                       </form>
                       <!-- / Search form -->
                     </div>
                     <!-- Navbar links -->
                     <ul class="navbar-nav align-items-center">
                       <li class="nav-item dropdown">
                         <a class="nav-link text-dark notification-bell unread dropdown-toggle" data-unread-notifications="true"
                           href="#" role="button" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
                           <svg class="icon icon-sm text-gray-900" fill="currentColor" viewBox="0 0 20 20"
                             xmlns="http://www.w3.org/2000/svg">
                             <path
                               d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z">
                             </path>
                           </svg>
                         </a>
                         <div class="dropdown-menu dropdown-menu-lg dropdown-menu-center mt-2 py-0">
                           <div class="list-group list-group-flush">
                             <a href="#" class="text-center text-primary fw-bold border-bottom border-light py-3">Notifications</a>
                             <a href="#" class="list-group-item list-group-item-action border-bottom">
                               <div class="row align-items-center">
                                 <div class="col-auto">
                                   <!-- Avatar -->
                                   <img alt="Image placeholder" src="assets/img/team/teamCorsec.jpg"
                                     class="avatar-md rounded">
                                 </div>
                                 <div class="col ps-0 ms-2">
                                   <div class="d-flex justify-content-between align-items-center">
                                     <div>
                                       <h4 class="h6 mb-0 text-small">Colaborador</h4>
                                     </div>
                                     <div class="text-end">
                                       <small class="text-danger">hace unos minutos..</small>
                                     </div>
                                   </div>
                                   <p class="font-small mt-1 mb-0">Evento "Proyecto de inicio" mañana a las 12:30 AM.</p>
                                 </div>
                               </div>
                             </a>
                             <a href="#" class="list-group-item list-group-item-action border-bottom">
                               <div class="row align-items-center">
                                 <div class="col-auto">
                                   <!-- Avatar -->
                                   <img alt="Image placeholder" src="assets/img/team/teamCorsec.jpg"
                                     class="avatar-md rounded">
                                 </div>
                                 <div class="col ps-0 ms-2">
                                   <div class="d-flex justify-content-between align-items-center">
                                     <div>
                                       <h4 class="h6 mb-0 text-small">Colaborador</h4>
                                     </div>
                                     <div class="text-end">
                                       <small class="text-danger">hace 2 hrs</small>
                                     </div>
                                   </div>
                                   <p class="font-small mt-1 mb-0">Evento "X" mañana a las 12:30 AM.</p>
                                 </div>
                               </div>
                             </a>
                             <a href="#" class="list-group-item list-group-item-action border-bottom">
                               <div class="row align-items-center">
                                 <div class="col-auto">
                                   <!-- Avatar -->
                                   <img alt="Image placeholder" src="assets/img/team/teamCorsec.jpg"
                                     class="avatar-md rounded">
                                 </div>
                                 <div class="col ps-0 m-2">
                                   <div class="d-flex justify-content-between align-items-center">
                                     <div>
                                       <h4 class="h6 mb-0 text-small">Colaborador</h4>
                                     </div>
                                     <div class="text-end">
                                       <small>hace 5 hrs</small>
                                     </div>
                                   </div>
                                   <p class="font-small mt-1 mb-0">Evento "X" mañana a las 12:30 AM.</p>
                                 </div>
                               </div>
                             </a>
                             <a href="#" class="list-group-item list-group-item-action border-bottom">
                               <div class="row align-items-center">
                                 <div class="col-auto">
                                   <!-- Avatar -->
                                   <img alt="Image placeholder" src="assets/img/team/teamCorsec.jpg"
                                     class="avatar-md rounded">
                                 </div>
                                 <div class="col ps-0 ms-2">
                                   <div class="d-flex justify-content-between align-items-center">
                                     <div>
                                       <h4 class="h6 mb-0 text-small">Colaborador</h4>
                                     </div>
                                     <div class="text-end">
                                       <small>hace 5 hrs</small>
                                     </div>
                                   </div>
                                   <p class="font-small mt-1 mb-0">Evento "X" mañana a las 12:30 AM.</p>
                                 </div>
                               </div>
                             </a>
                             <a href="#" class="list-group-item list-group-item-action border-bottom">
                               <div class="row align-items-center">
                                 <div class="col-auto">
                                   <!-- Avatar -->
                                   <img alt="Image placeholder" src="assets/img/team/teamCorsec.jpg"
                                     class="avatar-md rounded">
                                 </div>
                                 <div class="col ps-0 ms-2">
                                   <div class="d-flex justify-content-between align-items-center">
                                     <div>
                                       <h4 class="h6 mb-0 text-small">Colaborador</h4>
                                     </div>
                                     <div class="text-end">
                                       <small>hace 5 hrs</small>
                                     </div>
                                   </div>
                                   <p class="font-small mt-1 mb-0">Evento "X" mañana a las 12:30 AM.
                                   </p>
                                 </div>
                               </div>
                             </a>
                             <a href="#" class="dropdown-item text-center fw-bold rounded-bottom py-3">
                               <svg class="icon icon-xxs text-gray-400 me-1" fill="currentColor" viewBox="0 0 20 20"
                                 xmlns="http://www.w3.org/2000/svg">
                                 <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                                 <path fill-rule="evenodd"
                                   d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                                   clip-rule="evenodd"></path>
                               </svg>
                               Ver todo
                             </a>
                           </div>
                         </div>
                       </li>
                       <li class="nav-item dropdown ms-lg-3">
                         <a class="nav-link dropdown-toggle pt-1 px-0" href="#" role="button" data-bs-toggle="dropdown"
                           aria-expanded="false">
                           <div class="media d-flex align-items-center">
                             <img class="avatar rounded-circle" alt="Image placeholder"
                               src="assets/img/team/teamCorsec.jpg">
                             <div class="media-body ms-2 text-dark align-items-center d-none d-lg-block">
                               <span class="mb-0 font-small fw-bold text-gray-900">Administrador</span>
                             </div>
                           </div>
                         </a>
                         <div class="dropdown-menu dashboard-dropdown dropdown-menu-end mt-2 py-1">
                           <a class="dropdown-item d-flex align-items-center" href="#">
                             <svg class="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20"
                               xmlns="http://www.w3.org/2000/svg">
                               <path fill-rule="evenodd"
                                 d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                 clip-rule="evenodd"></path>
                             </svg>
                             Mi perfil
     
     
                           </a>
                           <a class="dropdown-item d-flex align-items-center" href="#">
                             <svg class="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20"
                               xmlns="http://www.w3.org/2000/svg">
                               <path fill-rule="evenodd"
                                 d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                                 clip-rule="evenodd"></path>
                             </svg>
                             Configuración
                           </a>
                           <a class="dropdown-item d-flex align-items-center" href="#">
                             <svg class="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20"
                               xmlns="http://www.w3.org/2000/svg">
                               <path fill-rule="evenodd"
                                 d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z"
                                 clip-rule="evenodd"></path>
                             </svg>
                             Mensajes
                           </a>
                           <a class="dropdown-item d-flex align-items-center" href="#">
                             <svg class="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20"
                               xmlns="http://www.w3.org/2000/svg">
                               <path fill-rule="evenodd"
                                 d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-2 0c0 .993-.241 1.929-.668 2.754l-1.524-1.525a3.997 3.997 0 00.078-2.183l1.562-1.562C15.802 8.249 16 9.1 16 10zm-5.165 3.913l1.58 1.58A5.98 5.98 0 0110 16a5.976 5.976 0 01-2.516-.552l1.562-1.562a4.006 4.006 0 001.789.027zm-4.677-2.796a4.002 4.002 0 01-.041-2.08l-.08.08-1.53-1.533A5.98 5.98 0 004 10c0 .954.223 1.856.619 2.657l1.54-1.54zm1.088-6.45A5.974 5.974 0 0110 4c.954 0 1.856.223 2.657.619l-1.54 1.54a4.002 4.002 0 00-2.346.033L7.246 4.668zM12 10a2 2 0 11-4 0 2 2 0 014 0z"
                                 clip-rule="evenodd"></path>
                             </svg>
                             Soporte
                           </a>
                           <div role="separator" class="dropdown-divider my-1"></div>
                           <router-link to="/" @click="logout" class="dropdown-item d-flex align-items-center">
                             <svg class="dropdown-icon text-danger me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                               xmlns="http://www.w3.org/2000/svg">
                               <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                 d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1">
                               </path>
                             </svg>
                             Cerrar sesión
                           </router-link>
                         </div>
                       </li>
                     </ul>
                   </div>
                 </div>
               </nav>
             
               <div class="py-4">
                 <div class="dropdown">
                   <button class="btn btn-gray-800 d-inline-flex align-items-center me-2 dropdown-toggle" data-bs-toggle="dropdown"
                     aria-haspopup="true" aria-expanded="false">
                     <svg class="icon icon-xs me-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                       xmlns="http://www.w3.org/2000/svg">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                     </svg>              
                     Nueva tarea
                   </button>
                   <div class="dropdown-menu dashboard-dropdown dropdown-menu-start mt-2 py-1">
                     <a class="dropdown-item d-flex align-items-center" href="#">
                       <svg class="dropdown-icon text-gray-400 me-2" fill="currentColor" viewBox="0 0 20 20"
                         xmlns="http://www.w3.org/2000/svg">
                         <path
                           d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z">
                         </path>
                       </svg>
                       Agregar usuario
                     </a>
                   </div>
                 </div>
               </div>
     
             
               <footer class="bg-white rounded shadow p-5 mt-auto mb-3">
                 <div class="row">
                   <div class="col-12 col-md-4 col-xl-6 mb-0">
                     <p class="mb-0 text-center text-lg-start">© <span class="current-year"></span> Creado por CORSEC-TECH</p>
                   </div>
                 </div>
               </footer>
             </main>
             <!-- contenido ventada -->
           </div>

         </div>

        <!-- Termina Código -->


`,
  data() {
    return {
      datos: "",
    };
  },
  computed: { },
  methods: { 
    logout() {
      // Eliminar el estado de autenticación
      localStorage.removeItem("isAuthenticated");
      // Redirigir a la página de login
      this.$router.push('/');
    },
  },
  created() { },
  mounted() { },
  
});


