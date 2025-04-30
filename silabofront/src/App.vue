<template>
  <div class="container py-5">
    <div class="text-center mb-4">
      <img src="/logo_lasalle.png" alt="Logo La Salle" height="200" />
    </div>
    <h1 class="text-center mb-4 text-primary">Formulario del Sílabo</h1>

    <!-- DATOS GENERALES -->
    <section class="mb-4">
      <h4 class="text-secondary">I. DATOS GENERALES</h4>
      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Facultad</label>
          <input v-model="silabo.facultad" class="form-control" required>
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Carrera Profesional</label>
          <input v-model="silabo.carrera" class="form-control" required>
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Semestre</label>
          <input v-model="silabo.semestre" class="form-control">
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Nro. de Créditos</label>
          <input v-model="silabo.creditos" class="form-control">
        </div>
        <div class="col-md-4 mb-3">
          <label class="form-label">Periodo Lectivo</label>
          <input v-model="silabo.periodo" class="form-control">
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Nombre del Docente</label>
          <input v-model="silabo.docente" class="form-control">
        </div>
        <div class="col-md-6 mb-3">
          <label class="form-label">Correo del Docente</label>
          <input v-model="silabo.correo" class="form-control">
        </div>
      </div>
    </section>

    <!-- COMPETENCIAS -->
    <section class="mb-4">
      <h4 class="text-secondary">II. COMPETENCIA DEL CURSO</h4>
      <textarea v-model="silabo.competenciaCurso" class="form-control" rows="3"></textarea>
    </section>

    <section class="mb-4">
      <h4 class="text-secondary">III. COMPETENCIA DEL PERFIL DE EGRESO AL QUE CONTRIBUYE</h4>
      <textarea v-model="silabo.perfilEgreso" class="form-control" rows="3"></textarea>
    </section>

    <section class="mb-4">
      <h4 class="text-secondary">IV. COMPETENCIAS PREVIAS NECESARIAS</h4>
      <textarea v-model="silabo.competenciasPrevias" class="form-control" rows="4"></textarea>
    </section>

    <!-- SUMILLA -->
    <section class="mb-4">
      <h4 class="text-secondary">V. SUMILLA</h4>
      <textarea v-model="silabo.sumilla" class="form-control" rows="3"></textarea>
    </section>

    <!-- UNIDADES DE APRENDIZAJE -->
    <section class="mb-4">
      <h4 class="text-secondary">VI. UNIDADES DE APRENDIZAJE</h4>
      <div v-for="(unidad, index) in silabo.unidades" :key="index" class="mb-3 border p-3 rounded bg-light">
        <h6>Unidad {{ index + 1 }}</h6>
        <input v-model="unidad.denominacion" class="form-control mb-2" placeholder="Denominación de la unidad" />
        <input v-model="unidad.intervalo" class="form-control mb-2" placeholder="Intervalo de fechas" />
        <textarea v-model="unidad.capacidad" class="form-control mb-2" placeholder="Capacidad del estudiante" />
        <textarea v-model="unidad.contenidos" class="form-control mb-2" placeholder="Contenidos específicos por semana" rows="3" />
        <button class="btn btn-danger btn-sm" @click.prevent="eliminarUnidad(index)">Eliminar unidad</button>
      </div>
      <button class="btn btn-outline-primary btn-sm" @click.prevent="agregarUnidad">+ Añadir unidad</button>
    </section>

    <!-- ACTIVIDADES -->
    <section class="mb-4">
      <h4 class="text-secondary">VII. ACTIVIDADES</h4>
      <textarea v-model="silabo.actividades" class="form-control" rows="4" placeholder="Actividades como investigación formativa, RSU, etc."></textarea>
    </section>

    <!-- CRITERIOS DE EVALUACIÓN -->
    <section class="mb-4">
      <h4 class="text-secondary">VIII. CRITERIOS DE EVALUACIÓN</h4>
      <div v-for="(criterio, index) in silabo.evaluacion" :key="index" class="mb-3 border p-3 rounded bg-light">
        <input v-model="criterio.nombre" class="form-control mb-2" placeholder="Ej: Evidencia 1, Examen Parcial..." />
        <input v-model="criterio.peso" class="form-control mb-2" placeholder="Peso (%)" />
        <input v-model="criterio.fecha" class="form-control mb-2" placeholder="Fecha de consolidación" />
        <textarea v-model="criterio.descripcion" class="form-control mb-2" rows="2" placeholder="Descripción de la evaluación" />
        <button class="btn btn-danger btn-sm" @click.prevent="eliminarCriterio(index)">Eliminar criterio</button>
      </div>
      <button class="btn btn-outline-primary btn-sm" @click.prevent="agregarCriterio">+ Añadir criterio</button>
    </section>

    <!-- FECHA Y FIRMA -->
    <section class="mb-4">
      <h4 class="text-secondary">Fecha y Firma</h4>
      <input v-model="silabo.fecha" class="form-control mb-2" placeholder="Ej: lunes, 10 de marzo de 2025" />
      <input v-model="silabo.firma" class="form-control" placeholder="Nombre del docente o firma" />
    </section>

    <!-- BOTÓN DE GUARDAR -->
    <button class="btn btn-success mt-3" @click="guardarSilabo">Guardar Sílabo</button>

    <div v-if="mensaje" class="alert alert-success mt-3">{{ mensaje }}</div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { supabase } from './supabase'

const mensaje = ref('')
const silabo = reactive({
  facultad: '',
  carrera: '',
  semestre: '',
  creditos: '',
  periodo: '',
  docente: '',
  correo: '',
  competenciaCurso: '',
  perfilEgreso: '',
  competenciasPrevias: '',
  sumilla: '',
  unidades: [],
  actividades: '',
  evaluacion: [],
  fecha: '',
  firma: ''
})

function agregarUnidad() {
  silabo.unidades.push({
    denominacion: '',
    intervalo: '',
    capacidad: '',
    contenidos: ''
  })
}

function eliminarUnidad(index) {
  silabo.unidades.splice(index, 1)
}

function agregarCriterio() {
  silabo.evaluacion.push({
    nombre: '',
    peso: '',
    fecha: '',
    descripcion: ''
  })
}

function eliminarCriterio(index) {
  silabo.evaluacion.splice(index, 1)
}

async function guardarSilabo() {
  const { error } = await supabase.from('silabos').insert([silabo])
  if (error) {
    console.error(error)
    mensaje.value = 'Error al guardar. Revisa la consola.'
  } else {
    mensaje.value = '¡Sílabo guardado exitosamente!'
    setTimeout(() => mensaje.value = '', 3000)
  }
}
</script>

<style>
body {
  background-color: #f1f3f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.container {
  max-width: 900px;
}

section {
  background-color: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
  margin-bottom: 25px;
  border-left: 6px solid #0d6efd;
}

h1 {
  font-weight: 700;
}

h4 {
  margin-bottom: 15px;
  color: #343a40;
}

textarea,
input {
  border-radius: 8px !important;
}

button {
  border-radius: 6px !important;
}
</style>

