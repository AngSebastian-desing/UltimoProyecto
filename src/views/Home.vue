<template>
  <div class="home">

    <div class="contenido">

      <h1>Favoritos</h1>
      <br>
    <b-form-select 
       v-model="selected" 
       :options="options" 
        class="select"
        :value="selected"
        mensajeError="Es necesario ingresar una categoría"
        :error="erroresValidacion && !validacionNombre">
    </b-form-select>
    

    <b-button variant="primary" @click="aplicarFiltro()">Aplicar filtro</b-button>
    
    <br>
    <b-button to="/agregar" variant="success" class="m-3">Agregar</b-button>
    <b-button to="/visualizar" variant="success" class="m-3">Visualizar</b-button>
    <hr>
    <Tabla :items="FiltroBoardgame" :busy="loading" :fields="fields" >

          
    </Tabla>
      <hr>
    </div>
    
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
      FiltroBoardgame: [],
      fields:[
        {key:'Name', label: 'Nombre'},
        {key:'Publisher', label: 'Editor'},
        {key:'Category', label: 'Categoría'},

        {
          key:'Year', 
          label: 'Año',
          formatter: value => {
            return value || "-"
          }
        },

      ],
      selected: null,
        options: [
          { value: '0', text: 'Todas las categorías' },
          { value: '11', text: 'Adventure' },
          { value: '12', text: 'Puzzle' },
          { value: '13', text: 'Strategy' },
          { value: '14', text: 'Fantasy' },
          { value: '15', text: 'Civilization'},
        ],
      erroresValidacion: false,
    };
  
  },
  computed: {
    ...mapState(['favorites', 'loading'])
  },
   methods: {
    ...mapActions(['listFavorites', 'deleteBoardGame']),

     aplicarFiltro() {

          if(this.selected === '0' ){

            this.FiltroBoardgame= this.favorites
          }else{
          this.FiltroBoardgame = this.favorites.filter(favorite => 
           favorite.Category === this.selected
       )}
       },
  },
   mounted() {
    this.listFavorites();
  }
}
</script>

<style>
.select{
  margin: 3px 10px 0 25px;
  width: 200px;
  height: 35px;
  border-radius: 3px;
  border-color: gray;
}

.contenido{
  text-align: center;
  padding: 0 50px 0 50px;
}
</style>
