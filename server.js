require('dotenv').config();
const Fastify = require('fastify');
const mongoose = require('mongoose');

const fastify = Fastify({ logger: true });

// 1. Conexion a Base de Datos de MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conexion exitosa a MongoDB Atlas'))
  .catch(err => console.error('Error al conectar a BD:', err));

// 2. Ruta de bienvenida para el root
fastify.get('/', async (request, reply) => {
  return { 
    mensaje: "Laboratorio: Implementar hasta el punto 3. Fase 2: Despliegue del Backend (Render)",
    estado: "Online",
    estudiante: "Daniel",
    repositorio: "github.com/sammyboy100/todo-backend"
  };
});

// 3. Registro de rutas de la API
fastify.register(require('./src/routes/todo.routes'), { prefix: '/api/todos' });

// 4. Inicio del servidor
const start = async () => {
    try { 
        await fastify.listen({ 
            port: process.env.PORT || 3000, 
            host: '0.0.0.0' 
        }); 
        console.log(`Servidor activo en puerto ${process.env.PORT || 3000}`);
    } 
    catch (err) { 
        fastify.log.error(err); 
        process.exit(1); 
    }
};

start();