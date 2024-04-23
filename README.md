# gdGagues

## *Descripción del Proyecto:*
Este proyecto consiste en el desarrollo de una plataforma de comercio electrónico dedicada a la venta de accesorios para dispositivos informáticos y móviles. La aplicación proporciona una interfaz intuitiva y segura que permite a los usuarios explorar y comprar una amplia gama de productos tecnológicos.

## Características Principales:
- **Rol de usuario**: La plataforma ofrece dos roles principales: Empresa y Usuario.
- **Listado de Productos:** Catálogo completo de accesorios tecnológicos con descripciones detalladas y precios.

## Tecnologías Utilizadas
- **Frontend**: Angular
- **Backend**: Node.js, Express.ts
- **Database**: Mysql *Procesos almacenados*
- **Autenticación y Autorización:** JSON Web Tokens (JWT).
- **Seguridad:**: Encriptado de datos sensibles

## Instalación
 1. Clona el repositorio en tu maquina local
 2. Instala las dependencias usando `npm install`
 3. crea el archivo `.env`
 4. Configura el archivo `.env`
 5. Inicia la aplicación con `npm run dev`

## variables de entorno
  1. `JWT_EXPIRES_IN`
  2. `JWT_SECRET`
  3. `DB_HOST`
  4. `DB_USER`
  5. `DB_PASSWORD`
  6. `DB_NAME`
  7. `PORT`


## Opciones de npm
- `npm run dev`: Iniciaras el servidor usando nodemon, y la estructura para desabolladores
- `npm run start`: Iniciaras el servidor usando estática de node, esta función *start*, es principalmente para el servidor 
- `npm run build`: Iniciaras la construcción del servidor, para pasar el servidor de *ts* a *js*

## Estructura base

```
└── 📁backendPruebaRender
    └── .env
    └── .gitignore
    └── 📁src
        └── app.ts
        └── 📁config
        └── 📁controllers
            └── 📁productController
            └── 📁userController
        └── 📁doc
        └── 📁dto
            └── 📁product
            └── 📁user
        └── 📁helpers
            └── 📁product
        └── 📁middlewares
            └── 📁product
            └── 📁user
        └── 📁repositories
        └── 📁routes
        └── 📁services
            └── 📁product
                └── 📁microService
            └── 📁user
                └── 📁microService
        └── 📁test
            └── 📁product
            └── 📁user
    └── tsconfig.json
```

## Autor
- [@aalejandrozuleta](https://github.com/aalejandrozuleta)

## Documentación
[Documentación](https://www.notion.so/Documentaci-n-392f0951216c42df8b88c5237dde1ac2)

## Front-end
[Front-end](https://github.com/aalejandrozuleta/frontendPrueba.git)

## Database
[Database](https://github.com/aalejandrozuleta/database-prueba-render.git)


# gdGauges (English)

## *Project Description:*
This project involves the development of an e-commerce platform dedicated to selling accessories for computer and mobile devices. The application provides an intuitive and secure interface that allows users to explore and purchase a wide range of technological products.

## Main Features:
- **User Roles**: The platform offers two main roles: Business and User.
- **Product Listing**: A complete catalog of technological accessories with detailed descriptions and prices.

## Technologies Used
- **Frontend**: Angular
- **Backend**: Node.js, Express.ts
- **Database**: MySQL *Stored Procedures*
- **Authentication and Authorization**: JSON Web Tokens (JWT).
- **Security**: Data encryption

## Installation
1. Clone the repository to your local machine.
2. Install dependencies using `npm install`.
3. Create the `.env` file.
4. Configure the `.env` file.
5. Start the application with `npm run dev`.

## Environment Variables
1. `JWT_EXPIRES_IN`
2. `JWT_SECRET`
3. `DB_HOST`
4. `DB_USER`
5. `DB_PASSWORD`
6. `DB_NAME`
7. `PORT`

## npm Commands
- `npm run dev`: Start the server using nodemon, set up for developers.
- `npm run start`: Start the server using Node.js static method, mainly for deployment.
- `npm run build`: Build the server from TS to JS.

## Base Structure

```
└── 📁backendPruebaRender
    └── .env
    └── .gitignore
    └── 📁src
        └── app.ts
        └── 📁config
        └── 📁controllers
            └── 📁productController
            └── 📁userController
        └── 📁doc
        └── 📁dto
            └── 📁product
            └── 📁user
        └── 📁helpers
            └── 📁product
        └── 📁middlewares
            └── 📁product
            └── 📁user
        └── 📁repositories
        └── 📁routes
        └── 📁services
            └── 📁product
                └── 📁microService
            └── 📁user
                └── 📁microService
        └── 📁test
            └── 📁product
            └── 📁user
    └── tsconfig.json
```


## Author
- [@aalejandrozuleta](https://github.com/aalejandrozuleta)

## Documentation
[Documentación](https://www.notion.so/Documentaci-n-392f0951216c42df8b88c5237dde1ac2)

## Front-end
[Front-end](https://github.com/aalejandrozuleta/frontendPrueba.git)

## Database
[Database](https://github.com/aalejandrozuleta/database-prueba-render.git)

## 
![Logo](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*a6oSE8C5z6SjVtjj.png)
