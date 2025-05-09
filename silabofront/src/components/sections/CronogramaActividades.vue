<template>
    <section>
      <h2>VI. CONTENIDO Y CRONOGRAMA DE ACTIVIDADES</h2>
      <div class="box">
        <div class="section-header">
          <h3>Programación semanal:</h3>
          <button @click="agregarSemana" class="btn-add">+ Agregar semana</button>
        </div>
  
        <SemanaItem
          v-for="(semana, index) in silabo.semanas || []"
          :key="`semana-${index}`"
          :semana="semana"
          :index="index"
          :editando="editando"
          :refs="refs"
          @iniciar-edicion="iniciarEdicion"
          @finalizar-edicion="finalizarEdicion"
          @borrar-semana="borrarSemana"
        />
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, nextTick } from 'vue'
  import SemanaItem from './SemanaItem.vue'
  
  const silabo = ref({
    semanas: []
  })
  
  const editando = ref({})
  const refs = ref({})
  
  // Funciones para las semanas
  const agregarSemana = () => {
    if (!silabo.value.semanas) silabo.value.semanas = []
    silabo.value.semanas.push({
      titulo: `Semana ${silabo.value.semanas.length + 1}`,
      contenido: '',
      actividades: ''
    })
    const index = silabo.value.semanas.length - 1
    nextTick(() => {
      iniciarEdicion(`semana-titulo-${index}`)
    })
  }
  
  const borrarSemana = (index) => {
    silabo.value.semanas.splice(index, 1)
  }
  
  // Funciones de edición
  const iniciarEdicion = (campo) => {
    editando.value[campo] = true
    nextTick(() => {
      const refName = `${campo}Input`
      const ref = refName.replace('Input', '')
      if (refs.value[ref]?.focus) {
        refs.value[ref].focus()
      }
    })
  }
  
  const finalizarEdicion = (campo) => {
    editando.value[campo] = false
  }
  </script>
  
  <style scoped>
  .box { border: 1px solid #ccc; padding: 1rem; border-radius: 6px; margin-top: 1rem; }
  .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
  .btn-add { background: #4caf50; color: white; border: none; padding: 0.5rem; border-radius: 4px; cursor: pointer; }
  </style>