# 📌 Aureolab proyecto fronted

Este proyecto es para una prueba técnica donde se crea un tipo de ecommerce para el consumo de la API en nodejs y express. Dentro de está página
podras listar productos, añadir al carro de compras, hacer checkout de los productos ir a pagar, etc! Todo lo que haras y consumiras será desde el backend creado tambien para esta prueba.

---

# 🚀 Tecnologías Utilizadas

✅ Vite
✅ Reacjs
✅ TypeScript
✅ Tailwind
✅ Axios

---

### 🔹 **Objetivo**

El objetivo es poder dentro de la página hacer:

---

- Mostrar una lista de productos disponibles.
- Agregar productos a un carrito de compras.
- Permitir realizar pagos a través de Stripe.
- Sección de órdenes de compra donde se pueda:
- Solicitar un reembolso total o parcial.

---

# DEMO

```

https://aureolab-fronted.netlify.app/

```

# Capturas de pantalla

<div align="center">
  <img src="https://i.imgur.com/9wWXrTK.png" width="300" style="margin: 0 10px;">
  <img src="https://i.imgur.com/7jgi9Pn.png" width="300" style="margin: 0 10px;">
  <img src="https://i.imgur.com/Ikc7Bhr.png" width="300" style="margin: 0 10px;">
  <img src="https://i.imgur.com/cBVE1L7.png" width="300" style="margin: 0 10px;">
  <img src="https://i.imgur.com/Yji4wHy.png" width="300" style="margin: 0 10px;">
</div>

---

# 📁 Ejecución del proyecto

## Guía de Instalación y Ejecución del Proyecto

Esta guía te ayudará a configurar y ejecutar el proyecto en tu entorno local

## Requisitos Previos

- [Vite + ReactJs](https://vite.dev/)
- [Tailwindcss](https://tailwindcss.com/)
- [Git](https://git-scm.com/)

## Instalación Local

### 1. Clonar el Repositorio

```bash

git clone [URL_DEL_REPOSITORIO]

cd [NOMBRE_DEL_PROYECTO]

```

### 2. Instalar Dependencias

```bash

npm install

```

### 3. Configurar Variables de Entorno

El proyecto utiliza un archivo `.env` para las variables de entorno. Existe un archivo `.env.example` como plantilla.

```bash

cp .env.example  .env

```

Edita el archivo `.env` con tus configuraciones:

```

VITE_BACKEND_API_URL=tu_url_backend

```

### 4. Iniciar el proyecto

Para ejecutar el proyecto localmente con TypeScript:

```bash

npn run dev

```

El servidor debería estar funcionando en `http://localhost:5189`.

## Soporte

Si tienes algún problema, por favor crea un issue en el repositorio o contacta al equipo de desarrollo.
