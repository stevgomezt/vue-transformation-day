<template>
    <div class="body-login">
        <div class="container-login-form mx-auto">
            <img
                src="../assets/Logo emergia.png"
                alt="Inicio de Sesión"
                style="width: 200px; margin-bottom: 25px"
            />
            <form @submit.prevent="login">
                <div class="input-group-login-form">
                    <i class="fas fa-envelope"></i>
                    <label for="email" class="sr-only">Email</label>
                    <input
                        type="email"
                        class="form-control"
                        v-model="email"
                        placeholder="Correo electronico"
                        required
                    />
                </div>
                <div class="input-group-login-form">
                    <i class="fas fa-lock"></i>
                    <label for="password" class="sr-only">Password</label>
                    <input
                        type="password"
                        class="form-control"
                        v-model="password"
                        placeholder="Contraseña"
                        required
                    />
                </div>
                <button type="submit" class="btn btn-primary" id="submitSignIn">
                    Iniciar Sesión
                </button>
                <p v-if="errorMessage" class="text-danger">
                    {{ errorMessage }}
                </p>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../firebase.js";

// Definir los estados reactivamente
const email = ref("");
const password = ref("");
const errorMessage = ref("");

// Instanciar el router
const router = useRouter();

// Definir la función de login
const login = async () => {
    try {
        await auth.signInWithEmailAndPassword(email.value, password.value);
        // Redirigir a la ruta de destino después del login exitoso
        router.push("/presentation");
    } catch (error) {
        errorMessage.value = error.message;
        console.error("Error durante el inicio de sesión:", error);
    }
};
</script>

<style scoped>
/* Importaciones de CSS */
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css");
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css");

.container-login-form {
    max-width: 700px;
    width: 700px;
    margin-top: 200px;
    margin-left: auto; /* Alinea el formulario a la derecha */
    text-align: center;
    background: rgb(255, 255, 255);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.input-group-login-form {
    position: relative;
    margin-bottom: 25px;
}

.input-group-login-form i {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: #999;
}

.form-control {
    padding-left: 35px;
}

.btn {
    width: 100%;
}

.body-login {
    margin: 0;
    height: 100vh;
    display: flex;
    justify-content: flex-end !important; /* Alinea el formulario a la derecha */
    align-items: center !important; /* Centra verticalmente */
    padding: 0;
    background-color: var(--color-primary);
    background-image: url("../assets/td.png");
    background-repeat: no-repeat;
    background-size: cover;
    color: #f9f9f9;
    animation: rotate 6s infinite alternate linear;
}

.container-login-form {
    max-width: 500px;
    width: 500px;
    background: rgb(255, 255, 255);
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    margin-right: 10% !important; /* Forza la alineación a la derecha */
    margin-left: auto !important; /* Asegura que se mantenga a la derecha */
}

.input-group-login-form {
    position: relative;
    margin-bottom: 1.5rem;
}

.input-group-login-form input {
    padding-left: 2.5rem;
}

.btn {
    display: inline-block;
    background-color: white;
    color: #522db2; /* Color del texto */
    padding: 10px 20px;
    border-radius: 25px;
    margin-top: 10px; /* Margen superior */
    margin-left: 10px; /* Margen izquierdo */
    text-decoration: none; /* Eliminar subrayado */
    font-weight: bold; /* Negrita para resaltar */
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Sombra suave */
    transition: all 0.3s ease; /* Transición suave para el hover */
    border: 2px solid #522db2; /* Borde púrpura */
}

.btn:hover {
    background-color: #522db2; /* Cambia el fondo al púrpura */
    color: white; /* Cambia el color del texto a blanco */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* Sombra más pronunciada al pasar el mouse */
}

.btn:active {
    background-color: #522db2 !important; /* Cambia el fondo al púrpura */
    color: white; /* Cambia el color del texto a blanco */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* Sombra más pronunciada al pasar el mouse */
}
</style>
