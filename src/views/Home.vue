<template>
  <div class="home">
    <h1>BoardGames</h1>
    <b-button to="/agregar" variant="success" class="m-3">Agregar</b-button>
    <Tabla :items="boardgames" :busy="loading" :fields="fields">

     <template slot="actions" slot-scope="{item}">
          <b-button :to="`/editar/${item.ID}`" class="mx-1" variant="warning">Editar</b-button>
          <b-button @click="eliminar(item.ID)" variant="danger" class="mx-1">Eliminar</b-button>
      </template>
    </Tabla>
  </div>
</template>

<script>
import Tabla from '../components/Tabla.vue'
import {mapState, mapActions} from 'vuex'
export default {
  name: 'Home',
  components: {
    Tabla
  },
  data(){
    return{
      fields:[
        {key:'ID', label: 'Clave'},
        {key:'Name', label: 'Nombre'},
        {key:'Publisher', label: 'Editor'},
        {key:'Category', label: 'Categoría'},
        {
          key:'Description', 
          label: 'Descripción',
          formatter: value => {
            return value || "(Sin descripción)"
          }
        },
        {
          key:'Year', 
          label: 'Año',
          formatter: value => {
            return value || "-"
          }
        },
        'acciones'

      ]
    }
  },
  computed: {
    ...mapState(['boardgames', 'loading'])
  },
   methods: {
    ...mapActions(['list', 'deleteBoardGame']),
    eliminar(idItem) {
      this.$bvModal.msgBoxConfirm('Esta opción no se podrá deshacer.', {
          title: '¿Desea eliminar el Boardgame?',
          size: 'md',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'ACEPTAR',
          cancelTitle: 'CANCELAR',
          footerClass: 'p-2',
          hideHeaderClose: true,
          centered: true
        })
        .then(value => {
            if(value) {
              this.deleteBoardGame({
                id: idItem,
                onComplete: (response) => {
                  this.$notify({
                    type: 'success',
                    title: response.data.mensaje
                  });
                  setTimeout(() => this.list(), 1000);
                }
              })
            }
          })
          .catch(err => {
            // An error occurred
          })
    }
  },
   mounted() {
    this.list();
  }
}
</script>
