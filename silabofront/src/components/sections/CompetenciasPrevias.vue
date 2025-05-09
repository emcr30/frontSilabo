<template>
    <div class="seccion">
      <h2 class="titulo-seccion">IV. COMPETENCIAS PREVIAS</h2>
      <ul
        v-if="!editando['competenciasPrevias']"
        @click="$emit('iniciarEdicion', 'competenciasPrevias')"
        class="lista"
      >
        <li v-for="(comp, index) in silabo.competenciasPrevias" :key="index">{{ comp }}</li>
      </ul>
      <div v-else>
        <textarea
          class="textarea"
          v-model="texto"
          @blur="guardarCambios"
          data-input="competenciasPrevias"
        ></textarea>
      </div>
      <button class="btn-borrar" @click.stop="$emit('borrarCampo', 'competenciasPrevias')">
        Borrar Texto
      </button>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  const props = defineProps(['silabo', 'editando'])
  const emit = defineEmits(['iniciarEdicion', 'finalizarEdicion', 'borrarCampo'])
  
  const texto = ref('')
  
  watch(() => props.editando.competenciasPrevias, (nuevo) => {
    if (nuevo) {
      texto.value = props.silabo.competenciasPrevias.join('\n')
    }
  })
  
  const guardarCambios = () => {
    props.silabo.competenciasPrevias = texto.value.split('\n').map(s => s.trim()).filter(Boolean)
    emit('finalizarEdicion', 'competenciasPrevias')
  }
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
  }
  
  .lista {
    padding-left: 1.2rem;
    font-size: 0.95rem;
    cursor: pointer;
  }
  
  .lista li {
    margin-bottom: 4px;
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
  