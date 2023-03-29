# Products API

## Características

[Repositorio Github](https://github.com/macv9620/1-ExpressJS-API "Ir a Github")

Es una API pública basada en **Express JS** y desplegada en **Render** que:

* Tiene como fuente de datos un array creado a partir del paquete de npm **faker.**
* Para los métodos que aplica, valida propiedades requeridas.
* Posee la entidad "products".
* Valida envío de datos y no permite la creación de nuevas propiedades para la entidad.
* Soporta los métodos **GET, POST, PATCH, PUT y DELETE.**
* Implementa middlewares para el control de errores.

## Cómo ejecutar la aplicación desde el fuente

1. Clonar el repositorio
2. Asegurarse de iniciar npm
3. Ejecutar:

   ```bash
   npm install
   ```
4. Levantar servidor en Dev con Nodemon:

   ```bash
   run npm dev
   ```
5. Levantar servidor con Node

   ```bash
   run npm start
   ```

## Peticiones a API desplegada

El dominio base del servicio es:

[https://productsapi-euyr.onrender.com/API/v1/products](https://productsapi-euyr.onrender.com/API/v1/products)

## Listado de productos

### **GET /**

Retorna el listado total de productos.

#### Solicitud

https://productsapi-euyr.onrender.com/API/v1/products

#### Respuesta

```json
[
    {
        "id": "d2076bb6-04ae-4427-ac94-7be6fc66ac46",
        "name": "Bespoke Metal Hat",
        "price": 75,
        "image": "https://loremflickr.com/640/480"
    },
    {
        "id": "8d105f7d-85b2-4abd-9e25-cd26c7b28046",
        "name": "Small Soft Towels",
        "price": 995,
        "image": "https://loremflickr.com/640/480"
    },
    {
        "id": "7b184b46-4e7c-46ea-ba34-08b73787f8ca",
        "name": "Recycled Granite Table",
        "price": 697,
        "image": "https://loremflickr.com/640/480"
    }
]
```

## Consultar un sólo producto

### **GET / <product_id>**

Retorna un producto en específico de acuerdo con su id.

#### Solicitud

https://productsapi-euyr.onrender.com/API/v1/products/72ce395f-31ea-46a2-aebb-6a75fe468231

#### Respuesta

```json
{
    "status": 200,
    "data": {
        "id": "72ce395f-31ea-46a2-aebb-6a75fe468231",
        "name": "Recycled Soft Ball",
        "price": 576,
        "image": "https://loremflickr.com/640/480"
    }
}
```

#### Respuesta error

```json
{
    "status": 404,
    "message": "Product id:72ce395f-31ea-46a2-kaebb-6a75fe468231 not found"
}
```

## Crear producto

### **POST /**

Crea un producto haciendo validación de campos requeridos.

#### Solicitud

https://productsapi-euyr.onrender.com/API/v1/products/

```json
{
    "name": "Mouse",
    "price": 50,
    "image": "https://loremflickr.com/640/480"
}
```

#### Respuesta

```json
{
    "status": 201,
    "message": "Product created",
    "data": {
        "id": "a2fb652e-9c91-431d-aa8b-e5620eb09efb",
        "name": "Mouse",
        "price": 50,
        "image": "https://loremflickr.com/640/480"
    }
}
```

#### Respuesta error

```json
{
    "status": 400,
    "message": "name is not defined o has a invalid value"
}
```

Para los casos en que son enviadas propiedades no contempladas por la API se omitirán sus valores:

#### Solicitud

https://productsapi-euyr.onrender.com/API/v1/products/

```json
{
    "price": 50,
    "image": "https://loremflickr.com/640/480",
    "name": "Mouse",
    "newProperty": "New Property"
}
```

#### Respuesta

```json
{
    "status": 201,
    "message": "Product created",
    "data": {
        "id": "c348471e-90fb-45bc-bf73-17ba38448c57",
        "name": "Mouse",
        "price": 50,
        "image": "https://loremflickr.com/640/480"
    }
}
```

## Modificar parcialmente un producto

### **PATCH / <product_id>**

Modifica la o las propiedades indicadas.

#### Solicitud

https://productsapi-euyr.onrender.com/API/v1/products/6d779901-d2bc-46d8-8611-62e55d1c4461

```json
{
    "name": "PadMouse"
}
```

#### Respuesta

```json
{
    "status": 200,
    "message": "Product id:6d779901-d2bc-46d8-8611-62e55d1c4461 updated",
    "data": {
        "name": "PadMouse"
    }
}
```

#### Respuesta error

```json
{
    "status": 400,
    "message": "Invalid name property value"
}
```

```json
{
    "status": 400,
    "message": "Properties to update not sent"
}
```

```json
{
    "status": 404,
    "message": "Product id:6d779901-d2Xbc-46d8-8611-62e55d1c4461 not found"
}
```

Para los casos en que son enviadas propiedades no contempladas por la API se omitirán sus valores:

#### Solicitud

https://productsapi-euyr.onrender.com/API/v1/products/6d779901-d2bc-46d8-8611-62e55d1c4461

```json
{
    "price": 50,
    "newProperty": "New Property"
}
```

#### Respuesta

```json
{
    "status": 200,
    "message": "Product id:6d779901-d2bc-46d8-8611-62e55d1c4461 updated",
    "data": {
        "price": 50
    }
}
```


## Modificar totalmente un producto

### **PUT / <product_id>**

Modifica todas las propiedades de un producto (deben ser enviados todos los parámetros)

#### Solicitud

https://productsapi-euyr.onrender.com/API/v1/products/6d779901-d2bc-46d8-8611-62e55d1c4461

```json
{
    "name": "Phone",
    "price": 600,
    "image": "URL"
}
```

#### Respuesta

```json
{
    "status": 200,
    "message": "Product id:e28852a6-6ea9-4878-a179-9b3325b37f93 updated",
    "data": {
        "id": "e28852a6-6ea9-4878-a179-9b3325b37f93",
        "name": "Phone",
        "price": 600,
        "image": "URL"
    }
}
```

#### Respuesta error

```json
{
    "status": 404,
    "message": "Product id:Xe28852a6-6ea9-4878-a179-9b3325b37f93 not found"
}
```

```json
{
    "status": 400,
    "message": "name property invalid"
}
```

Para los casos en que son enviadas propiedades no contempladas por la API se omitirán sus valores:

#### Solicitud

https://productsapi-euyr.onrender.com/API/v1/products/6d779901-d2bc-46d8-8611-62e55d1c4461

```json
{
    "name": "PadMouse",
    "price": 600,
    "image": "URL",
    "invalidProperty": "dddd"
}
```

#### Respuesta

```json
{
    "status": 200,
    "message": "Product id:e28852a6-6ea9-4878-a179-9b3325b37f93 updated",
    "data": {
        "id": "e28852a6-6ea9-4878-a179-9b3325b37f93",
        "name": "PadMouse",
        "price": 600,
        "image": "URL"
    }
}
```


## Eliminar producto

### **DELETE / <product_id>**

Elimina un producto en específico de acuerdo con su id.

#### Solicitud

https://productsapi-euyr.onrender.com/api/v1/products/6d779901-d2bc-46d8-8611-62e55d1c4461

#### Respuesta

```json
{
    "status": 200,
    "message": "Product id:6d779901-d2bc-46d8-8611-62e55d1c4461 deleted",
    "data": {
        "id": "6d779901-d2bc-46d8-8611-62e55d1c4461"
    }
}
```

#### Respuesta error

```json
{
    "status": 404,
    "message": "Product id:X6d779901-d2bc-46d8-8611-62e55d1c4461 not found"
}
```
