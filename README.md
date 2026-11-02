# StudyFlow

StudyFlow es una aplicación móvil desarrollada con NativeScript y Angular que permite organizar y consultar recursos académicos. El proyecto integra un servicio web desarrollado con Express para consultar recursos, además de funcionalidades para administrar favoritos y una lista personal de lectura.

## Tecnologías utilizadas

- NativeScript
- Angular
- TypeScript
- Node.js
- Express
- NgRx Store
- Ngrok

## Funcionalidades

- **Navegación:** menú lateral para acceder a las diferentes secciones.
- **Búsqueda de recursos:** permite buscar recursos académicos por título o categoría.
- **API REST:** servidor Express que expone un servicio GET para consultar y filtrar recursos.
- **Configuración de conexión:** permite establecer la URL del servidor mediante un archivo de configuración.
- **Favoritos:** permite guardar y eliminar recursos favoritos.
- **Persistencia:** almacena el nombre de usuario y los favoritos en el dispositivo.
- **Lista de lectura:** permite agregar recursos mediante el botón "Leer ahora".
- **Gestión de lectura con NgRx:** utiliza acciones, reducer y selectors para administrar el estado de la lista de lectura.
- **Pantalla principal:** muestra los recursos agregados a la lista de lectura y permite quitarlos.

## Estructura general del proyecto

```text
StudyFlow/
├── backend/
│   ├── package.json
│   └── ...
├── src/
│   └── app/
│       ├── browse/
│       ├── core/
│       ├── favorites/
│       ├── features/
│       ├── home/
│       ├── search/
│       ├── services/
│       ├── settings/
│       ├── shared/
│       ├── splash/
│       ├── store/
│       └── tasks/
├── package.json
└── README.md
```

## Requisitos previos

Para ejecutar el proyecto se necesita:

- Node.js y npm.
- NativeScript CLI.
- Java JDK 21.
- Android SDK.
- Un dispositivo Android o emulador.
- Ngrok para exponer el servidor Express mediante una URL pública.

## Instalación y ejecución

### 1. Clonar el repositorio

```bash
git clone https://github.com/mrleo0127/StudyFlow-Avance2.git
cd StudyFlow-Avance2
```

### 2. Instalar las dependencias de la aplicación

Desde la carpeta principal del proyecto:

```bash
npm install
```

### 3. Instalar las dependencias del servidor

Entrar a la carpeta del backend:

```bash
cd backend
npm install
```

Iniciar el servidor utilizando el comando definido en el archivo `backend/package.json`.

El servidor utiliza el puerto `3000` y expone el servicio:

```text
GET /api/resources
```

Permite filtrar los recursos mediante el parámetro `search`.

Ejemplo:

```text
/api/resources?search=programacion
```

### 4. Configurar Ngrok

El servidor Express debe estar ejecutándose antes de iniciar el túnel.

En una terminal independiente, ejecutar:

```bash
ngrok http 3000
```

Ngrok proporcionará una dirección pública HTTPS. Por ejemplo:

```text
https://ejemplo.ngrok-free.app
```

Si es la primera vez que se utiliza Ngrok, será necesario crear una cuenta y configurar el token de autenticación siguiendo su documentación oficial.

### 5. Configurar la URL de la API

Abrir el archivo:

```text
src/app/core/config/api.config.ts
```

Reemplazar la dirección base por la URL HTTPS generada por Ngrok:

```typescript
export const API_CONFIG = {
    baseUrl: 'https://ejemplo.ngrok-free.app'
};
```

La URL debe corresponder al túnel activo. No se debe agregar `/api/resources` a `baseUrl`, ya que esa ruta se establece desde el servicio de recursos.

**Importante:** las direcciones gratuitas de Ngrok pueden cambiar. Cada persona que ejecute el proyecto debe configurar su propia URL y mantener activo el túnel mientras utilice la aplicación.

### 6. Ejecutar la aplicación móvil

Regresar a la carpeta principal del proyecto y ejecutar:

```bash
ns run android
```

Se requiere tener configurado el entorno de desarrollo Android y un dispositivo conectado o emulador disponible.

## Persistencia de datos

- El nombre de usuario se almacena localmente mediante `ApplicationSettings`.
- Los favoritos se almacenan localmente en el dispositivo.
- La lista de lectura utiliza NgRx Store y se mantiene en memoria durante la ejecución de la aplicación. No se garantiza su conservación después de cerrar la aplicación.
