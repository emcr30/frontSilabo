<template>
  <div class="silabo-container" v-if="silabo">
    <!-- Sección VII: Actividades -->
    <div class="section" v-if="silabo.actividades && silabo.actividades.length">
      <h2 class="section-title">
        <span class="section-number">VII.</span> ACTIVIDADES 
        <span class="section-subtitle">en investigación formativa, RSU, proyección, extensión, etc.</span>
      </h2>
      <div class="actividades-box">
        <transition-group name="fade-list" tag="div" class="actividades-grid">
          <div v-for="(actividad, index) in silabo.actividades" :key="index" class="actividad-card">
            <div class="actividad-header">
              <i class="fa fa-tasks actividad-icon"></i>
              <h3>{{ actividad.titulo }}</h3>
            </div>
            <div class="actividad-content">
              <p>{{ actividad.descripcion }}</p>
            </div>
          </div>
        </transition-group>
      </div>
    </div>

    <!-- Sección VIII: Criterios de Evaluación -->
    <div class="section evaluacion-section" v-if="silabo.criteriosEvaluacion && silabo.criteriosEvaluacion.length">
      <h2 class="section-title">
        <span class="section-number">VIII.</span> CRITERIOS DE EVALUACIÓN
      </h2>
      <div class="evaluacion-table">
        <table>
          <thead>
            <tr>
              <th>EVALUACIÓN</th>
              <th>PESO</th>
              <th>FECHA DE CONSOLIDACIÓN</th>
              <th>DESCRIPCIÓN DE LA EVALUACIÓN</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="criterio in silabo.criteriosEvaluacion" :key="criterio.id" class="criterio-row">
              <td>{{ criterio.evaluacion }}</td>
              <td class="peso-cell">
                <div class="peso-badge">{{ criterio.peso || '—' }}</div>
              </td>
              <td>{{ criterio.fechaConsolidacion }}</td>
              <td>
                <ul class="descripcion-list">
                  <li v-for="(desc, i) in criterio.descripcion" :key="i">{{ desc }}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Sección de Firma -->
    <div class="firma-section">
      <div class="fecha-container">
        <i class="fa fa-calendar fecha-icon"></i>
        <p class="fecha-text">{{ fechaActual }}</p>
      </div>
      
      <div class="firma">
        <h3 class="firma-title">Firma del docente</h3>
        
        <div class="firma-container" :class="{ 'tiene-firma': firmaUrl }">
          <transition name="fade">
            <div v-if="firmaUrl" class="firma-preview">
              <img :src="firmaUrl" alt="Firma del docente" class="firma-img" />
              <div class="firma-overlay">
                <button @click="abrirSelectorArchivo" class="btn btn-change" title="Cambiar firma">
                  <i class="fa fa-pencil"></i>
                </button>
                <button @click="eliminarFirma" class="btn btn-delete" title="Eliminar firma">
                  <i class="fa fa-trash"></i>
                </button>
              </div>
            </div>
            
            <div v-else class="firma-upload" @click="abrirSelectorArchivo">
              <div class="upload-icon-container">
                <i class="fa fa-plus-circle upload-icon"></i>
              </div>
              <span class="upload-text">Agregar firma</span>
              <span class="upload-hint">Haz clic aquí o arrastra una imagen</span>
            </div>
          </transition>
          
          <input
            type="file"
            ref="firmaInput"
            @change="cargarFirma"
            accept="image/*"
            style="display: none"
          />
        </div>
        
        <div v-if="firmaUrl" class="firma-nombre">
          <input 
            type="text" 
            v-model="nombreDocente" 
            placeholder="Nombre del docente"
            class="nombre-input"
          />
        </div>
      </div>
    </div>
  </div>

  <div v-else class="cargando">
    <div class="loader"></div>
    <p>Cargando datos del sílabo...</p>
  </div>
</template>

<script>
export default {
  name: 'ActividadesSilabo',
  data() {
    return {
      silabo: null,
      firmaUrl: null,
      nombreDocente: '',
      fechaActual: this.obtenerFechaActual(),
      isDragging: false
    };
  },
  created() {
    this.cargarSilabo();
    this.cargarFontAwesome();
  },
  mounted() {
    this.configurarDropZone();
  },
  methods: {
    cargarSilabo() {
      // Simulamos un pequeño retraso para mostrar el loader
      setTimeout(() => {
        fetch('/silabo.json')
          .then(response => {
            if (!response.ok) throw new Error('Error al cargar el archivo JSON');
            return response.json();
          })
          .then(data => {
            console.log('Silabo cargado:', data);
            this.silabo = data;
          })
          .catch(error => {
            console.error('Error al cargar el silabo:', error);
            this.$notify({
              type: 'error',
              title: 'Error',
              text: 'No se pudo cargar el sílabo. Por favor, intente nuevamente.'
            });
          });
      }, 800);
    },
    obtenerFechaActual() {
      const hoy = new Date();
      const dias = ['domingo', 'lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
      const meses = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
      ];
      return `${dias[hoy.getDay()]}, ${hoy.getDate()} de ${meses[hoy.getMonth()]} de ${hoy.getFullYear()}`;
    },
    abrirSelectorArchivo() {
      this.$refs.firmaInput.click();
    },
    cargarFirma(event) {
      const file = event.target.files[0];
      if (file) {
        this.procesarArchivo(file);
      }
    },
    procesarArchivo(file) {
      if (!file.type.match('image.*')) {
        this.$notify({
          type: 'error',
          title: 'Error',
          text: 'Por favor seleccione una imagen válida'
        });
        return;
      }
      
      if (file.size > 5000000) { // 5MB max
        this.$notify({
          type: 'error',
          title: 'Archivo muy grande',
          text: 'La imagen no debe superar los 5MB'
        });
        return;
      }
      
      this.firmaUrl = URL.createObjectURL(file);
      this.$notify({
        type: 'success',
        title: 'Firma agregada',
        text: 'La firma ha sido cargada correctamente'
      });
    },
    eliminarFirma() {
      if (this.firmaUrl) {
        URL.revokeObjectURL(this.firmaUrl);
        this.firmaUrl = null;
        this.nombreDocente = '';
        this.$notify({
          type: 'info',
          title: 'Firma eliminada',
          text: 'La firma ha sido eliminada correctamente'
        });
      }
    },
    configurarDropZone() {
      const container = this.$el;
      
      container.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!this.isDragging) {
          this.isDragging = true;
          container.querySelector('.firma-container')?.classList.add('dragging');
        }
      });
      
      container.addEventListener('dragleave', (e) => {
        e.preventDefault();
        if (this.isDragging && !container.contains(e.relatedTarget)) {
          this.isDragging = false;
          container.querySelector('.firma-container')?.classList.remove('dragging');
        }
      });
      
      container.addEventListener('drop', (e) => {
        e.preventDefault();
        this.isDragging = false;
        container.querySelector('.firma-container')?.classList.remove('dragging');
        
        if (e.dataTransfer.files.length) {
          this.procesarArchivo(e.dataTransfer.files[0]);
        }
      });
    },
    cargarFontAwesome() {
      // Cargar Font Awesome si no está ya cargado
      if (!document.getElementById('fontawesome-css')) {
        const link = document.createElement('link');
        link.id = 'fontawesome-css';
        link.rel = 'stylesheet';
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css';
        document.head.appendChild(link);
      }
    }
  }
};
</script>

<style scoped>
/* Estilos Generales */
.silabo-container {
  font-family: 'Poppins', 'Segoe UI', Arial, sans-serif;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
  color: #333;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.08);
}

/* Secciones */
.section {
  margin-bottom: 40px;
  animation: fadeIn 0.8s ease;
}

.section-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #3498db;
  color: #2c3e50;
  display: flex;
  align-items: center;
}

.section-number {
  background-color: #3498db;
  color: white;
  padding: 2px 10px;
  border-radius: 20px;
  margin-right: 10px;
  font-size: 18px;
}

.section-subtitle {
  font-size: 14px;
  font-weight: normal;
  color: #7f8c8d;
  margin-left: 10px;
}

/* Sección de Actividades */
.actividades-box {
  border: 1px solid #e0e0e0;
  padding: 20px;
  margin-bottom: 30px;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.actividades-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.actividad-card {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.actividad-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
}

.actividad-header {
  background-color: #3498db;
  color: white;
  padding: 15px;
  display: flex;
  align-items: center;
}

.actividad-icon {
  margin-right: 10px;
  font-size: 18px;
}

.actividad-header h3 {
  font-weight: 600;
  margin: 0;
  font-size: 16px;
}

.actividad-content {
  padding: 15px;
}

/* Tabla de Evaluación */
.evaluacion-section {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.evaluacion-table {
  overflow-x: auto;
  margin-top: 15px;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border: none;
}

th, td {
  padding: 12px 15px;
  text-align: left;
  vertical-align: top;
  border: none;
  border-bottom: 1px solid #e0e0e0;
}

th {
  background-color: #3498db;
  color: white;
  font-weight: 600;
  position: sticky;
  top: 0;
}

th:first-child {
  border-top-left-radius: 8px;
}

th:last-child {
  border-top-right-radius: 8px;
}

.criterio-row:hover {
  background-color: #f1f9ff;
}

.peso-cell {
  text-align: center;
}

.peso-badge {
  background-color: #e74c3c;
  color: white;
  padding: 3px 10px;
  border-radius: 20px;
  display: inline-block;
  font-weight: bold;
}

.descripcion-list {
  margin: 0;
  padding-left: 18px;
}

.descripcion-list li {
  margin-bottom: 5px;
}

.descripcion-list li:last-child {
  margin-bottom: 0;
}

/* Sección de Firma */
.firma-section {
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.fecha-container {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  background-color: #f8f9fa;
  padding: 10px 20px;
  border-radius: 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.fecha-icon {
  color: #3498db;
  margin-right: 10px;
  font-size: 18px;
}

.fecha-text {
  margin: 0;
  font-size: 16px;
  color: #2c3e50;
}

.firma {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 400px;
}

.firma-title {
  font-size: 18px;
  color: #2c3e50;
  margin-bottom: 15px;
  text-align: center;
}

.firma-container {
  width: 300px;
  height: 150px;
  border: 2px dashed #bdc3c7;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
  background-color: #f9f9f9;
}

.firma-container:hover {
  border-color: #3498db;
}

.firma-container.dragging {
  border-color: #3498db;
  background-color: #ecf0f1;
  transform: scale(1.02);
}

.firma-container.tiene-firma {
  border: none;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  background-color: white;
}

.firma-preview {
  position: relative;
  width: 100%;
  height: 100%;
}

.firma-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.firma-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.firma-preview:hover .firma-overlay {
  opacity: 1;
}

.btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s ease;
  color: white;
}

.btn:hover {
  transform: scale(1.1);
}

.btn-change {
  background-color: #3498db;
}

.btn-delete {
  background-color: #e74c3c;
}

.firma-upload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  cursor: pointer;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

.firma-upload:hover {
  background-color: #ecf0f1;
}

.upload-icon-container {
  margin-bottom: 10px;
}

.upload-icon {
  font-size: 40px;
  color: #3498db;
}

.upload-text {
  font-weight: bold;
  color: #2c3e50;
  margin-bottom: 5px;
}

.upload-hint {
  font-size: 12px;
  color: #7f8c8d;
}

.firma-nombre {
  margin-top: 15px;
  width: 100%;
}

.nombre-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 14px;
  text-align: center;
  outline: none;
  transition: border-color 0.3s ease;
}

.nombre-input:focus {
  border-color: #3498db;
}

/* Pantalla de carga */
.cargando {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.loader {
  border: 5px solid #f3f3f3;
  border-top: 5px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;
}

/* Animaciones */
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.fade-list-enter-active, .fade-list-leave-active {
  transition: all 0.5s;
}

.fade-list-enter-from, .fade-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

/* Responsive */
@media (max-width: 768px) {
  .silabo-container {
    padding: 15px;
  }
  
  .actividades-grid {
    grid-template-columns: 1fr;
  }
  
  .section-title {
    font-size: 18px;
    flex-wrap: wrap;
  }
  
  .firma-container {
    width: 250px;
  }
}
</style>