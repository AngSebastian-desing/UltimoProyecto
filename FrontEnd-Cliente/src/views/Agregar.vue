<template>
    <div>
        <h1>Agregar boardgame</h1>
        <form @submit.prevent="guardarBoardGame()">
            <Input
                v-model="boardgame.Name"
                titulo="Nombre"
                class="mx-4"
                id="nombre"
                placeholder="Ingrese un nombre."
                :maxlength="80"
                mensajeError="Es necesario ingresar un nombre."
                :error="erroresValidacion && !validacionNombre"
            />

            <Input
                v-model="boardgame.Publisher"
                titulo="Editor"
                class="mx-4"
                id="Publisher"
                placeholder="Ingrese el editor."
                :maxlength="60"
                mensajeError="Es necesario ingresar un editor"
                :error="erroresValidacion && !validacionNombre"
            />

            <Input
                v-model="boardgame.Category"
                titulo="Categoría"
                class="mx-4"
                id="nombre"
                type="text"
                placeholder="Ingrese la categoría."
                :maxlength="2"
                mensajeError="Es necesario ingresar una categoría"
                :error="erroresValidacion && !validacionNombre"
            />

            <Input
                v-model="boardgame.Description"
                titulo="Descripción"
                class="mx-4"
                id="Description"
                placeholder="Descripción del juego"
                :maxlength="200"
            />
            <Input
                v-model="boardgame.Year"
                titulo="Año"
                class="mx-4"
                id="Year"
                type="numeric"
                placeholder="Ingrese el año de lanzamiento."
                :maxlength="4"
            />

             <b-button type="submit" variant="primary" class="m-4">Guardar</b-button>
        </form>

    </div>
  
</template>

<script>
import Input from '../components/Input.vue'
import { mapActions } from "vuex";
export default {
    name: 'Agregar',
    components:{Input},
    data() {
    return {
      boardgame: {
        Name: "",
        Publisher: "",
        Category: "",
        Description:"",
        Year:"",
      },
      erroresValidacion: false,
    };
  },
  computed: {
    validacionNombre() {
      return (this.boardgame.Name !== undefined && this.boardgame.Name.trim() !== "");
    },
  },
  methods:{
      
    ...mapActions(["setBoardGame"]),

      guardarBoardGame() {
      if (this.validacionNombre) {

        this.erroresValidacion = false;
        console.log("Si puedo guardar");

        this.setBoardGame({
          params: this.boardgame,
          onComplete: (response) => {
            console.log(response);
            this.$notify({
              title: response.data.mensaje,
              type: "success",
            });
            this.$router.push({
                name: 'Home'
            })
          },
          onError: (error) => {
            console.log(error.response.data.mensaje);
            this.$notify({
              type: "error",
              title: error.response.data.mensaje,
            });
          },
        });
      } else {
        this.erroresValidacion = true;
     }
    },
    limpiar(){
        this.boardgame={
            Name: "",
            Publisher: "",
            Category: "",
            Description:"",
            Year:"",
        };
    },
  }
}
</script>

<style>

h1{
    text-align: center;
}



</style>