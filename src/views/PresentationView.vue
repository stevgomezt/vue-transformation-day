<template>
    <header>
        <nav class="navbar navbar-expand-lg navbar-light fixed-top">
            <a class="navbar-brand" href="#">
                <img
                    src="../assets/logodoblexs.png"
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
                    backgroundImage: `url(${require('../assets/6.png')})`,
                }"
            >
                <div class="content">
                    <div class="title">IA</div>
                    <div class="name">Generativa</div>
                    <div class="des">Lorem ipsum dolor sit amet...</div>
                    <div class="btn">
                        <button>Ver más</button>
                    </div>
                </div>
            </div>
            <div
                class="item"
                :style="{
                    backgroundImage: `url(${require('../assets/1.png')})`,
                }"
            >
                <div class="content">
                    <div class="title">Investigación de</div>
                    <div class="name">Mercados</div>
                    <div class="des">Lorem ipsum dolor sit amet...</div>
                    <div class="btn">
                        <button>Ver más</button>
                    </div>
                </div>
            </div>
            <div
                class="item"
                :style="{
                    backgroundImage: `url(${require('../assets/2.png')})`,
                }"
            >
                <div class="content">
                    <div class="title">PAC</div>
                    <div class="name">V2</div>
                    <div class="des">Lorem ipsum dolor sit amet...</div>
                    <div class="btn">
                        <button>Ver más</button>
                    </div>
                </div>
            </div>
            <div
                class="item"
                :style="{
                    backgroundImage: `url(${require('../assets/3.png')})`,
                }"
            >
                <div class="content">
                    <div class="title">
                        Conocimiento y <br />
                        Gestión
                    </div>
                    <div class="name">
                        Inteligente del <br />
                        Cliente
                    </div>
                    <div class="des">Lorem ipsum dolor sit amet...</div>
                    <div class="btn">
                        <button>Ver más</button>
                    </div>
                </div>
            </div>
            <div
                class="item"
                :style="{
                    backgroundImage: `url(${require('../assets/4.png')})`,
                }"
            >
                <div class="content">
                    <div class="title">Smart</div>
                    <div class="name">Communication</div>
                    <div class="des">Lorem ipsum dolor sit amet...</div>
                    <div class="btn">
                        <button>Ver más</button>
                    </div>
                </div>
            </div>
            <div
                class="item"
                :style="{
                    backgroundImage: `url(${require('../assets/5.png')})`,
                }"
            >
                <div class="content">
                    <div class="title">Modelos de Analítica</div>
                    <div class="name">Predictiva</div>
                    <div class="des">Lorem ipsum dolor sit amet...</div>
                    <div class="btn">
                        <button>Ver más</button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Flechas de navegación -->
        <div class="arrows">
            <button class="prev" ref="prevBtn">
                <i class="fas fa-arrow-left"></i>
            </button>
            <button class="next" ref="nextBtn">
                <i class="fas fa-arrow-right"></i>
            </button>
        </div>

        <!-- Barra de tiempo en ejecución -->
        <div class="timeRunning" ref="runningTime"></div>
    </div>
</template>

<script>
import { auth } from "../firebase.js";

export default {
    name: "PresentationView",
    mounted() {
        // Asignar referencias del carrusel
        this.nextBtn = this.$refs.nextBtn;
        this.prevBtn = this.$refs.prevBtn;
        this.carousel = this.$refs.carousel;
        this.list = this.$refs.list;
        this.runningTime = this.$refs.runningTime;

        // Configurar eventos de botones del carrusel
        this.nextBtn.onclick = () => this.showSlider("next");
        this.prevBtn.onclick = () => this.showSlider("prev");

        // Iniciar la animación de tiempo
        this.resetTimeAnimation();

        // Configurar cierre de sesión
        this.setupLogout();
    },
    methods: {
        setupLogout() {
            const logoutButton = document.getElementById("logout-button");
            if (logoutButton) {
                logoutButton.addEventListener("click", (e) => {
                    e.preventDefault(); // Prevenir la acción del enlace por defecto
                    auth.signOut()
                        .then(() => {
                            console.log("Cierre de sesión exitoso");
                            this.$router.push("/"); // Redirigir a la ruta de login
                        })
                        .catch((error) => {
                            console.error(
                                "Error durante el cierre de sesión:",
                                error.message
                            );
                        });
                });
            }
        },
        resetTimeAnimation() {
            if (this.runningTime) {
                this.runningTime.style.animation = "none";
                this.runningTime.offsetHeight; // trigger reflow
                this.runningTime.style.animation = null;
                this.runningTime.style.animation =
                    "runningTime 7s linear 1 forwards";
            }
        },
        showSlider(type) {
            let sliderItemsDom = this.list.querySelectorAll(".item");
            if (sliderItemsDom.length === 0) return; // Asegúrate de que haya elementos

            if (type === "next") {
                this.list.appendChild(sliderItemsDom[0]);
                this.carousel.classList.add("next");
            } else {
                this.list.prepend(sliderItemsDom[sliderItemsDom.length - 1]);
                this.carousel.classList.add("prev");
            }

            clearTimeout(this.runTimeOut);

            this.runTimeOut = setTimeout(() => {
                this.carousel.classList.remove("next");
                this.carousel.classList.remove("prev");
            }, 3000); // Cambia este tiempo si es necesario

            this.resetTimeAnimation(); // Reinicia la animación de tiempo
        },
    },
};
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

.carousel .list .item {
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
    position: absolute;
    top: 50%;
    left: 100px;
    transform: translateY(-50%);
    color: #fff;
    display: none;
    background-color: #0000009e;
    padding: 20px;
    border-radius: 25px;
}

.list .item:nth-child(2) .content {
    display: block;
}

.content .title {
    font-size: 100px;
    text-transform: uppercase;
    color: #522db2;
    font-weight: bold;
    line-height: 1;
    opacity: 0;
    animation: animate 1s ease-in-out 0.3s 1 forwards;
}

.content .name {
    font-size: 100px;
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
