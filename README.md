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
- [@aalejandrozuleta](https://github.com/aalejandrozuleta);

## Documentación
[Documentación](404)

![logotipo](https://www.google.com/search?q=typescript+y+express+logos&sca_esv=6b1c5e95a3d0b06b&sca_upv=1&udm=2&biw=1366&bih=681&sxsrf=ACQVn0_l48rvvyrTwjm6O32hBsL8uAOxjA%3A1713472209123&ei=0YIhZu2LB9r8wbkP1-i9kAE&ved=0ahUKEwituO2yzcyFAxVafjABHVd0DxIQ4dUDCBA&uact=5&oq=typescript+y+express+logos&gs_lp=Egxnd3Mtd2l6LXNlcnAiGnR5cGVzY3JpcHQgeSBleHByZXNzIGxvZ29zSJBGULwEWPxEcA14AJABAZgBqwGgAYUfqgEEMS4yOLgBA8gBAPgBAZgCEqACvArCAgoQABiABBhDGIoFwgIFEAAYgATCAgYQABgIGB7CAgcQABiABBgYmAMAiAYBkgcDOS45oAePGQ&sclient=gws-wiz-serp#vhid=bHX8wyfBzFt6LM&vssid=mosaic)

