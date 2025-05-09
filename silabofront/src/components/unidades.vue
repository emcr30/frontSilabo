<template>
  <div class="unidades-container">
    <h3 class="text-center my-4">UNIDADES DE APRENDIZAJE</h3>
    
    <div v-for="(unidad, index) in unidades" :key="index" class="mb-5">
      <div class="table-responsive">
        <table class="table table-bordered">
          <thead class="thead-light">
            <tr>
              <th width="20%">{{ unidad.titulo }}</th>
              <th width="30%">DENOMINACIÓN: {{ unidad.denominacion }}</th>
              <th width="10%">SEMANA</th>
              <th width="40%">CONTENIDOS ESPECÍFICOS</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td rowspan="100">
                <div>
                  <strong>Intervalo de fechas:</strong>
                  <div class="my-2">
                    <div v-if="!unidad.editando">
                      {{ unidad.fechaInicio }} al {{ unidad.fechaFin }}
                      <button class="btn btn-sm btn-info ml-2" @click="editarFechas(unidad)">
                        <i class="fas fa-edit"></i>
                      </button>
                    </div>
                    <div v-else>
                      <div class="form-group">
                        <label>Fecha inicio:</label>
                        <input type="text" class="form-control" v-model="unidad.fechaInicio" />
                      </div>
                      <div class="form-group">
                        <label>Fecha fin:</label>
                        <input type="text" class="form-control" v-model="unidad.fechaFin" />
                      </div>
                      <button class="btn btn-sm btn-success" @click="guardarFechas(unidad)">
                        <i class="fas fa-save"></i> Guardar
                      </button>
                    </div>
                  </div>
                </div>
              </td>
              <td rowspan="100">
                <div>
                  <strong>Enunciado de la capacidad a ser lograda por el estudiante:</strong>
                  <div class="my-2">
                    <div v-if="!unidad.editandoCapacidad">
                      {{ unidad.capacidad }}
                      <button class="btn btn-sm btn-info ml-2" @click="editarCapacidad(unidad)">
                        <i class="fas fa-edit"></i>
                      </button>
                    </div>
                    <div v-else>
                      <textarea v-model="unidad.capacidad" class="form-control" rows="4"></textarea>
                      <button class="btn btn-sm btn-success mt-2" @click="guardarCapacidad(unidad)">
                        <i class="fas fa-save"></i> Guardar
                      </button>
                    </div>
                  </div>
                </div>
              </td>
              <td colspan="2" class="text-right">
                <button 
                  v-if="!esSemanaNueve(siguienteSemana(unidad))"
                  class="btn btn-sm btn-success mr-2" 
                  @click="agregarSemana(unidad)">
                  <i class="fas fa-plus"></i> Agregar semana
                </button>
              </td>
            </tr>
            <tr v-for="(semana, semanaIndex) in unidad.semanas" :key="semanaIndex">
              <td class="text-center">{{ semana.numero }}</td>
              <td>
                <div class="d-flex align-items-start">
                  <div class="flex-grow-1">
                    <div v-if="semana.numero === 9">
                      <strong>Examen Parcial</strong>
                    </div>
                    <div v-else>
                      <textarea 
                        v-model="semana.contenido" 
                        class="form-control" 
                        rows="4"
                      ></textarea>
                    </div>
                  </div>
                  <div v-if="semana.numero !== 9" class="ml-2">
                    <button 
                      class="btn btn-sm btn-danger" 
                      @click="eliminarSemana(unidad, semanaIndex)">
                      <i class="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="text-center mb-5">
      <button class="btn btn-primary" @click="agregarUnidad">
        <i class="fas fa-plus"></i> Agregar Unidad
      </button>
    </div>

    <!-- Sección de Metodología -->
    <div class="card mb-4">
      <div class="card-header bg-light">
        <h4 class="mb-0">Metodología</h4>
      </div>
      <div class="card-body">
        <div class="d-flex mb-3">
          <select class="form-control w-auto mr-2" v-model="nuevaMetodologia.tipo">
            <option value="">Seleccionar tipo</option>
            <option value="Lectura">Lectura</option>
            <option value="Prácticas">Prácticas</option>
            <option value="Aprendizaje basado en proyectos">Aprendizaje basado en proyectos</option>
            <option value="Clase magistral">Clase magistral</option>
          </select>
          <textarea 
            class="form-control flex-grow-1 mr-2" 
            v-model="nuevaMetodologia.descripcion" 
            placeholder="Descripción de la metodología"
            rows="1"
          ></textarea>
          <button 
            class="btn btn-success" 
            @click="agregarMetodologia"
            :disabled="!nuevaMetodologia.tipo || !nuevaMetodologia.descripcion"
          >
            <i class="fas fa-plus"></i> Agregar
          </button>
        </div>

        <ul class="list-group">
          <li v-for="(metodologia, index) in metodologias" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <strong>{{ metodologia.tipo }}:</strong> {{ metodologia.descripcion }}
            </div>
            <button class="btn btn-sm btn-danger" @click="eliminarMetodologia(index)">
              <i class="fas fa-trash"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Sección de Fuentes de consulta -->
    <div class="card mb-4">
      <div class="card-header bg-light">
        <h4 class="mb-0">Fuentes de consulta documental</h4>
      </div>
      <div class="card-body">
        <div class="alert alert-info">
          Ingrese las fuentes en formato APA
        </div>

        <div class="form-row mb-3">
          <div class="col-md-3">
            <input 
              type="text" 
              class="form-control" 
              v-model="nuevaFuente.autores" 
              placeholder="Autores (Apellido, Nombre)"
            />
          </div>
          <div class="col-md-2">
            <input 
              type="text" 
              class="form-control" 
              v-model="nuevaFuente.anio" 
              placeholder="Año"
            />
          </div>
          <div class="col-md-4">
            <input 
              type="text" 
              class="form-control" 
              v-model="nuevaFuente.titulo" 
              placeholder="Título del libro o artículo"
            />
          </div>
          <div class="col-md-3">
            <input 
              type="text" 
              class="form-control" 
              v-model="nuevaFuente.editorial" 
              placeholder="Editorial"
            />
          </div>
        </div>

        <div class="form-row mb-3">
          <div class="col-md-3">
            <input 
              type="text" 
              class="form-control" 
              v-model="nuevaFuente.ciudad" 
              placeholder="Ciudad"
            />
          </div>
          <div class="col-md-3">
            <input 
              type="text" 
              class="form-control" 
              v-model="nuevaFuente.pais" 
              placeholder="País"
            />
          </div>
          <div class="col-md-4">
            <input 
              type="text" 
              class="form-control" 
              v-model="nuevaFuente.url" 
              placeholder="URL (si aplica)"
            />
          </div>
          <div class="col-md-2">
            <button 
              class="btn btn-success btn-block" 
              @click="agregarFuente"
              :disabled="!nuevaFuente.autores || !nuevaFuente.titulo || !nuevaFuente.anio"
            >
              <i class="fas fa-plus"></i> Agregar
            </button>
          </div>
        </div>

        <ul class="list-group">
          <li v-for="(fuente, index) in fuentes" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              [{{ index + 1 }}] {{ formatoAPA(fuente) }}
            </div>
            <button class="btn btn-sm btn-danger" @click="eliminarFuente(index)">
              <i class="fas fa-trash"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>

    <!-- Sitios web -->
    <div class="card mb-4">
      <div class="card-header bg-light">
        <h4 class="mb-0">Sitios web</h4>
      </div>
      <div class="card-body">
        <div class="form-row mb-3">
          <div class="col-md-3">
            <input 
              type="text" 
              class="form-control" 
              v-model="nuevoSitio.nombre" 
              placeholder="Nombre del recurso"
            />
          </div>
          <div class="col-md-7">
            <input 
              type="text" 
              class="form-control" 
              v-model="nuevoSitio.url" 
              placeholder="URL del sitio web"
            />
          </div>
          <div class="col-md-2">
            <button 
              class="btn btn-success btn-block" 
              @click="agregarSitio"
              :disabled="!nuevoSitio.nombre || !nuevoSitio.url"
            >
              <i class="fas fa-plus"></i> Agregar
            </button>
          </div>
        </div>

        <ul class="list-group">
          <li v-for="(sitio, index) in sitiosWeb" :key="index" class="list-group-item d-flex justify-content-between align-items-center">
            <div>
              {{ sitio.nombre }}: <a :href="sitio.url" target="_blank">{{ sitio.url }}</a>
            </div>
            <button class="btn btn-sm btn-danger" @click="eliminarSitio(index)">
              <i class="fas fa-trash"></i>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UnidadesAprendizaje',
  data() {
    return {
      unidades: [
        {
          titulo: 'UNIDAD I',
          denominacion: 'Tecnologías para el desarrollo de aplicaciones web.',
          fechaInicio: 'Del 10 de marzo',
          fechaFin: '05 de abril del 2025',
          capacidad: 'El estudiante conoce y utiliza reponsablemente las tecnologías para el desarrollo de aplicaciones web.',
          editando: false,
          editandoCapacidad: false,
          semanas: [
            {
              numero: 1,
              contenido: 'Presentación del Curso. Sílabo. Metodología. Sistema de Evaluación.\nHistoria. Arquitectura. Protocolo HTTP.\nInicio Rápido de un Servicio de alojamiento de Base datos en la Nube.\nInicio rápido en Frameworks Front-End.'
            },
            {
              numero: 2,
              contenido: 'Tecnologías de Desarrollo Web\nEditor de texto: Vim. IDE: VSCode.\nFront-End: Estándares Web, frameworks.\nBack-End: Lenguajes de Programación, frameworks.\nSistema de control de versiones: Git. (GitHub).'
            },
            {
              numero: 3,
              contenido: 'Despliegue de aplicaciones web desde contenedores con Docker.'
            },
            {
              numero: 4,
              contenido: 'Presentación de avance de proyecto: Desarrollo incremental de una aplicación web'
            }
          ]
        },
        {
          titulo: 'UNIDAD II',
          denominacion: 'Frameworks Back-end para el desarrollo de aplicaciones Web',
          fechaInicio: 'Del 07 de abril',
          fechaFin: '03 de mayo del 2025',
          capacidad: 'El estudiante conoce y utiliza reponsablemente frameworks en el Back-End para el desarrollo de aplicaciones web.',
          editando: false,
          editandoCapacidad: false,
          semanas: [
            {
              numero: 5,
              contenido: 'JavaScript en el Back-End.'
            },
            {
              numero: 6,
              contenido: 'Plataforma LAMP y despliegue de aplicaciones web con frameworks Back-End.'
            },
            {
              numero: 7,
              contenido: 'Exposiciones de Frameworks Back-End.'
            },
            {
              numero: 8,
              contenido: 'Despliegue de plataformas de propósito general y específicas para el desarrollo de aplicaciones Web.'
            }
          ]
        },
        {
          titulo: 'UNIDAD III',
          denominacion: 'Desarrollo Front-End',
          fechaInicio: 'Del 05 de mayo',
          fechaFin: '31 de mayo del 2025',
          capacidad: 'El estudiante diseña y desarrolla interfaces de usuario aplicando tecnologías front-end modernas.',
          editando: false,
          editandoCapacidad: false,
          semanas: [
            {
              numero: 9,
              contenido: 'Examen Parcial'
            },
            {
              numero: 10,
              contenido: 'HTML5 y CSS3 avanzado. Maquetación responsive.'
            },
            {
              numero: 11,
              contenido: 'JavaScript moderno. DOM. Eventos. AJAX.'
            },
            {
              numero: 12,
              contenido: 'Frameworks JS: Vue.js, React. Componentes y estado.'
            }
          ]
        },
        {
          titulo: 'UNIDAD IV',
          denominacion: 'Desarrollo Full-Stack',
          fechaInicio: 'Del 02 de junio',
          fechaFin: '07 de julio del 2025',
          capacidad: 'El estudiante integra tecnologías frontend y backend para crear aplicaciones web completas.',
          editando: false,
          editandoCapacidad: false,
          semanas: [
            {
              numero: 13,
              contenido: 'Autenticación y autorización en aplicaciones web.'
            },
            {
              numero: 14,
              contenido: 'APIs RESTful y GraphQL.'
            },
            {
              numero: 15,
              contenido: 'Despliegue de aplicaciones web en la nube.'
            },
            {
              numero: 16,
              contenido: 'Presentación de proyectos finales.'
            }
          ]
        }
      ],
      ultimaSemana: 16,
      nuevaMetodologia: {
        tipo: '',
        descripcion: ''
      },
      metodologias: [
        {
          tipo: 'Lectura',
          descripcion: 'Revisión de la documentación oficial de las plataformas y frameworks de desarrollo web.'
        },
        {
          tipo: 'Prácticas',
          descripcion: 'Implementación de funcionalidades desde repositorios de código fuente.'
        },
        {
          tipo: 'Aprendizaje basado en proyectos',
          descripcion: 'Desarrollo incremental de una aplicación web.'
        },
        {
          tipo: 'Clase magistral',
          descripcion: 'Recomendaciones del desarrollo web. Estándares Web. Accesibilidad. Seguridad. Buenas prácticas.'
        }
      ],
      nuevaFuente: {
        autores: '',
        anio: '',
        titulo: '',
        editorial: '',
        ciudad: '',
        pais: '',
        url: ''
      },
      fuentes: [
        {
          autores: 'B. Jin, S. Sahni, y A. Shevat',
          anio: '2018',
          titulo: 'Designing web APIs: building APIs that developers love',
          editorial: 'O\'Reilly Media',
          ciudad: 'Sebastopol',
          pais: 'CA',
          url: ''
        },
        {
          autores: 'P. McFedries',
          anio: '2018',
          titulo: 'Web coding & development all-in-one',
          editorial: 'John Wiley & Sons, Inc',
          ciudad: 'Hoboken',
          pais: 'NJ',
          url: ''
        }
      ],
      nuevoSitio: {
        nombre: '',
        url: ''
      },
      sitiosWeb: [
        {
          nombre: 'NodeJS',
          url: 'https://www.w3schools.com/nodejs/default.asp'
        },
        {
          nombre: 'NodeJS',
          url: 'https://nodejs.org/en'
        },
        {
          nombre: 'CakePHP',
          url: 'https://cakephp.org/'
        },
        {
          nombre: 'CakePHP Documentation',
          url: 'https://book.cakephp.org/5/en/tutorials-and-examples/cms/installation.html'
        },
        {
          nombre: 'Django',
          url: 'https://www.djangoproject.com/'
        },
        {
          nombre: 'Django Documentation',
          url: 'https://docs.djangoproject.com/en/5.1/intro/tutorial01/'
        }
      ]
    }
  },
  methods: {
    siguienteSemana(unidad) {
      // Encuentra el número de la siguiente semana
      if (unidad.semanas.length === 0) {
        return this.obtenerSiguienteSemanaGlobal();
      }
      return unidad.semanas[unidad.semanas.length - 1].numero + 1;
    },
    
    obtenerSiguienteSemanaGlobal() {
      // Busca la última semana entre todas las unidades
      let ultimoNumero = 0;
      this.unidades.forEach(unidad => {
        if (unidad.semanas.length > 0) {
          const ultimo = unidad.semanas[unidad.semanas.length - 1].numero;
          if (ultimo > ultimoNumero) {
            ultimoNumero = ultimo;
          }
        }
      });
      return ultimoNumero + 1;
    },
    
    esSemanaNueve(numero) {
      return numero === 9;
    },
    
    agregarSemana(unidad) {
      const siguienteNumero = this.obtenerSiguienteSemanaGlobal();
      
      // No permitir duplicado de semana 9 (Examen Parcial)
      if (siguienteNumero === 9 && this.existeSemana9()) {
        unidad.semanas.push({
          numero: siguienteNumero,
          contenido: '' // No duplicar el Examen Parcial
        });
      } else {
        unidad.semanas.push({
          numero: siguienteNumero,
          contenido: siguienteNumero === 9 ? 'Examen Parcial' : ''
        });
      }
      
      // Actualizar la última semana global
      this.ultimaSemana = Math.max(this.ultimaSemana, siguienteNumero);

      // Reenumerar después de agregar
      this.renumerarSemanas();
    },
    
    eliminarSemana(unidad, index) {
      unidad.semanas.splice(index, 1);
      this.renumerarSemanas();
    },

    renumerarSemanas() {
      let contador = 1;
      this.unidades.forEach(unidad => {
        unidad.semanas.forEach(semana => {
          semana.numero = contador++;

          // Asegura que la semana 9 siempre sea "Examen Parcial"
          if (semana.numero === 9) {
            semana.contenido = 'Examen Parcial';
          }
        });
      });
      this.ultimaSemana = contador - 1;
    },

    existeSemana9() {
      return this.unidades.some(unidad =>
        unidad.semanas.some(semana => semana.numero === 9)
      );
    },
    
    agregarUnidad() {
      const numeroUnidad = this.unidades.length + 1;
      const siguienteSemana = this.obtenerSiguienteSemanaGlobal();
      
      // Determinar unidad romana
      const unidadRomana = this.convertirARomano(numeroUnidad);
      
      // Crear nueva unidad
      const nuevaUnidad = {
        titulo: `UNIDAD ${unidadRomana}`,
        denominacion: 'Nueva denominación',
        fechaInicio: 'DD/MM/YYYY',
        fechaFin: 'DD/MM/YYYY',
        capacidad: 'Descripción de la capacidad a lograr por el estudiante',
        editando: false,
        editandoCapacidad: false,
        semanas: []
      };
      
      // Agregar la primera semana a la nueva unidad
      nuevaUnidad.semanas.push({
        numero: siguienteSemana,
        contenido: ''
      });
      
      // Si la siguiente semana es 9, añadir también la semana 9 como "Examen Parcial"
      if (siguienteSemana <= 9 && siguienteSemana + nuevaUnidad.semanas.length > 9) {
        const posicionSemana9 = 9 - siguienteSemana;
        nuevaUnidad.semanas.splice(posicionSemana9, 0, {
          numero: 9,
          contenido: 'Examen Parcial'
        });
      }
      
      this.unidades.push(nuevaUnidad);
    },
    
    convertirARomano(numero) {
      const romanos = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
      return romanos[numero - 1] || numero.toString();
    },
    
    editarFechas(unidad) {
      unidad.editando = true;
    },
    
    guardarFechas(unidad) {
      unidad.editando = false;
    },
    
    editarCapacidad(unidad) {
      unidad.editandoCapacidad = true;
    },
    
    guardarCapacidad(unidad) {
      unidad.editandoCapacidad = false;
    },
    
    agregarMetodologia() {
      if (this.nuevaMetodologia.tipo && this.nuevaMetodologia.descripcion) {
        this.metodologias.push({
          tipo: this.nuevaMetodologia.tipo,
          descripcion: this.nuevaMetodologia.descripcion
        });
        this.nuevaMetodologia = { tipo: '', descripcion: '' };
      }
    },
    
    eliminarMetodologia(index) {
      this.metodologias.splice(index, 1);
    },
    
    formatoAPA(fuente) {
      let formatoAPA = '';
      
      // Autores
      if (fuente.autores) {
        formatoAPA += fuente.autores;
      }
      
      // Año
      if (fuente.anio) {
        formatoAPA += ` (${fuente.anio}).`;
      }
      
      // Título
      if (fuente.titulo) {
        formatoAPA += ` ${fuente.titulo}.`;
      }
      
      // Editorial y ubicación
      if (fuente.ciudad && fuente.editorial) {
        formatoAPA += ` ${fuente.ciudad}`;
        if (fuente.pais) {
          formatoAPA += `, ${fuente.pais}:`;
        } else {
          formatoAPA += ':';
        }
        formatoAPA += ` ${fuente.editorial}.`;
      }
      
      // URL
      if (fuente.url) {
        formatoAPA += ` Recuperado de ${fuente.url}`;
      }
      
      return formatoAPA;
    },
    
    agregarFuente() {
      if (this.nuevaFuente.autores && this.nuevaFuente.titulo && this.nuevaFuente.anio) {
        this.fuentes.push({...this.nuevaFuente});
        this.nuevaFuente = {
          autores: '',
          anio: '',
          titulo: '',
          editorial: '',
          ciudad: '',
          pais: '',
          url: ''
        };
      }
    },
    
    eliminarFuente(index) {
      this.fuentes.splice(index, 1);
    },
    
    agregarSitio() {
      if (this.nuevoSitio.nombre && this.nuevoSitio.url) {
        this.sitiosWeb.push({...this.nuevoSitio});
        this.nuevoSitio = { nombre: '', url: '' };
      }
    },
    
    eliminarSitio(index) {
      this.sitiosWeb.splice(index, 1);
    },
    
    guardarUnidades() {
      // Esta función puede ser implementada para guardar los datos en el backend
      const datos = JSON.stringify({
        unidades: this.unidades,
        metodologias: this.metodologias,
        fuentes: this.fuentes,
        sitiosWeb: this.sitiosWeb
      });
      console.log('Datos guardados:', datos);
      return datos;
    }
  }
}
</script>

<style scoped>
.unidades-container {
  margin-top: 20px;
}

table {
  width: 100%;
}

th {
  background-color: #f8f9fa;
}

textarea {
  width: 100%;
  resize: vertical;
}

.text-center {
  text-align: center;
}

.card-header {
  font-weight: bold;
}
</style>