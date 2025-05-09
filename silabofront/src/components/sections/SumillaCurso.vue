<template>
    <div class="seccion">
      <h2 class="titulo-seccion">V. SUMILLA DEL CURSO</h2>
      <div class="recuadro" @click="editar('sumilla')">
        <textarea
          v-if="editando['sumilla']"
          v-model="silabo.sumilla"
          @blur="finalizar('sumilla')"
          class="textarea"
          rows="5"
          data-input="sumilla"
        ></textarea>
        <p v-else>{{ silabo.sumilla }}</p>
      </div>
      <button class="boton-borrar" @click.stop="borrarTexto">Borrar Texto</button>
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
  
  function borrarTexto() {
    emit('borrarCampo', 'sumilla')
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
    background-color: #fdfdfd;
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
  .boton-borrar {
    margin-top: 0.5rem;
    padding: 6px 12px;
    font-size: 0.85rem;
    background-color: #e74c3c;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 4px;
  }
  </style>
  