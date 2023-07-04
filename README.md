# API CLINICA

La API es un proyecto desarrollado en Node.js con Express y TypeScript, diseñado como un conjunto de endpoints para realizar operaciones CRUD (crear, leer, actualizar y eliminar) relacionadas con pacientes, doctores y citas. Además, incluye funcionalidades como la creación de usuarios y autenticación, que valida el rol del usuario para acceder a los diferentes endpoints.

Para almacenar y gestionar los datos de manera eficiente, se utiliza MongoDB como base de datos no relacional. La API se conecta a la base de datos utilizando Mongoose, una biblioteca de modelado de objetos de MongoDB para Node.js.

Este proyecto fue creado específicamente para el curso de la Universidad Distrital y se encuentra bajo la iniciativa "Todos A la U". La API proporciona una interfaz eficiente y segura para interactuar con los datos relacionados con pacientes, doctores y citas, permitiendo a los usuarios realizar operaciones básicas de gestión.

## Tecnologías empleadas

El proyecto ha sido desarrollado utilizando las siguientes tecnologías:

- Lenguaje: TypeScript
- Plataforma: Node.js
- Framework: Express

### Bibliotecas utilizadas

A lo largo del proyecto, se han utilizado varias bibliotecas para mejorar la funcionalidad y la eficiencia del código. A continuación, se detallan las bibliotecas utilizadas y una breve descripción de cada una:

- **@types/express-validator:** Proporciona definiciones de tipos para el paquete express-validator, lo que facilita la validación de datos en Express.

- **bcryptjs:** Una biblioteca que proporciona funciones para el cifrado y la comparación de contraseñas utilizando algoritmos de hash seguros. Se utiliza proteger contraseñas de usuario.

- **cors:** Un middleware de Express que permite habilitar la comunicación entre diferentes dominios o servidores. Se utiliza para configurar políticas de control de acceso HTTP y gestionar las solicitudes de origen cruzado (CORS).

- **dotenv:** Permite cargar variables de entorno desde un archivo .env. Se utiliza para separar la configuración sensible (como claves de API o información de conexión a bases de datos) del código fuente y mantenerlo seguro.

- **express:** Un framework web rápido, minimalista y flexible para Node.js. Se utiliza para crear el servidor web y definir las rutas y los controladores para los endpoints de la API.

- **express-validator:** Un middleware para Express que proporciona una forma sencilla de validar y sanitizar datos de entrada en las solicitudes HTTP.

- **jsonwebtoken:** Una implementación de JSON Web Tokens (JWT) para Node.js. Se utiliza para la generación y verificación de tokens de autenticación, lo que permite una autenticación segura y basada en tokens.

- **mongoose:** Una biblioteca de modelado de objetos de MongoDB para Node.js. Proporciona una interfaz sencilla y basada en esquemas para interactuar con la base de datos MongoDB.

## Desarrollador

- [David Puerto Guerrero](https://github.com/Dsp5502)

## Despliegue

[Api-Clinica](https://api-clinica-obru.onrender.com)

## Instalación

### Requisitos previos:

- Tener instalado Node.js en tu máquina.

### Pasos:

1. **Clonar el repositorio:** Abre tu terminal y ejecuta el siguiente comando para clonar el repositorio desde el servicio de alojamiento:

   ```bash
   git clone git@github.com:Dsp5502/APIClinica.git
   ```

2. **Instalar dependencias**: Una vez dentro del directorio del proyecto, instala las dependencias necesarias ejecutando el siguiente comando:

```bash
  npm install
```

3. **Configurar variables de entorno**:

Para ejecutar este proyecto, deberá añadir las siguientes variables de entorno a su archivo .env

`PORT`

`DB_URI`

`JWT_SECRET`

4. **Ejecutar la aplicación**: Una vez que todas las dependencias estén instaladas, puedes ejecutar la aplicación con el siguiente comando:

```bash
 npm run dev
```

5. **Acceder a la aplicación:** Abre tu navegador web y visita la dirección http://localhost:3002. Si todo ha sido configurado correctamente, deberías poder ver la aplicación en funcionamiento.


# Capturas de Pantalla

## Register User

<img width="955" alt="image" src="https://github.com/Dsp5502/APIClinica/assets/90290626/b0597297-e917-47be-95aa-852f13462149">

## Login User
<img width="957" alt="image" src="https://github.com/Dsp5502/APIClinica/assets/90290626/d1609643-ad0b-4833-bb56-27028ad8d535">

## Crear Paciente
<img width="957" alt="image" src="https://github.com/Dsp5502/APIClinica/assets/90290626/54423c63-da10-47f5-82ec-62e4c427a544">

## Editar Doctor
<img width="960" alt="image" src="https://github.com/Dsp5502/APIClinica/assets/90290626/614d9b06-3c7e-49fb-ab4b-e64f8815fd89">

## Obtener Especialidades
<img width="959" alt="image" src="https://github.com/Dsp5502/APIClinica/assets/90290626/1ece5560-b44c-4466-a058-6ddb4c25dde1">

## Obetner Citas medicas paginado
<img width="959" alt="image" src="https://github.com/Dsp5502/APIClinica/assets/90290626/4cbdbda2-14e7-4cb3-8c82-402116398fb8">

## Buscar por palabra
<img width="957" alt="image" src="https://github.com/Dsp5502/APIClinica/assets/90290626/a6b6e381-dd24-4925-8e36-4e93a6064462">





