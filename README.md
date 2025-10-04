# Sistema de Gestión de Tarjetas - Monobank

Aplicación full-stack para la gestión de tarjetas bancarias con validaciones en tiempo real y persistencia de datos.

## 🏗️ Arquitectura del Proyecto

El proyecto está dividido en dos aplicaciones independientes:

- **Frontend (monolithic.react.js)**: Aplicación React + TypeScript + Vite
- **Backend (monolithic.node.js)**: API REST con Express + TypeScript

## 📋 Requisitos Previos

- Node.js (v18 o superior)
- npm (v9 o superior)

## 🚀 Instrucciones de Instalación y Ejecución

### 1. Backend (API)

```bash
# Navegar a la carpeta del backend
cd monolithic.node.js

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

El servidor se ejecutará en `http://localhost:3000`

**Scripts disponibles:**
- `npm run dev` - Ejecuta el servidor en modo desarrollo con hot-reload
- `npm run build` - Compila el proyecto TypeScript
- `npm start` - Ejecuta el servidor en modo producción (requiere build previo)

### 2. Frontend (Aplicación React)

```bash
# Abrir una nueva terminal y navegar a la carpeta del frontend
cd monolithic.react.js

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev
```

La aplicación se ejecutará en `http://localhost:5173`

**Scripts disponibles:**
- `npm run dev` - Ejecuta la aplicación en modo desarrollo
- `npm run build` - Genera el build de producción
- `npm run preview` - Previsualiza el build de producción

### 3. Orden de Ejecución

**IMPORTANTE:** Debe ejecutar primero el backend y luego el frontend para que la aplicación funcione correctamente.

## ✅ Funcionalidades Implementadas

### Primer Bloque - Frontend (100% Completado)

#### 1. Maquetación y Diseño ✅
- [x] **a)** Todos los campos son requeridos
- [x] **b)** Edición en tiempo real del diseño de la tarjeta
- [x] **c)** Campo tarjeta solo acepta números, máximo 16 caracteres
- [x] **d)** Campo fecha con formato MM/YY
- [x] **e)** Validación de mes (01-12) y año (22 hasta año actual + 5)
- [x] **f)** Campo nombre solo acepta letras y tildes, máximo 20 caracteres
- [x] **g)** Mensajes de error en rojo debajo de cada campo inválido

#### 2. Funcionalidad de Agregar Tarjeta ✅
- [x] **a)** Bloque de visualización de tarjetas agregadas
- [x] **b)** Identificador único para cada tarjeta (UUID)
- [x] **c)** Validación completa del formulario antes de enviar
- [x] **d)** Enmascaramiento del número de tarjeta (XX**********XXXX)

#### 3. Funcionalidad de Cancelar ✅
- [x] Limpieza de todos los campos al pulsar Cancelar

### Segundo Bloque - Backend (100% Completado)

#### 1. RESTful API ✅
- [x] **a)** Métodos CRUD completos:
  - `POST /api/cards` - Crear tarjeta
  - `GET /api/cards` - Obtener todas las tarjetas
  - `PUT /api/cards/:id` - Actualizar tarjeta
  - `DELETE /api/cards/:id` - Eliminar tarjeta (implementado pero no usado en frontend)
- [x] **b)** Web API con Express.js
- [x] **c)** Sin autenticación (según especificaciones)

#### 2. Integración Frontend-Backend ✅
- [x] **a)** Almacenamiento persistente en archivo JSON (`data.json`)
- [x] **b)** Validación de campos requeridos en backend
- [x] **c)** Respuestas HTTP correctas:
  - `200` - OK
  - `201` - Created
  - `400` - Bad Request (validación fallida)
  - `404` - Not Found
  - `500` - Internal Server Error

## 🎯 Funcionalidades Extra Implementadas

### Frontend
1. **Edición de Tarjetas** - Al hacer clic en una tarjeta guardada, se carga en el formulario para editar
2. **Estados de Carga** - Indicadores visuales durante operaciones asincrónicas
3. **Manejo de Errores** - Alertas visuales cuando ocurren errores en las peticiones
4. **Formateo Automático** - Los campos se formatean automáticamente mientras el usuario escribe
5. **Diseño Responsivo** - Interfaz adaptable a diferentes tamaños de pantalla
6. **Animaciones** - Transiciones suaves y efectos hover en las tarjetas

### Backend
1. **Arquitectura Limpia** - Separación en capas (routes, middleware, utils, types)
2. **Validaciones Espejadas** - Las mismas validaciones del frontend en el backend
3. **Manejo de Errores Centralizado** - Middleware de error handling
4. **CORS Configurado** - Permite peticiones desde el frontend
5. **Cache Control** - Headers para evitar caché en peticiones GET
6. **TypeScript** - Tipado estricto en todo el proyecto
7. **Async/Await** - Manejo moderno de operaciones asíncronas

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18** - Librería de UI
- **TypeScript** - Superset tipado de JavaScript
- **Vite** - Build tool y dev server
- **Formik** - Manejo de formularios
- **Yup** - Validación de esquemas
- **Axios** - Cliente HTTP
- **Tailwind CSS** - Framework de estilos

### Backend
- **Node.js** - Entorno de ejecución
- **Express** - Framework web
- **TypeScript** - Superset tipado de JavaScript
- **UUID** - Generación de identificadores únicos
- **CORS** - Middleware para CORS
- **ts-node** - Ejecución de TypeScript en Node.js
- **Nodemon** - Auto-reload en desarrollo

## 📁 Estructura del Proyecto

```
SII project/
├── monolithic.react.js/          # Frontend
│   ├── src/
│   │   ├── components/           # Componentes React
│   │   │   ├── CardForm.tsx      # Formulario de tarjeta
│   │   │   └── CardList.tsx      # Lista de tarjetas
│   │   ├── config/               # Configuración
│   │   │   └── api.config.ts     # Cliente Axios
│   │   ├── services/             # Servicios API
│   │   │   └── card.service.ts   # Servicio de tarjetas
│   │   ├── validations/          # Esquemas de validación
│   │   │   └── cardValidation.ts # Validación con Yup
│   │   ├── App.tsx               # Componente principal
│   │   └── main.tsx              # Entry point
│   └── package.json
│
├── monolithic.node.js/           # Backend
│   ├── src/
│   │   ├── middleware/           # Middlewares
│   │   │   └── errorHandler.middleware.ts
│   │   ├── routes/               # Rutas de la API
│   │   │   └── card.routes.ts
│   │   ├── types/                # Tipos TypeScript
│   │   │   └── card.types.ts
│   │   ├── utils/                # Utilidades
│   │   │   ├── fileSystem.utils.ts
│   │   │   └── validation.utils.ts
│   │   └── index.ts              # Entry point
│   ├── data.json                 # Base de datos (archivo)
│   ├── tsconfig.json             # Configuración TypeScript
│   └── package.json
│
└── README.md                     # Este archivo
```

## 🔌 Endpoints de la API

### Tarjetas

#### Obtener todas las tarjetas
```http
GET /api/cards
```
**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "results": 1,
  "data": [
    {
      "id": "uuid-here",
      "cardNumber": "1234 5678 9012 3456",
      "expiryDate": "12/25",
      "cardHolder": "JUAN PEREZ",
      "cvv": "123"
    }
  ]
}
```

#### Crear tarjeta
```http
POST /api/cards
Content-Type: application/json

{
  "cardNumber": "1234 5678 9012 3456",
  "expiryDate": "12/25",
  "cardHolder": "JUAN PEREZ",
  "cvv": "123"
}
```
**Respuesta exitosa (201):**
```json
{
  "status": "success",
  "data": {
    "id": "uuid-here",
    "cardNumber": "1234 5678 9012 3456",
    "expiryDate": "12/25",
    "cardHolder": "JUAN PEREZ",
    "cvv": "123"
  }
}
```

#### Actualizar tarjeta
```http
PUT /api/cards/:id
Content-Type: application/json

{
  "cardNumber": "1234 5678 9012 3456",
  "expiryDate": "12/26",
  "cardHolder": "JUAN PEREZ ACTUALIZADO",
  "cvv": "456"
}
```
**Respuesta exitosa (200):**
```json
{
  "status": "success",
  "data": {
    "id": "uuid-here",
    "cardNumber": "1234 5678 9012 3456",
    "expiryDate": "12/26",
    "cardHolder": "JUAN PEREZ ACTUALIZADO",
    "cvv": "456"
  }
}
```

## 🔍 Validaciones Implementadas

### Número de Tarjeta
- Requerido
- Formato: `#### #### #### ####`
- Solo números
- Exactamente 16 dígitos

### Fecha de Vencimiento
- Requerida
- Formato: `MM/YY`
- Mes válido: 01-12
- Año válido: 22 hasta (año actual + 5)

### Nombre del Titular
- Requerido
- Solo letras, espacios y tildes
- Mínimo 3 caracteres
- Máximo 20 caracteres

### CVV
- Requerido
- Solo números
- Exactamente 3 dígitos

## 📝 Observaciones

1. **Persistencia de Datos**: Los datos se almacenan en un archivo `data.json` en la raíz del proyecto backend. Este archivo se crea automáticamente si no existe.

2. **Validaciones Duplicadas**: Las validaciones se implementaron tanto en el frontend (UX) como en el backend (seguridad), siguiendo las mejores prácticas de desarrollo web.

3. **Enmascaramiento**: El número de tarjeta se enmascara solo en la visualización de las tarjetas guardadas, no en el formulario de edición.

4. **Puerto del Frontend**: Por defecto Vite usa el puerto 5173. Si necesita cambiarlo, edite el archivo `vite.config.ts`.

5. **Puerto del Backend**: Por defecto el servidor corre en el puerto 3000. Puede cambiarlo configurando la variable de entorno `PORT`.

6. **CORS**: El backend está configurado para aceptar peticiones desde `http://localhost:5173`. Si cambia el puerto del frontend, actualice la configuración de CORS en `monolithic.node.js/src/index.ts`.

## 🐛 Solución de Problemas

### El frontend no conecta con el backend
- Verifique que el backend esté corriendo en el puerto 3000
- Revise la configuración de CORS en `monolithic.node.js/src/index.ts`
- Revise la URL base de la API en `monolithic.react.js/src/config/api.config.ts`

### Error de CORS
- Asegúrese de que el backend esté corriendo antes que el frontend
- Verifique que la URL del frontend coincida con la configuración de CORS

### Las tarjetas no se guardan
- Verifique que el archivo `data.json` tenga permisos de escritura
- Revise la consola del backend para ver errores

## 👨‍💻 Autor

Victor Thomas Ortiz

## 📄 Licencia

Este proyecto fue desarrollado como parte de una evaluación técnica.
