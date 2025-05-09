<template>
    <div class="seccion">
      <h2 class="titulo-seccion">II. COMPETENCIA DEL CURSO</h2>
      <div
        class="recuadro"
        @click="editar('competenciaCurso')"
      >
        <textarea
          v-if="editando['competenciaCurso']"
          v-model="silabo.competenciaCurso"
          @blur="finalizar('competenciaCurso')"
          class="textarea"
          rows="5"
          data-input="competenciaCurso"
        ></textarea>
        <p v-else>{{ silabo.competenciaCurso }}</p>
      </div>
      <button class="btn-borrar" @click.stop="borrar('competenciaCurso')">Borrar Texto</button>
    </div>
  </template>
  
  <script setup>
  defineProps(['silabo', 'editando'])
  const emit = defineEmits(['iniciarEdicion', 'finalizarEdicion', 'borrarCampo'])
  
  function editar(campo) {
    emit('iniciarEdicion', campo)
  }
  function finalizar(campo) {
    emit('finalizarEdicion', campo)
  }
  function borrar(campo) {
    emit('borrarCampo', campo)
  }
  </script>
  
  <style scoped>
  .seccion {
    margin: 2rem 0;
    font-family: 'Segoe UI', sans-serif;
  }
  .titulo-seccion {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.8rem;
  }
  .recuadro {
    border: 1px solid #333;
    padding: 12px;
    background-color: #f9f9f9;
    font-size: 0.95rem;
    line-height: 1.6;
    min-height: 100px;
    cursor: pointer;
  }
  .textarea {
    width: 100%;
    border: none;
    background: #f9f9f9;
    color: #333333;
    font-size: 0.95rem;
    font-family: inherit;
    resize: vertical;
    outline: none;
    padding: 8px;
    box-sizing: border-box;
  }
  .btn-borrar {
    margin-top: 0.5rem;
    padding: 0.4rem 0.8rem;
    background-color: #e74c3c;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.85rem;
  }
  </style>
  