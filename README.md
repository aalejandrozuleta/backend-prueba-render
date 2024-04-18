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
[Documentación](404)

![logotipo](https://miro.medium.com/v2/resize:fit:1400/format:webp/0*a6oSE8C5z6SjVtjj.png)

