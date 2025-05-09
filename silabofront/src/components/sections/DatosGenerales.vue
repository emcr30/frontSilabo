<template>
    <div class="datos-generales">
      <h2 class="titulo-seccion">I. DATOS GENERALES</h2>
      <table class="tabla-datos">
        <tbody>
          <tr>
            <th>FACULTAD</th>
            <td>
              <span v-if="!editando.facultad" @click="iniciarEdicion('facultad')">
                {{ silabo.informacionCurso.facultad || 'Hacer clic para editar' }}
              </span>
              <input v-else v-model="silabo.informacionCurso.facultad" @blur="finalizarEdicion('facultad')" @keyup.enter="finalizarEdicion('facultad')" ref="facultadInput" />
            </td>
            <th>SEMESTRE</th>
            <td>
              <span v-if="!editando.semestre" @click="iniciarEdicion('semestre')">
                {{ silabo.informacionCurso.semestre || 'Hacer clic para editar' }}
              </span>
              <input v-else v-model="silabo.informacionCurso.semestre" @blur="finalizarEdicion('semestre')" @keyup.enter="finalizarEdicion('semestre')" ref="semestreInput" />
            </td>
            <th class="gris">ÁREA DE FORMACIÓN</th>
            <td>
              <span v-if="!editando.areaFormacion" @click="iniciarEdicion('areaFormacion')">
                {{ silabo.informacionCurso.areaFormacion || 'Hacer clic para editar' }}
              </span>
              <input v-else v-model="silabo.informacionCurso.areaFormacion" @blur="finalizarEdicion('areaFormacion')" @keyup.enter="finalizarEdicion('areaFormacion')" ref="areaFormacionInput" />
            </td>
          </tr>
          <tr>
            <th>CARRERA PROFESIONAL</th>
            <td>
              <span v-if="!editando.carreraProfesional" @click="iniciarEdicion('carreraProfesional')">
                {{ silabo.informacionCurso.carreraProfesional || 'Hacer clic para editar' }}
              </span>
              <input v-else v-model="silabo.informacionCurso.carreraProfesional" @blur="finalizarEdicion('carreraProfesional')" @keyup.enter="finalizarEdicion('carreraProfesional')" ref="carreraProfesionalInput" />
            </td>
            <th>NRO. DE CRÉDITOS</th>
            <td>
              <span v-if="!editando.creditos" @click="iniciarEdicion('creditos')">
                {{ silabo.informacionCurso.creditos || 'Hacer clic para editar' }}
              </span>
              <input v-else v-model="silabo.informacionCurso.creditos" @blur="finalizarEdicion('creditos')" @keyup.enter="finalizarEdicion('creditos')" ref="creditosInput" />
            </td>
            <th class="gris">TIPO DE CURSO</th>
            <td>
              <span v-if="!editando.tipoCurso" @click="iniciarEdicion('tipoCurso')">
                {{ silabo.informacionCurso.tipoCurso || 'Hacer clic para editar' }}
              </span>
              <input v-else v-model="silabo.informacionCurso.tipoCurso" @blur="finalizarEdicion('tipoCurso')" @keyup.enter="finalizarEdicion('tipoCurso')" ref="tipoCursoInput" />
            </td>
          </tr>
          <tr>
            <th>PERIODO LECTIVO</th>
            <td>
              <span v-if="!editando.periodoLectivo" @click="iniciarEdicion('periodoLectivo')">
                {{ silabo.informacionCurso.periodoLectivo || 'Hacer clic para editar' }}
              </span>
              <input v-else v-model="silabo.informacionCurso.periodoLectivo" @blur="finalizarEdicion('periodoLectivo')" @keyup.enter="finalizarEdicion('periodoLectivo')" ref="periodoLectivoInput" />
            </td>
            <th>NRO. DE HORAS</th>
            <td colspan="1">
              <div>
                <span>Teoría: </span>
                <span v-if="!editando.horasTeoria" @click="iniciarEdicion('horasTeoria')">
                  {{ silabo.informacionCurso.horasTeoria || '0' }}
                </span>
                <input v-else class="horas-input" v-model="silabo.informacionCurso.horasTeoria" @blur="finalizarEdicion('horasTeoria')" @keyup.enter="finalizarEdicion('horasTeoria')" ref="horasTeoriaInput" />
              </div>
              <div>
                <span>Práctica: </span>
                <span v-if="!editando.horasPractica" @click="iniciarEdicion('horasPractica')">
                  {{ silabo.informacionCurso.horasPractica || '0' }}
                </span>
                <input v-else class="horas-input" v-model="silabo.informacionCurso.horasPractica" @blur="finalizarEdicion('horasPractica')" @keyup.enter="finalizarEdicion('horasPractica')" ref="horasPracticaInput" />
              </div>
            </td>
            <th class="gris">CÓDIGO DEL CURSO</th>
            <td>
              <span v-if="!editando.codigoCurso" @click="iniciarEdicion('codigoCurso')">
                {{ silabo.informacionCurso.codigoCurso || 'Hacer clic para editar' }}
              </span>
              <input v-else v-model="silabo.informacionCurso.codigoCurso" @blur="finalizarEdicion('codigoCurso')" @keyup.enter="finalizarEdicion('codigoCurso')" ref="codigoCursoInput" />
            </td>
          </tr>
          <tr>
            <th>PRE REQUISITO(s)</th>
            <td>
              <span v-if="!editando.prerequisito" @click="iniciarEdicion('prerequisito')">
                {{ silabo.informacionCurso.prerequisito || 'Hacer clic para editar' }}
              </span>
              <input v-else v-model="silabo.informacionCurso.prerequisito" @blur="finalizarEdicion('prerequisito')" @keyup.enter="finalizarEdicion('prerequisito')" ref="prerequisitoInput" />
            </td>
            <th class="gris" colspan="1">DOCENTE:</th>
            <td colspan="3">
              <div>
                <span v-if="!editando.docente" @click="iniciarEdicion('docente')">
                  {{ silabo.informacionCurso.docente || 'Hacer clic para editar' }}
                </span>
                <input v-else v-model="silabo.informacionCurso.docente" @blur="finalizarEdicion('docente')" @keyup.enter="finalizarEdicion('docente')" ref="docenteInput" />
              </div>
              <div>
                <strong>
                  <span v-if="!editando.correo" @click="iniciarEdicion('correo')">
                    {{ silabo.informacionCurso.correo || 'Hacer clic para editar' }}
                  </span>
                  <input v-else v-model="silabo.informacionCurso.correo" @blur="finalizarEdicion('correo')" @keyup.enter="finalizarEdicion('correo')" ref="correoInput" />
                </strong>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, nextTick } from 'vue'
  
  defineProps(['silabo'])
  
  const editando = reactive({})
  
  function iniciarEdicion(campo) {
    editando[campo] = true
    nextTick(() => {
      const input = refs[`${campo}Input`]
      if (input) input.focus()
    })
  }
  
  function finalizarEdicion(campo) {
    editando[campo] = false
  }
  </script>
  
  <style scoped>
  .datos-generales {
    margin: 2rem 0;
    font-family: 'Segoe UI', sans-serif;
  }
  
  .titulo-seccion {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.8rem;
  }
  
  .tabla-datos {
    width: 100%;
    border-collapse: collapse;
    font-size: 0.95rem;
  }
  
  .tabla-datos th,
  .tabla-datos td {
    border: 1px solid #333;
    padding: 6px 8px;
    text-align: left;
    vertical-align: top;
  }
  
  .tabla-datos th {
    background-color: #e8e8e8;
    font-weight: 600;
    width: 16%;
  }
  
  .tabla-datos td {
    background-color: #fff;
    width: 17%;
  }
  
  .gris {
    background-color: #dcdcdc;
  }
  
  .horas-input {
    width: 60px;
    margin-left: 4px;
  }
  </style>
  