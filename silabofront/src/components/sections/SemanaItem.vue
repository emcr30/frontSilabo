<template>
    <div class="semana-container">
      <div class="semana-header">
        <h4>
          <span v-if="!editando[`semana-titulo-${index}`]" @click="$emit('iniciar-edicion', `semana-titulo-${index}`)">
            Semana {{ index + 1 }}: {{ semana.titulo || 'Sin título' }}
          </span>
          <input
            v-else
            type="text"
            v-model="semana.titulo"
            @blur="$emit('finalizar-edicion', `semana-titulo-${index}`)"
            @keyup.enter="$emit('finalizar-edicion', `semana-titulo-${index}`)"
            :ref="el => refs[`semana-titulo-${index}`] = el"
            class="full-width"
          />
        </h4>
        <button @click="$emit('borrar-semana', index)" class="btn-delete" title="Eliminar semana">🗑️</button>
      </div>
  
      <div class="semana-content">
        <div class="semana-field">
          <label>Contenidos:</label>
          <div
            v-if="!editando[`semana-contenido-${index}`]"
            @click="$emit('iniciar-edicion', `semana-contenido-${index}`)"
            class="semana-text"
          >
            {{ semana.contenido || 'Hacer clic para editar contenido' }}
          </div>
          <textarea
            v-else
            v-model="semana.contenido"
            @blur="$emit('finalizar-edicion', `semana-contenido-${index}`)"
            :ref="el => refs[`semana-contenido-${index}`] = el"
            class="full-width"
            rows="3"
          ></textarea>
        </div>
  
        <div class="semana-field">
          <label>Actividades:</label>
          <div
            v-if="!editando[`semana-actividades-${index}`]"
            @click="$emit('iniciar-edicion', `semana-actividades-${index}`)"
            class="semana-text"
          >
            {{ semana.actividades || 'Hacer clic para editar actividades' }}
          </div>
          <textarea
            v-else
            v-model="semana.actividades"
            @blur="$emit('finalizar-edicion', `semana-actividades-${index}`)"
            :ref="el => refs[`semana-actividades-${index}`] = el"
            class="full-width"
            rows="3"
          ></textarea>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  defineProps(['semana', 'index', 'editando', 'refs'])
  defineEmits(['iniciar-edicion', 'finalizar-edicion', 'borrar-semana'])
  </script>
  
  <style scoped>
  .semana-container { border: 1px solid #ddd; padding: 1rem; margin-bottom: 1rem; border-radius: 6px; }
  .semana-header { display: flex; justify-content: space-between; align-items: center; }
  .full-width { width: 100%; }
  .semana-field { margin-top: 1rem; }
  .semana-text { cursor: pointer; background: #f9f9f9; padding: 0.5rem; border-radius: 4px; }
  .btn-delete { background: transparent; border: none; cursor: pointer; font-size: 1.2rem; color: red; }
  </style>