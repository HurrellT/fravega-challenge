# Fravega Challenge

Proyecto [Next.js](https://nextjs.org) creado con [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Para empezar

Corre el servidor de desarrollo con:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Luego navega a [http://localhost:3000](http://localhost:3000).

# Objetivo
Crear una aplicación web con NextJS (page router), que permita buscar, listar usuarios de GitHub, marcarlos como favoritos y mostrar detalles de un usuario seleccionado utilizando la API de GitHub Users.

# Requisitos
1. Home (usar Ssr)
* Obtén una lista inicial de usuarios de la API de GitHub Users.
* Mostrar los usuarios en una lista con sus nombres y avatares.
* Implementar un buscador que permita filtrar los usuarios haciendo peticiones a la API por nombre.
* Cada usuario debe tener un enlace a una página de detalle.
* Poder poner como favorito los usuarios (sin necesidad de persistir)
2. Página de Detalle del Usuario (usar Ssr)
* Mostrar los detalles de un usuario específico cuando se hace clic en él
desde la página de listado (nombre, avatar, bio, repositorios, etc.).
* Mostrar si es favorito y permitir agregar o eliminarlo
3. Estilo
* Podes usar CSS puro, styled-components o una librería de componentes
como Material-UI para el estilo.

# API provista
https://api.github.com/users

https://api.github.com/search/users?q={term}

https://api.github.com/users/{username}

# Decisiones de diseño

Dada la libertad para utilizar librerías de componentes decidí utilizar ShadcnUI que permite la customización de los componentes directamente desde el código y no mediante una interfaz provista por el desarrollador de la librería de componentes.
ShadcnUI utiliza TailwindCSS, por eso mismo utilice TailwindCSS para el resto de los estilos, manteniendo consistencia y coherencia a lo largo del proyecto.