<template>
  <div>
      <h1>Detalle de boardgame</h1>
      <br>
      <Tabla :items="boardgames" :busy="loading" :fields="fields">
    </Tabla>
  </div>
</template>

<script>
import Tabla from '../components/Tabla.vue'
import {mapState, mapActions} from 'vuex'
export default {
  name: 'Detalle',
  components:{
    Tabla
  },
  data(){
    return{
      fields:[
        {key:'ID', label: 'Clave'},
        {key:'Name', label: 'Nombre'},
        {key:'Publisher', label: 'Editor'},
        {key:'Description', label: 'Descripción'},
        {
          key:'Category', 
          label: 'Categoría',
          formatter: value => {
            return value || "-"
          }
        },
        {
          key:'Year', 
          label: 'Año',
          formatter: value => {
            return value || "-"
          }
        },
        'Favorites'
        
      ]
    }
  },
    computed: {
    ...mapState(['boardgames', 'loading'])
  },
  methods:{
    ...mapActions(['list']),
  },
  mounted() {
    this.list();
  }

}
</script>

<style>

</style>