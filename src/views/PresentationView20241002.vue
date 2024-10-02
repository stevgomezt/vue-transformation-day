<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light fixed-top">
            <a class="navbar-brand" href="#">
                <img
                    src="../assets/logodoblexs.jpg"
                    class="logo-doble"
                    alt=""
                />
            </a>
            <button
                class="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarNav"
                aria-controls="navbarNav"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon"></span>
            </button>
            <div
                class="collapse navbar-collapse justify-content-end"
                id="navbarNav"
            >
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <router-link
                            to="/"
                            id="logout-button"
                            class="logout-btn"
                            >Cerrar Sesión</router-link
                        >
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <div class="carousel" ref="carousel">
        <div class="list" ref="list">
            <div
                class="item"
                :style="{
                    backgroundImage: `url(${require('../assets/17.jpg')})`,
                }"
            >
                <div class="content">
                    <!-- <div class="title"></div>
                    <div class="name"></div> -->
                    <!-- <div class="des">Lorem ipsum dolor sit amet...</div>
                    <div class="btn">
                        <button>Ver más</button>
                    </div> -->
                </div>
            </div>
            <div
                class="item"
                :style="{
                    backgroundImage: `url(${require('../assets/10.jpg')})`,
                }"
            ></div>
            <div
                class="item"
                :style="{
                    backgroundImage: `url(${require('../assets/11.jpg')})`,
                }"
            >
                <div class="content">
                    <!-- <div class="title"></div>
                    <div class="name"></div> -->
                    <!-- <div class="des">Lorem ipsum dolor sit amet...</div>
                    <div class="btn">
                        <button>Ver más</button>
                    </div> -->
                </div>
            </div>
            <div
                class="item"
                :style="{
                    backgroundImage: `url(${require('../assets/12.jpg')})`,
                }"
            >
                <div class="content">
                    <!-- <div class="title"></div>
                    <div class="name"></div> -->
                    <!-- <div class="des">Lorem ipsum dolor sit amet...</div>
                    <div class="btn">
                        <button>Ver más</button>
                    </div> -->
                </div>
            </div>
            <div
                class="item"
                :style="{
                    backgroundImage: `url(${require('../assets/13.jpg')})`,
                }"
            >
                <div class="content">
                    <!-- <div class="title"></div>
                    <div class="name"></div> -->
                    <!-- <div class="des">Lorem ipsum dolor sit amet...</div>
                    <div class="btn">
                        <button>Ver más</button>
                    </div> -->
                </div>
            </div>
            <div
                class="item"
                :style="{
                    backgroundImage: `url(${require('../assets/14.jpg')})`,
                }"
            >
                <div class="content">
                    <!-- <div class="title"></div>
                    <div class="name"></div> -->
                    <!-- <div class="des">Lorem ipsum dolor sit amet...</div>
                    <div class="btn">
                        <button>Ver más</button>
                    </div> -->
                </div>
            </div>
            <div
                class="item"
                :style="{
                    backgroundImage: `url(${require('../assets/15.jpg')})`,
                }"
            >
                <div class="content">
                    <!-- <div class="title"></div>
                    <div class="name"></div> -->
                    <!-- <div class="des">Lorem ipsum dolor sit amet...</div>
                    <div class="btn">
                        <button>Ver más</button>
                    </div> -->
                </div>
            </div>
            <div
                class="item"
                :style="{
                    backgroundImage: `url(${require('../assets/16.jpg')})`,
                }"
            >
                <div class="content">
                    <!-- <div class="title"></div>
                    <div class="name"></div> -->
                    <!-- <div class="des">Lorem ipsum dolor sit amet...</div>
                    <div class="btn">
                        <button>Ver más</button>
                    </div> -->
                </div>
            </div>
        </div>

        <!-- Flechas de navegación -->
        <div class="arrows">
            <button class="prev" ref="prevBtn">
                <!-- Icono de flecha izquierda -->
                <font-awesome-icon :icon="['fas', 'arrow-left']" />
            </button>
            <button class="next" ref="nextBtn">
                <!-- Icono de flecha derecha -->
                <font-awesome-icon :icon="['fas', 'arrow-right']" />
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../firebase.js";

// Referencias del carrusel
const nextBtn = ref(null);
const prevBtn = ref(null);
const carousel = ref(null);
const list = ref(null);
const runningTime = ref(null);
let runTimeOut = null;

// Uso de router
const router = useRouter();

// Función para mostrar el slider
const showSlider = (type) => {
    if (!list.value || !carousel.value) return; // Asegúrate de que los elementos existen

    let sliderItemsDom = list.value.querySelectorAll(".item");
    if (sliderItemsDom.length === 0) return;

    if (type === "next") {
        list.value.appendChild(sliderItemsDom[0]);
        carousel.value.classList.add("next");
    } else {
        list.value.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
        carousel.value.classList.add("prev");
    }

    clearTimeout(runTimeOut);

    runTimeOut = setTimeout(() => {
        if (carousel.value) {
            carousel.value.classList.remove("next");
            carousel.value.classList.remove("prev");
        }
    }, 3000);

    resetTimeAnimation();
};

// Función para resetear la animación de tiempo
const resetTimeAnimation = () => {
    if (runningTime.value) {
        runningTime.value.style.animation = "none";
        runningTime.value.offsetHeight; // Trigger reflow
        runningTime.value.style.animation = null;
        runningTime.value.style.animation = "runningTime 7s linear 1 forwards";
    }
};

// Función para configurar el logout
const setupLogout = () => {
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", async (e) => {
            e.preventDefault();
            try {
                await auth.signOut();
                console.log("Cierre de sesión exitoso");
                router.push("/"); // Redirigir a la ruta de login
            } catch (error) {
                console.error(
                    "Error durante el cierre de sesión:",
                    error.message
                );
            }
        });
    }
};

// Limpiar el timeout y referencias al desmontar el componente
onBeforeUnmount(() => {
    clearTimeout(runTimeOut);
    nextBtn.value = null;
    prevBtn.value = null;
    carousel.value = null;
    list.value = null;
    runningTime.value = null;
});

// Montar el componente
onMounted(() => {
    nextBtn.value.onclick = () => showSlider("next");
    prevBtn.value.onclick = () => showSlider("prev");
    resetTimeAnimation();
    setupLogout();
});
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap");

* {
    margin: 0 !important;
    padding: 0;
    box-sizing: border-box;
    font-family: "Poppins", sans-serif;
}

.carousel {
    width: 100vw;
    height: 100vh;
    margin-top: -50px;
    overflow: hidden;
    position: relative;
}

/* .carousel .list .item {
    width: 180px;
    height: 250px;
    position: absolute;
    top: 80%;
    transform: translateY(-70%);
    left: 70%;
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    background-position: 50% 50%;
    background-size: cover;
    z-index: 100;
    transition: 1s;
} */

.carousel .list .item {
    width: 180px;
    height: 150px;
    position: absolute;
    top: 94%;
    transform: translateY(-70%);
    left: 70%;
    border-radius: 20px;
    box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
    background-position: 50% 50%;
    background-size: cover;
    z-index: 100;
    transition: 1s;
}

.carousel .list .item:nth-child(1),
.carousel .list .item:nth-child(2) {
    top: 0;
    left: 0;
    transform: translate(0, 0);
    border-radius: 0;
    width: 100%;
    height: 100%;
}

.carousel .list .item:nth-child(3) {
    left: 67%;
}

.carousel .list .item:nth-child(4) {
    left: calc(67% + 200px);
}

.carousel .list .item:nth-child(5) {
    left: calc(67% + 400px);
}

.carousel .list .item:nth-child(6) {
    left: calc(67% + 600px);
}

.carousel .list .item:nth-child(n + 7) {
    left: calc(67% + 800px);
    opacity: 0;
}

.list .item .content {
    position: fixed; /* Cambiado de absolute a fixed */
    top: 20px; /* Ajusta la distancia desde la parte superior */
    left: 50%; /* Centrado horizontalmente */
    transform: translate(-50%, 0); /* Ajusta el centrado */
    color: #fff;
    display: none;
    background-color: #0000009e;
    padding: 20px;
    border-radius: 25px;
    width: max-content;
}

.list .item:nth-child(2) .content {
    display: block;
}

.content .title {
    font-size: 45px;
    text-transform: uppercase;
    color: #522db2;
    font-weight: bold;
    line-height: 1;
    opacity: 0;
    animation: animate 1s ease-in-out 0.3s 1 forwards;
}

.content .name {
    font-size: 35px;
    text-transform: uppercase;
    font-weight: bold;
    line-height: 1;
    text-shadow: 3px 4px 4px rgba(255, 255, 255, 0.8);
    opacity: 0;
    animation: animate 1s ease-in-out 0.6s 1 forwards;
}

.content .des {
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 18px;
    margin-left: 5px;
    opacity: 0;
    animation: animate 1s ease-in-out 0.9s 1 forwards;
}

.content .btn {
    margin-left: 5px;
    opacity: 0;
    animation: animate 1s ease-in-out 1.2s 1 forwards;
}

.content .btn button {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    font-size: 16px;
    border: 2px solid #fff;
}

.arrows {
    position: absolute;
    bottom: 20px; /* Ajusta esta distancia según prefieras */
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 10px;
    align-items: center;
    z-index: 100;
}

.arrows button {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: #522db2;
    color: #fff;
    border: none;
    outline: none;
    font-size: 16px;
    cursor: pointer;
}

.timeRunning {
    position: absolute;
    top: 90%;
    right: 40%;
    height: 6px;
    background-color: rgba(0, 0, 0, 0.1);
    width: 300px;
    border-radius: 50px;
    overflow: hidden;
}

.timeRunning::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    background-color: #522db2;
    transform: scaleX(0);
    transform-origin: left;
    animation: runningTime 7s linear 1 forwards;
}

@keyframes animate {
    from {
        opacity: 0;
        transform: translateY(10px);
    }
    to {
        opacity: 1;
        transform: translateY(0px);
    }
}

@keyframes runningTime {
    0% {
        transform: scaleX(0);
    }
    100% {
        transform: scaleX(1);
    }
}

.logo-doble {
    width: 90px;
    padding: 15px;
}

.logout-btn {
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

.logout-btn:hover {
    background-color: #522db2; /* Cambia el fondo al púrpura */
    color: white; /* Cambia el color del texto a blanco */
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2); /* Sombra más pronunciada al pasar el mouse */
}
</style>
