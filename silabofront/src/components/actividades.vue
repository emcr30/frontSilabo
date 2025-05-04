<template>
    <div class="container mx-auto p-6 max-w-4xl">
      <div class="bg-white shadow-md rounded-lg overflow-hidden">
        <!-- SECCIÓN ACTIVIDADES -->
        <div class="p-4">
          <h2 class="text-xl font-bold mb-4">VII. ACTIVIDADES (sean en investigación formativa, RSU, proyección, extensión, otro)</h2>
          <div class="border border-gray-300 p-4 mb-6">
            <div v-for="(actividad, index) in actividades" :key="index">
              <h3 class="font-bold">{{ actividad.titulo }}</h3>
              <p class="mb-2">{{ actividad.descripcion }}</p>
            </div>
          </div>
        </div>
  
        <!-- SECCIÓN CRITERIOS DE EVALUACIÓN -->
        <div class="p-4">
          <h2 class="text-xl font-bold mb-4">VIII. CRITERIOS DE EVALUACIÓN</h2>
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr>
                  <th class="border border-gray-300 bg-gray-200 p-2 text-left">EVALUACIÓN</th>
                  <th class="border border-gray-300 bg-gray-200 p-2 text-left">PESO</th>
                  <th class="border border-gray-300 bg-gray-200 p-2 text-left">FECHA DE CONSOLIDACIÓN</th>
                  <th class="border border-gray-300 bg-gray-200 p-2 text-left">DESCRIPCIÓN DE LA EVALUACIÓN</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="criterio in criteriosEvaluacion" :key="criterio.id">
                  <td class="border border-gray-300 p-2 align-top">{{ criterio.evaluacion }}</td>
                  <td class="border border-gray-300 p-2 align-top">{{ criterio.peso }}</td>
                  <td class="border border-gray-300 p-2 align-top">{{ criterio.fechaConsolidacion }}</td>
                  <td class="border border-gray-300 p-2 align-top">
                    <div v-for="(item, i) in criterio.descripcion" :key="i">
                      {{ item }}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        <!-- SECCIÓN FECHA Y FIRMA -->
        <div class="p-4 mt-4">
          <div class="mb-6">
            <p class="font-bold">Fecha: {{ fechaActual }}</p>
          </div>
  
          <div class="mb-2">
            <p class="font-bold mb-2">Firma del docente</p>
  
            <div 
              v-if="!firmaURL" 
              @click="abrirSelectorArchivo" 
              class="border-2 border-dashed border-gray-300 p-4 text-center cursor-pointer hover:bg-gray-50"
            >
              <p>Haga clic para agregar una imagen de firma</p>
            </div>
  
            <div v-else class="mt-2">
              <img :src="firmaURL" alt="Firma" class="max-h-24" />
              <button @click="eliminarFirma" class="text-red-500 text-sm mt-1">Eliminar firma</button>
            </div>
  
            <input 
              type="file" 
              ref="fileInput" 
              accept="image/*" 
              class="hidden" 
              @change="manejarSeleccionArchivo"
            />
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'App',
    setup() {
      const actividades = ref([]);
      const criteriosEvaluacion = ref([]);
      const fechaActual = ref('');
      const firmaURL = ref(null);
      const fileInput = ref(null);
  
      // Cargar datos del JSON al montar
      onMounted(async () => {
        const response = await fetch('/silabo.json');
        const datos = await response.json();
        actividades.value = datos.actividades;
        criteriosEvaluacion.value = datos.criteriosEvaluacion;
  
        const hoy = new Date();
        const opciones = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        fechaActual.value = hoy.toLocaleDateString('es-ES', opciones);
      });
  
      const abrirSelectorArchivo = () => {
        fileInput.value.click();
      };
  
      const manejarSeleccionArchivo = (event) => {
        const archivo = event.target.files[0];
        if (archivo && archivo.type.match('image.*')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            firmaURL.value = e.target.result;
          };
          reader.readAsDataURL(archivo);
        }
      };
  
      const eliminarFirma = () => {
        firmaURL.value = null;
        fileInput.value.value = '';
      };
  
      return {
        actividades,
        criteriosEvaluacion,
        fechaActual,
        firmaURL,
        fileInput,
        abrirSelectorArchivo,
        manejarSeleccionArchivo,
        eliminarFirma
      };
    }
  };
  </script>
  
  <style>
  body {
    font-family: Arial, sans-serif;
    background-color: #f5f5f5;
    line-height: 1.6;
  }
  
  h2 {
    color: #333;
  }
  
  thead {
    background-color: #e9e9e9;
  }
  </style>