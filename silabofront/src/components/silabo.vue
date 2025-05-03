<template>
    <div class="container">
      <div class="text-center mb-4">
        <img src="/logo_lasalle.png" alt="Logo La Salle" height="200" />
      </div>
      <h1>SÍLABO DEL CURSO DE INGENIERÍA WEB</h1>
  
      <!-- I. DATOS GENERALES -->
      <section>
        <h2>I. DATOS GENERALES</h2>
        <table>
          <tbody>
            <tr>
              <td><strong>FACULTAD</strong></td>
              <td>
                <span v-if="!editando.facultad" @click="iniciarEdicion('facultad')">{{ silabo.informacionCurso?.facultad || 'Hacer clic para editar' }}</span>
                <input v-else type="text" v-model="silabo.informacionCurso.facultad" @blur="finalizarEdicion('facultad')" @keyup.enter="finalizarEdicion('facultad')" ref="facultadInput" />
              </td>
              <td><strong>SEMESTRE</strong></td>
              <td>
                <span v-if="!editando.semestre" @click="iniciarEdicion('semestre')">{{ silabo.informacionCurso?.semestre || 'Hacer clic para editar' }}</span>
                <input v-else type="text" v-model="silabo.informacionCurso.semestre" @blur="finalizarEdicion('semestre')" @keyup.enter="finalizarEdicion('semestre')" ref="semestreInput" />
              </td>
            </tr>
            <tr>
              <td><strong>CARRERA PROFESIONAL</strong></td>
              <td>
                <span v-if="!editando.carreraProfesional" @click="iniciarEdicion('carreraProfesional')">{{ silabo.informacionCurso?.carreraProfesional || 'Hacer clic para editar' }}</span>
                <input v-else type="text" v-model="silabo.informacionCurso.carreraProfesional" @blur="finalizarEdicion('carreraProfesional')" @keyup.enter="finalizarEdicion('carreraProfesional')" ref="carreraProfesionalInput" />
              </td>
              <td><strong>NRO. DE CRÉDITOS</strong></td>
              <td>
                <span v-if="!editando.creditos" @click="iniciarEdicion('creditos')">{{ silabo.informacionCurso?.creditos || 'Hacer clic para editar' }}</span>
                <input v-else type="text" v-model="silabo.informacionCurso.creditos" @blur="finalizarEdicion('creditos')" @keyup.enter="finalizarEdicion('creditos')" ref="creditosInput" />
              </td>
            </tr>
            <tr>
              <td><strong>ÁREA DE FORMACIÓN</strong></td>
              <td>
                <span v-if="!editando.areaFormacion" @click="iniciarEdicion('areaFormacion')">{{ silabo.informacionCurso?.areaFormacion || 'Hacer clic para editar' }}</span>
                <input v-else type="text" v-model="silabo.informacionCurso.areaFormacion" @blur="finalizarEdicion('areaFormacion')" @keyup.enter="finalizarEdicion('areaFormacion')" ref="areaFormacionInput" />
              </td>
              <td><strong>TIPO DE CURSO</strong></td>
              <td>
                <span v-if="!editando.tipoCurso" @click="iniciarEdicion('tipoCurso')">{{ silabo.informacionCurso?.tipoCurso || 'Hacer clic para editar' }}</span>
                <input v-else type="text" v-model="silabo.informacionCurso.tipoCurso" @blur="finalizarEdicion('tipoCurso')" @keyup.enter="finalizarEdicion('tipoCurso')" ref="tipoCursoInput" />
              </td>
            </tr>
            <tr>
              <td><strong>PERIODO LECTIVO</strong></td>
              <td>
                <span v-if="!editando.periodoLectivo" @click="iniciarEdicion('periodoLectivo')">{{ silabo.informacionCurso?.periodoLectivo || 'Hacer clic para editar' }}</span>
                <input v-else type="text" v-model="silabo.informacionCurso.periodoLectivo" @blur="finalizarEdicion('periodoLectivo')" @keyup.enter="finalizarEdicion('periodoLectivo')" ref="periodoLectivoInput" />
              </td>
              <td><strong>NRO. DE HORAS</strong></td>
              <td>
                <div class="horas-container">
                  <div>
                    <span>Teoría: </span>
                    <span v-if="!editando.horasTeoria" @click="iniciarEdicion('horasTeoria')">{{ silabo.informacionCurso?.horasTeoria || '0' }}</span>
                    <input v-else type="text" v-model="silabo.informacionCurso.horasTeoria" @blur="finalizarEdicion('horasTeoria')" @keyup.enter="finalizarEdicion('horasTeoria')" ref="horasTeoriaInput" class="horas-input" />
                  </div>
                  <div>
                    <span>Práctica: </span>
                    <span v-if="!editando.horasPractica" @click="iniciarEdicion('horasPractica')">{{ silabo.informacionCurso?.horasPractica || '0' }}</span>
                    <input v-else type="text" v-model="silabo.informacionCurso.horasPractica" @blur="finalizarEdicion('horasPractica')" @keyup.enter="finalizarEdicion('horasPractica')" ref="horasPracticaInput" class="horas-input" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <td><strong>CÓDIGO DEL CURSO</strong></td>
              <td>
                <span v-if="!editando.codigoCurso" @click="iniciarEdicion('codigoCurso')">{{ silabo.informacionCurso?.codigoCurso || 'Hacer clic para editar' }}</span>
                <input v-else type="text" v-model="silabo.informacionCurso.codigoCurso" @blur="finalizarEdicion('codigoCurso')" @keyup.enter="finalizarEdicion('codigoCurso')" ref="codigoCursoInput" />
              </td>
              <td><strong>PRE REQUISITO(S)</strong></td>
              <td>
                <span v-if="!editando.prerequisito" @click="iniciarEdicion('prerequisito')">{{ silabo.informacionCurso?.prerequisito || 'Hacer clic para editar' }}</span>
                <input v-else type="text" v-model="silabo.informacionCurso.prerequisito" @blur="finalizarEdicion('prerequisito')" @keyup.enter="finalizarEdicion('prerequisito')" ref="prerequisitoInput" />
              </td>
            </tr>
            <tr>
              <td><strong>DOCENTE</strong></td>
              <td colspan="3">
                <div class="docente-info">
                  <span v-if="!editando.docente" @click="iniciarEdicion('docente')">{{ silabo.informacionCurso?.docente || 'Hacer clic para editar' }}</span>
                  <input v-else type="text" v-model="silabo.informacionCurso.docente" @blur="finalizarEdicion('docente')" @keyup.enter="finalizarEdicion('docente')" ref="docenteInput" />
                  <span> / <strong>Correo:</strong> </span>
                  <span v-if="!editando.correo" @click="iniciarEdicion('correo')">{{ silabo.informacionCurso?.correo || 'Hacer clic para editar' }}</span>
                  <input v-else type="text" v-model="silabo.informacionCurso.correo" @blur="finalizarEdicion('correo')" @keyup.enter="finalizarEdicion('correo')" ref="correoInput" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </section>
  
      <!-- II. COMPETENCIA DEL CURSO -->
      <section>
        <h2>II. COMPETENCIA DEL CURSO</h2>
        <div class="box">
          <div v-if="!editando.competenciaCurso" @click="iniciarEdicion('competenciaCurso')" class="competencia-texto">
            <p v-html="formatearCompetenciaCurso"></p>
          </div>
          <textarea 
            v-else 
            v-model="silabo.competenciaCurso" 
            @blur="finalizarEdicion('competenciaCurso')" 
            ref="competenciaCursoInput" 
            class="full-width"
            rows="6"
          ></textarea>
        </div>
      </section>
  
      <!-- III. COMPETENCIA DEL PERFIL DE EGRESO AL QUE CONTRIBUYE -->
      <section>
        <h2>III. COMPETENCIA DEL PERFIL DE EGRESO AL QUE CONTRIBUYE</h2>
        <div class="box">
          <div v-if="!editando.competenciaPerfil" @click="iniciarEdicion('competenciaPerfil')" class="perfil-texto">
            {{ silabo.competenciaPerfil || 'Hacer clic para editar el perfil de egreso' }}
          </div>
          <textarea 
            v-else 
            v-model="silabo.competenciaPerfil" 
            @blur="finalizarEdicion('competenciaPerfil')" 
            ref="competenciaPerfilInput" 
            class="full-width"
            rows="6"
          ></textarea>
        </div>
      </section>
  
      <!-- IV. COMPETENCIAS PREVIAS NECESARIAS -->
      <section>
        <h2>IV. COMPETENCIAS PREVIAS NECESARIAS</h2>
        <div class="box">
          <h3>Antes de iniciar el curso el estudiante debería:</h3>
          <ul>
            <li v-for="(item, index) in silabo.competenciasPrevias" :key="`prev-${index}`" class="competencia-item">
              <div v-if="!editando[`previa-${index}`]" @click="iniciarEdicion(`previa-${index}`)" class="competencia-texto">
                {{ item }}
              </div>
              <div v-else class="full-width">
                <input 
                  type="text" 
                  v-model="silabo.competenciasPrevias[index]" 
                  @blur="finalizarEdicion(`previa-${index}`)" 
                  @keyup.enter="finalizarEdicion(`previa-${index}`)" 
                  :ref="`previaInput-${index}`" 
                  class="full-width" 
                />
              </div>
            </li>
          </ul>
          <div class="add-button-container">
            <button @click="agregarCompetenciaPrevia" class="btn-add">+ Agregar competencia previa</button>
          </div>
        </div>
      </section>
  
      <!-- V. SUMILLA DEL CURSO -->
      <section v-if="silabo.sumilla">
        <h2>V. SUMILLA DEL CURSO</h2>
        <div class="box">
          <div v-if="!editando.sumilla" @click="iniciarEdicion('sumilla')" class="sumilla-texto">
            {{ silabo.sumilla || 'Hacer clic para editar la sumilla' }}
          </div>
          <textarea 
            v-else 
            v-model="silabo.sumilla" 
            @blur="finalizarEdicion('sumilla')" 
            ref="sumillaInput" 
            class="full-width"
            rows="6"
          ></textarea>
        </div>
      </section>
  
      <!-- VI. CONTENIDO Y CRONOGRAMA DE ACTIVIDADES -->
      <section>
        <h2>VI. CONTENIDO Y CRONOGRAMA DE ACTIVIDADES</h2>
        <div class="box">
          <div class="section-header">
            <h3>Programación semanal:</h3>
            <button @click="agregarSemana" class="btn-add">+ Agregar semana</button>
          </div>
          
          <div v-for="(semana, indexSemana) in silabo.semanas || []" :key="`semana-${indexSemana}`" class="semana-container">
            <div class="semana-header">
              <h4>
                <span v-if="!editando[`semana-titulo-${indexSemana}`]" @click="iniciarEdicion(`semana-titulo-${indexSemana}`)">
                  Semana {{ indexSemana + 1 }}: {{ semana.titulo || 'Sin título' }}
                </span>
                <input 
                  v-else 
                  type="text" 
                  v-model="semana.titulo" 
                  @blur="finalizarEdicion(`semana-titulo-${indexSemana}`)" 
                  @keyup.enter="finalizarEdicion(`semana-titulo-${indexSemana}`)" 
                  :ref="`semanaTituloInput-${indexSemana}`"
                  class="full-width"
                />
              </h4>
              <button @click="borrarSemana(indexSemana)" class="btn-delete" title="Eliminar semana">🗑️</button>
            </div>
  
            <div class="semana-content">
              <div class="semana-field">
                <label>Contenidos:</label>
                <div v-if="!editando[`semana-contenido-${indexSemana}`]" @click="iniciarEdicion(`semana-contenido-${indexSemana}`)" class="semana-text">
                  {{ semana.contenido || 'Hacer clic para editar contenido' }}
                </div>
                <textarea 
                  v-else 
                  v-model="semana.contenido" 
                  @blur="finalizarEdicion(`semana-contenido-${indexSemana}`)" 
                  :ref="`semanaContenidoInput-${indexSemana}`"
                  class="full-width"
                  rows="3"
                ></textarea>
              </div>
              
              <div class="semana-field">
                <label>Actividades:</label>
                <div v-if="!editando[`semana-actividades-${indexSemana}`]" @click="iniciarEdicion(`semana-actividades-${indexSemana}`)" class="semana-text">
                  {{ semana.actividades || 'Hacer clic para editar actividades' }}
                </div>
                <textarea 
                  v-else 
                  v-model="semana.actividades" 
                  @blur="finalizarEdicion(`semana-actividades-${indexSemana}`)" 
                  :ref="`semanaActividadesInput-${indexSemana}`"
                  class="full-width"
                  rows="3"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, nextTick, computed } from 'vue'
  
  // Estado principal del sílabo
  const silabo = ref({
    informacionCurso: {
      facultad: '',
      semestre: '',
      carreraProfesional: '',
      creditos: '',
      areaFormacion: '',
      tipoCurso: '',
      periodoLectivo: '',
      horasTeoria: '',
      horasPractica: '',
      codigoCurso: '',
      prerequisito: '',
      docente: '',
      correo: ''
    },
    competenciaCurso: '',
    competenciaPerfil: '',
    competenciasPrevias: [],
    sumilla: '',
    semanas: []
  })
  
  // Formatear la competencia del curso para mostrarlo como HTML
  const formatearCompetenciaCurso = computed(() => {
    if (!silabo.value.competenciaCurso) return '';
    
    // Reemplazar los guiones por puntos de lista HTML
    return silabo.value.competenciaCurso
      .replace(/^-\s/gm, '• ')
      .replace(/\n-\s/gm, '<br>• ')
      .replace(/\n/g, '<br>');
  })
  
  // Estado de edición para cada campo
  const editando = ref({})
  
  // Funciones para manejar la edición
  const iniciarEdicion = (campo) => {
    editando.value[campo] = true
    nextTick(() => {
      // Enfocar el campo que se está editando
      const refName = `${campo}Input`
      if (refName.includes('-')) {
        // Campos dinámicos como competencia-0, previa-1, etc.
        const ref = refName.replace('Input', '')
        if (refs.value[ref]) {
          refs.value[ref].focus()
        }
      } else {
        // Campos estáticos
        if (refs.value[refName]) {
          refs.value[refName].focus()
        }
      }
    })
  }
  
  const finalizarEdicion = (campo) => {
    editando.value[campo] = false
  }
  
  // Referencias para los inputs
  const refs = ref({})
  
  // Funciones para las competencias previas
  const agregarCompetenciaPrevia = () => {
    if (!silabo.value.competenciasPrevias) {
      silabo.value.competenciasPrevias = []
    }
    silabo.value.competenciasPrevias.push('Nueva competencia previa')
    const index = silabo.value.competenciasPrevias.length - 1
    nextTick(() => {
      iniciarEdicion(`previa-${index}`)
    })
  }
  
  // Funciones para las semanas
  const agregarSemana = () => {
    if (!silabo.value.semanas) {
      silabo.value.semanas = []
    }
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
  
  // Inicializar sílabo con datos de ejemplo
  const inicializarSilaboEjemplo = () => {
    silabo.value = {
      datosGenerales: {
        asignatura: "Desarrollo Web",
        ciclo: "VII",
        codigo: "INF784",
        creditos: 4
      },
      informacionCurso: {
        facultad: "Ingenierías y Arquitectura",
        semestre: "VII",
        areaFormacion: "Estudios de Especialidad",
        tipoCurso: "Obligatorio",
        carreraProfesional: "Ingeniería de Software",
        creditos: 4,
        prerequisito: "Base de Datos II",
        periodoLectivo: "2025 - I",
        horasTeoria: 2,
        horasPractica: 4,
        codigoCurso: "3.7.4.21",
        docente: "Richart Smith Escobedo Quispe",
        correo: "r.escobedo@ulasalle.edu.pe"
      },
      competenciaCurso: "Al término del presente curso, el estudiante estará en condiciones de: \n- Utilizar las recomendaciones de la W3C para el desarrollo de aplicaciones web.\n- Conocer un framework MVC para el desarrollo de aplicaciones web. \n- Conocer los criterios de seguridad OWASP cuando se desarrollan aplicaciones web.",
      competenciaPerfil: "Desarrollar, mantener y evaluar servicios y sistemas software que satisfagan todos los requisitos del usuario y se comporten de forma fiable y eficiente, sean asequibles de desarrollar y mantener y cumplan normativas de calidad, aplicando las teorías, principios, métodos y prácticas de la informática.",
      competenciasPrevias: [
        "Conocimientos básicos de matemáticas discretas...",
        "Comprensión de la responsabilidad y ética profesional",
        "Gestionar el desarrollo de sistemas de software",
        "Capacidad de aprender y actualizarse permanentemente"
      ],
      sumilla: "El curso contempla los siguientes temas: Programación del lado del servidor...",
      semanas: [
        {
          titulo: "Introducción a la Web",
          contenido: "Conceptos básicos, arquitectura cliente-servidor",
          actividades: "Presentación del curso y formación de equipos"
        },
        {
          titulo: "HTML y CSS",
          contenido: "Etiquetas HTML, selectores CSS, diseño responsivo",
          actividades: "Taller práctico de maquetación web"
        }
      ]
    }
  }
  
  onMounted(() => {
    // Inicializar con datos de ejemplo
    inicializarSilaboEjemplo()
    
    // Intentar cargar silabo.json si existe
    try {
      fetch('/silabo.json')
        .then(response => {
          if (response.ok) {
            return response.json()
          }
          throw new Error('No se pudo cargar el archivo')
        })
        .then(data => {
          silabo.value = data
          
          // Asegurarse de que todas las propiedades necesarias existan
          if (!silabo.value.semanas) {
            silabo.value.semanas = []
          }
          
          if (!silabo.value.competenciasPrevias) {
            silabo.value.competenciasPrevias = []
          }
          
          if (!silabo.value.informacionCurso) {
            silabo.value.informacionCurso = {}
          }
        })
        .catch(error => {
          console.info('Usando datos de ejemplo:', error)
        })
    } catch (error) {
      console.info('Usando datos de ejemplo:', error)
    }
  })
  </script>
  
  <style scoped>
  .container {
    max-width: 900px;
    margin: auto;
    padding: 1rem;
    font-family: Arial, sans-serif;
  }
  
  h1 {
    text-align: center;
    color: #1a1a1a;
    font-size: 1.6rem;
    margin-bottom: 1.5rem;
  }
  
  h2 {
    margin-top: 1.5rem;
    font-size: 1.2rem;
    color: #333;
    border-bottom: 2px solid #ccc;
    padding-bottom: 0.3rem;
  }
  
  h3 {
    font-size: 1.1rem;
    margin-bottom: 0.8rem;
  }
  
  h4 {
    font-size: 1rem;
    margin: 0.5rem 0;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 1rem;
  }
  
  td {
    border: 1px solid #ccc;
    padding: 6px 8px;
    vertical-align: middle;
  }
  
  .box {
    background-color: #f9f9f9;
    padding: 1rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 1.5rem;
  }
  
  ul {
    padding-left: 20px;
    list-style-type: disc;
  }
  
  li {
    margin-bottom: 0.5rem;
  }
  
  .btn-delete {
    background: none;
    border: none;
    color: red;
    font-size: 1rem;
    cursor: pointer;
    transition: transform 0.2s;
  }
  
  .btn-delete:hover {
    transform: scale(1.2);
  }
  
  .btn-add {
    background-color: #4a6fa5;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 5px 10px;
    font-size: 0.9rem;
    cursor: pointer;
  }
  
  .btn-add:hover {
    background-color: #3a5985;
  }
  
  input, textarea {
    padding: 5px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-family: inherit;
    font-size: inherit;
  }
  
  .full-width {
    width: 100%;
  }
  
  textarea {
    min-height: 80px;
    resize: vertical;
  }
  
  .competencia-item {
    margin-bottom: 0.8rem;
  }
  
  .competencia-texto, .perfil-texto, .sumilla-texto {
    cursor: pointer;
    padding: 5px;
    border-radius: 4px;
  }
  
  .competencia-texto:hover, .perfil-texto:hover, .sumilla-texto:hover {
    background-color: #f0f0f0;
  }
  
  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  
  .horas-container {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .horas-input {
    width: 50px;
  }
  
  .semana-container {
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 15px;
    padding: 10px;
    background-color: #fff;
  }
  
  .semana-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 1px solid #eee;
    padding-bottom: 5px;
  }
  
  .semana-content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .semana-field {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
  
  .semana-field label {
    font-weight: bold;
  }
  
  .semana-text {
    padding: 5px;
    background-color: #f5f5f5;
    border-radius: 4px;
    min-height: 2em;
    cursor: pointer;
  }
  
  .docente-info {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    align-items: center;
  }
  
  .text-center {
    text-align: center;
  }
  
  .mb-4 {
    margin-bottom: 1rem;
  }
  
  span:hover {
    background-color: #f0f0f0;
    border-radius: 3px;
  }
  
  .add-button-container {
    margin-top: 10px;
    text-align: right;
  }
  </style>