<template>
  <div>

      <h1>Visualizar todos los boardgames</h1>
      <br>
      <Tarjeta  
      class="tarjeta"   
      v-for="v in boardgames"
      :key="v.ID"
      :ID="v.ID"
      :Name="v.Name"
      :Publisher="v.Publisher"
      :Year="v.Year"
      >
    </Tarjeta>

  </div>
</template>

<script>
import Tarjeta from '../components/Tarjeta.vue'
import {mapState, mapActions} from 'vuex'
export default {
  name: 'Visualizar',
  components: {
    Tarjeta
  },
  data(){
    return{
      fields:[
        {key:'Name', label: 'Nombre'},
        {key:'Publisher', label: 'Editor'},
        {
          key:'Year', 
          label: 'Año',
          formatter: value => {
            return value || "-"
          }
        },
        
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

<style>
.tarjeta{
  text-align: center;
  margin: 0 80px 0 80px;
  padding: 0 80px 0 80px;
}


</style>