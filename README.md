# API CLINICA

La API es un proyecto desarrollado en Node.js con Express y TypeScript, diseñado como un conjunto de endpoints para realizar operaciones CRUD (crear, leer, actualizar y eliminar) relacionadas con pacientes, doctores y citas. Además, incluye funcionalidades como la creación de usuarios y autenticación, que valida el rol del usuario para acceder a los diferentes endpoints.

Este proyecto fue creado específicamente para el curso de la Universidad Distrital y se encuentra bajo la iniciativa "Todos A la U". La API proporciona una interfaz eficiente y segura para interactuar con los datos relacionados con pacientes, doctores y citas, permitiendo a los usuarios realizar operaciones básicas de gestión.

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
