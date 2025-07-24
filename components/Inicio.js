app.component("web-home", {
  template: /*html*/ `
        <!-- Inicia Código -->
        <header>
          <div class="centrado-h-v" id="vantaHalo">
            <section class="vh-lg-100 d-flex align-items-center">
              <div class="container">
                <div class="row justify-content-center">
                  <div class="col-12 d-flex align-items-center justify-content-center">
                    <div class="shadow border-0 rounded border-light p-4 p-lg-5 w-100 fmxw-500 text-white"
                      style="background-color: rgba(0, 0, 0, .5);">
                      <div class="text-center">
                        <img src="assets/img/logoCorsecTech.png" class="img-fluid my-3" alt="logo" style="width: 150px;">
                      </div>
                      <div class="text-center text-md-center mb-4 mt-md-0">
                        <h1 class="mb-0 h3">Inicio de Sesión</h1>
                      </div>
        
                      <form class="mt-4">
                        <!-- Form -->
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
                              required>
                          </div>
                        </div>
                        <!-- End of Form -->
                        <div class="form-group">
                          <!-- Form -->
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
                              <input type="password" placeholder="Contraseña" class="form-control" id="password" required>
                            </div>
                          </div>
                          <!-- End of Form -->
                          <!-- Form -->
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
                              <input type="password" placeholder="Confirmar contraseña" class="form-control"
                                id="confirm_password" required>
                            </div>
                          </div>
                          <!-- End of Form -->
                        </div>
                        <br>
                        <div class="d-grid">
                          <button type="submit" class="btn btn-gray-800">Iniciar Sesión</button>
                        </div>
                      </form>
        
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </header>
        <!-- Inicia Código -->


`,
  data() {
    return {
      datos: "",
      vantaEffect: null // Añadimos una propiedad para almacenar la referencia al efecto
    };
  },
  computed: { },
  methods: { },
  created() { },
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

