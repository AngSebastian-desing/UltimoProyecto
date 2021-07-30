<template>
    <div>
       
        <b-alert show variant="success">
        <router-link :to="`/visualizar/detalle/${ID}`">
        <h5>{{ Name }}</h5>
        <p>{{ Publisher }}</p>
        <span>{{ Year }}</span>  
        </router-link>
        <br>
        <hr>
        <b-button @click="favoritos(ID)" class="mx-1" pill variant="primary">Fav's</b-button>
        <b-button @click="desfavoritos(ID)" class="mx-1" pill variant="danger">NO Fav's</b-button>
        <b-button @click="editar(ID)" class="mx-1" variant="warning">Editar</b-button>
        <b-button @click="eliminar(ID)" variant="danger" class="mx-1">Eliminar</b-button>
        </b-alert>
        
    </div>
</template>

<script>
import {mapActions} from 'vuex'
export default {
  name: "Tarjeta",
  props: {
      ID: {
      type: Number,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Publisher: {
      type: String,
      required: true,
    },
    Year: {
      type: String,
      default: "",
    }
  },
    methods: {

        ...mapActions(["setFavorites", "list", "deleteBoardGame","deleteFavorites"]),
        editar(id) {
            console.log("editar", id);
            this.$router.push({
                name: "Editar",
                params: {
                    id: id
                }
                
            })
        },
        eliminar(idItem) {
            console.log("entro con el id", idItem)
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
    },
        favoritos(ID){
        this.setFavorites({
          params: {IdBoardgame:ID},
          onComplete: (response) => {
            console.log(response);
            this.$notify({
              title: response.data.mensaje,
              type: "success",
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

        },
        desfavoritos(ID){
                console.log("Eliminar id: ", ID);
                this.deleteFavorites({
                id: ID,
                onComplete: (response) => {
                    console.log(response);
                    this.$notify({
                    title: response.data.mensaje,
                    type: "success",
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

        }

    },
       mounted() {
    this.list();
  }
  

};
</script>

<style>



</style>