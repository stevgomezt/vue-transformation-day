import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './styles/global.css';

// Importar la core de FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
// Importar los íconos específicos que vas a usar
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
// Importar el componente FontAwesome para Vue
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Agregar los íconos a la librería
library.add(faArrowLeft, faArrowRight);

// Crear la aplicación de Vue
const app = createApp(App);

// Registrar el componente FontAwesome de manera global
app.component('font-awesome-icon', FontAwesomeIcon);

// Usar el router y montar la aplicación
app.use(router).mount('#app');
