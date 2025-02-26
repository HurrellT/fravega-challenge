This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/pages/building-your-application/routing/api-routes) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/pages/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn-pages-router) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/pages/building-your-application/deploying) for more details.






Dada la libertad para utilizar librerias de componentes decidi utilizar ShadcnUI que permite la customizacion de los componentes directamente desde el codigo y no mediante una interfaz provista.
ShadcnUI utiliza TailwindCSS, por eso mismo utilice TailwindCSS para el resto de los estilos, manteniendo consistencia y coherencia en el proyecto.
Tengo una filosofia de utilizar la menor cantidad de dependencias y librerias posibles, por eso tambien me parece una buena opcion ShadcnUI o librerias como RadixUI que brinda componentes primitivos y completamente customizables gracias a ser open-source.





Home (usar csr)
X Obtén una lista inicial de usuarios de la API de GitHub Users.
X Mostrar los usuarios en una lista con sus nombres y avatares.
○ Implementar un buscador que permita filtrar los usuarios haciendo
peticiones a la API por nombre.
○ Cada usuario debe tener un enlace a una página de detalle.
○ Poder poner como favorito los usuarios (sin necesidad de persistir)
2. Página de Detalle del Usuario (usar ssr)
○ Mostrar los detalles de un usuario específico cuando se hace clic en él
desde la página de listado (nombre, avatar, bio, repositorios, etc.).
○ Mostrar si es favorito y permitir agregar o eliminarlo
3. Estilo
○ Podes usar CSS puro, styled-components o una librería de componentes
como Material-UI para el estilo.