<template>
    <div class="container">
      <div class="text-center mb-4">
        <img src="/logo_lasalle.png" alt="Logo La Salle" height="200" />
      </div>
      <h1>SÍLABO DEL CURSO DE INGENIERÍA WEB</h1>
  
      <div class="seccion-box">
        <DatosGenerales
          :silabo="silabo"
          :editando="editando"
          @iniciarEdicion="iniciarEdicion"
          @finalizarEdicion="finalizarEdicion"
          @borrarCampo="borrarCampo"
        />
      </div>
  
      <div class="seccion-box">
        <CompetenciaCurso
          :silabo="silabo"
          :editando="editando"
          @iniciarEdicion="iniciarEdicion"
          @finalizarEdicion="finalizarEdicion"
          @borrarCampo="borrarCampo"
        />
      </div>
  
      <div class="seccion-box">
        <CompetenciaPerfil
          :silabo="silabo"
          :editando="editando"
          @iniciarEdicion="iniciarEdicion"
          @finalizarEdicion="finalizarEdicion"
          @borrarCampo="borrarCampo"
        />
      </div>
  
      <div class="seccion-box">
        <CompetenciasPrevias
          :silabo="silabo"
          :editando="editando"
          @iniciarEdicion="iniciarEdicion"
          @finalizarEdicion="finalizarEdicion"
          @borrarCampo="borrarCampo"
        />
      </div>
  
      <div class="seccion-box">
        <SumillaCurso
          :silabo="silabo"
          :editando="editando"
          @iniciarEdicion="iniciarEdicion"
          @finalizarEdicion="finalizarEdicion"
          @borrarCampo="borrarCampo"
        />
      </div>
  
      <div class="seccion-box">
        <CronogramaActividades
          :silabo="silabo"
          :editando="editando"
          @iniciarEdicion="iniciarEdicion"
          @finalizarEdicion="finalizarEdicion"
        />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, nextTick, onMounted } from 'vue'
  import DatosGenerales from './sections/DatosGenerales.vue'
  import CompetenciaCurso from './sections/CompetenciaCurso.vue'
  import CompetenciaPerfil from './sections/CompetenciaPerfil.vue'
  import CompetenciasPrevias from './sections/CompetenciasPrevias.vue'
  import SumillaCurso from './sections/SumillaCurso.vue'
  import CronogramaActividades from './sections/CronogramaActividades.vue'
  
  import { silaboEjemplo } from '/src/data/SilaboExample.js'
  
  const silabo = ref({
    informacionCurso: {
      facultad: '', semestre: '', carreraProfesional: '',
      creditos: '', areaFormacion: '', tipoCurso: '',
      periodoLectivo: '', horasTeoria: '', horasPractica: '',
      codigoCurso: '', prerequisito: '', docente: '', correo: ''
    },
    competenciaCurso: '',
    competenciaPerfil: '',
    competenciasPrevias: [],
    sumilla: '',
    semanas: []
  })
  
  const editando = ref({})
  
  const iniciarEdicion = (campo) => {
    editando.value[campo] = true
    nextTick(() => {
      const input = document.querySelector(`[data-input="${campo}"]`)
      if (input) input.focus()
    })
  }
  
  const finalizarEdicion = (campo) => {
    editando.value[campo] = false
  }
  
  const borrarCampo = (campo) => {
    if (campo === 'competenciasPrevias') {
      silabo.value[campo] = []
    } else {
      silabo.value[campo] = ''
    }
  }
  
  onMounted(() => {
    silabo.value = silaboEjemplo
  
    fetch('/silabo.json')
      .then(res => {
        if (!res.ok) throw new Error('No se pudo cargar silabo.json')
        return res.json()
      })
      .then(data => {
        silabo.value = data
  
        if (!silabo.value.semanas) silabo.value.semanas = []
        if (!silabo.value.competenciasPrevias) silabo.value.competenciasPrevias = []
        if (!silabo.value.informacionCurso) silabo.value.informacionCurso = {}
      })
      .catch(err => {
        console.info('Usando datos de ejemplo:', err.message)
      })
  })
  </script>
  
  <style scoped>
  .container {
    max-width: 1000px;
    margin: 2rem auto;
    padding: 2rem;
    font-family: 'Segoe UI', sans-serif;
    background-color: #fdfdfd;
    border-radius: 10px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
  }
  
  h1 {
    text-align: center;
    color: #003366;
    margin-bottom: 2rem;
    font-size: 2rem;
    font-weight: bold;
  }
  
  .seccion-box {
    background-color: #ffffff;
    border: 1px solid #dcdcdc;
    border-left: 6px solid #003366;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
  }
  </style>
  