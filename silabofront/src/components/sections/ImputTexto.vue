<template>
    <div>
      <template v-if="editando">
        <textarea
          v-if="multiline"
          v-model="editableValor"
          class="editable-input"
          @blur="finalizarEdicion"
          :style="{ width: '100%', minHeight: '60px' }"
        ></textarea>
        <input
          v-else
          v-model="editableValor"
          class="editable-input"
          @blur="finalizarEdicion"
          :style="{ width: inline ? 'auto' : '100%' }"
        />
      </template>
      <span v-else class="editable-text" @click="comenzarEdicion">
        <strong v-if="strong">{{ modelValue }}</strong>
        <template v-else>{{ modelValue }}</template>
      </span>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  
  const props = defineProps({
    modelValue: String,
    multiline: Boolean,
    inline: Boolean,
    strong: Boolean,
  })
  
  const emit = defineEmits(['update:modelValue'])
  
  const editando = ref(false)
  const editableValor = ref(props.modelValue)
  
  watch(() => props.modelValue, (nuevo) => {
    editableValor.value = nuevo
  })
  
  function comenzarEdicion() {
    editando.value = true
  }
  
  function finalizarEdicion() {
    editando.value = false
    emit('update:modelValue', editableValor.value)
  }
  </script>
  
  <style scoped>
  .editable-text {
    cursor: pointer;
    display: inline-block;
    padding: 2px 4px;
  }
  
  .editable-input {
    font-family: inherit;
    font-size: 0.95rem;
    padding: 4px;
    border: 1px solid #aaa;
    background-color: #fff;
    color: #000;
  }
  </style>