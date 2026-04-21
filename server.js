require('dotenv').config();
const Fastify = require('fastify');
const mongoose = require('mongoose');

const fastify = Fastify({ logger: true });

// 1. Conexión a Base de Datos de MongoDB Atlas
// Usamos la URI que guardaste en el archivo .env
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Conexión exitosa a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a BD:', err));

// 2. Registro de rutas
// El prefijo '/api/todos' hace que todas las rutas dentro de ese archivo
// empiecen con esa dirección automáticamente.
fastify.register(require('./src/routes/todo.routes'), { prefix: '/api/todos' });

// 3. Inicio del servidor
const start = async () => {
    try { 
        // Usamos el puerto definido en .env o el 3000 por defecto
        await fastify.listen({ 
            port: process.env.PORT || 3000, 
            host: '0.0.0.0' 
        }); 
        console.log(`🚀 Servidor Nivel 3 corriendo en http://localhost:${process.env.PORT || 3000}`);
    } 
    catch (err) { 
        fastify.log.error(err); 
        process.exit(1); 
    }
};

start();