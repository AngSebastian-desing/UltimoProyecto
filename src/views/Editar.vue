<template>
  <div>
      <h1>Editar Boardgame</h1>
      <br>
      <hr>
      <form @submit.prevent="guardarBoardGame()">
            <Input v-model="boardgame.ID" titulo="Clave" class="mx-4" id="ID" disabled />
            
            <Input
                v-model="boardgame.Name"
                titulo="Nombre"
                class="mx-4"
                id="nombre"
                placeholder="Ingrese el nombre"
                :maxlength="80"
                mensajeError="Es necesario ingresar un nombre"
                disabled
                :error="erroresValidacion && !validacionNombre"
            />

            <Input
                v-model="boardgame.Publisher"
                titulo="Editor"
                class="mx-4"
                id="Publisher"
                placeholder="Ingrese el editor"
                :maxlength="60"
                mensajeError="Es necesario ingresar un editor"
                :error="erroresValidacion && !validacionNombre"
            />

            <div class="select">Categoría <strong>{{ selected }}</strong></div>
              <b-form-select 
              v-model="boardgame.Category" 
              :options="options" 
              class="select"
              mensajeError="Es necesario ingresar una categoría"
              :error="erroresValidacion && !validacionNombre">
              </b-form-select>

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
                pattern="[0-9]+"
                type="number"
                placeholder="Ingrese el año de lanzamiento"
                :maxlength="4"
            />

            <b-button type="submit" variant="primary" class="m-4">Guardar</b-button>
        <hr>
        </form>
  </div>
</template>

<script>
import Vue from "vue";
import Input from '../components/Input.vue'
import { mapActions } from "vuex";

export default {
  name: "Editar",
  components: { Input },
  data() {
    return {
      boardgame: {},
      selected: null,
        options: [
          { value: null, text: 'Seleccionar categoría' },
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
    validacionNombre() {
      return (
        this.boardgame.Name !== undefined && this.boardgame.Name.trim() !== ""
      );
    },
  },
  methods: {
    ...mapActions(["editBoardGame", "getBoardGame"]),
    guardarBoardGame() {
      if (this.validacionNombre) {
        this.erroresValidacion = false;
        console.log("Si puedo guardar");
        this.editBoardGame({
          id: this.$route.params.id,
          params: this.boardgame,
          onComplete: (response) => {
            console.log(response);
            this.$notify({
              title: response.data.mensaje,
              type: "success",
            });
            this.$router.push({
              name: "Home",
            });
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
  },
  mounted() {
    this.getBoardGame({
      id: this.$route.params.id,
      onComplete: (response) => {
        Vue.set(this, "boardgame", response.data.result);
      },
    });
  },
};
</script>

<style>

.select{
  margin-left: 25px;
  width: 300px;
  height: 35px;
  border-radius: 3px;
  border-color: gray;
}

</style>