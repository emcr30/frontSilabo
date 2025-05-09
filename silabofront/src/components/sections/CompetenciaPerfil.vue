<template>
    <div class="seccion">
      <h2 class="titulo-seccion">III. COMPETENCIA DE PERFIL DE EGRESO</h2>
      <div v-if="editando['competenciaPerfil']">
        <textarea
          class="textarea"
          v-model="silabo.competenciaPerfil"
          @blur="$emit('finalizarEdicion', 'competenciaPerfil')"
          data-input="competenciaPerfil"
        ></textarea>
      </div>
      <div v-else class="contenido" @click="$emit('iniciarEdicion', 'competenciaPerfil')">
        {{ silabo.competenciaPerfil }}
      </div>
      <button class="btn-borrar" @click.stop="$emit('borrarCampo', 'competenciaPerfil')">
        Borrar Texto
      </button>
    </div>
  </template>
  
  <script setup>
  defineProps(['silabo', 'editando'])
  defineEmits(['iniciarEdicion', 'finalizarEdicion', 'borrarCampo'])
  </script>
  
  <style scoped>
  .seccion {
    border: 1px solid #ccc;
    padding: 1rem;
    margin-bottom: 1.5rem;
    border-radius: 5px;
    background-color: #fdfdfd;
  }
  
  .titulo-seccion {
    font-size: 1.1rem;
    font-weight: bold;
    margin-bottom: 0.8rem;
    text-align: center;
  }
  
  .contenido {
    white-space: pre-wrap;
    font-size: 0.95rem;
    color: #222;
    cursor: pointer;
    line-height: 1.4;
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
  