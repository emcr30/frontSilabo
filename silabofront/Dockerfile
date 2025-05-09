# Imagen base oficial de Node.js (ligera)
FROM node:18-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar solo los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el resto del proyecto
COPY . .

# Exponer el puerto que usa Vite o Vue CLI por defecto
EXPOSE 5173

# Comando para correr la app en modo desarrollo
CMD ["npm", "run", "dev", "--", "--host"]

