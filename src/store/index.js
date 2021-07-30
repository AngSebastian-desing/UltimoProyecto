import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boardgames:[],
    boardgame: {},
    loading:false,
    favorites:[],
  },
  mutations: {
    SET_BOARDGAMES(state, boardgames){
      state.boardgames= boardgames;
    },
    SET_LOADING(state, loading){
      state.loading=loading
    },
    SET_BOARDGAME(state, boardgame) {
      state.boardgame = boardgame;
    },
    SET_FAVORITES(state, favorites) {
      state.favorites = favorites;
    }

  },
  actions: {
    list({commit}){
      commit('SET_LOADING', true);
      axios.get('http://localhost:3000/boardgame')
      .then(res => commit('SET_BOARDGAMES', res.data))
      .finally(() =>  commit('SET_LOADING', false));
    },
    setBoardGame({commit}, {params, onComplete, onError}){
      axios.post('http://localhost:3000/boardgame', params)
      .then(onComplete)
      .catch(onError);
    },
    getBoardGame({commit}, {id, onComplete, onError}) {
      axios.get(`http://localhost:3000/boardgame/${id}`)
      .then(res => {
        commit('SET_BOARDGAME', res.data.result);
        onComplete(res);
      })
      .catch(onError);
    },
    editBoardGame({commit}, {id, params, onComplete, onError}){
      axios.put(`http://localhost:3000/boardgame/${id}`, params)
      .then(onComplete)
      .catch(onError)
    },
    deleteBoardGame({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/boardgame/${id}`)
      .then(onComplete)
      .catch(onError);
    },
    setFavorites({commit},{params, onComplete, onError}){
      axios.post('http://localhost:3000/favorites', params)
      .then(onComplete)
      .catch(onError);
    },
    listFavorites({commit}){
      commit('SET_FAVORITES', true);
      axios.get('http://localhost:3000/favorites')
      .then(res => commit('SET_FAVORITES', res.data))
      .finally(() =>  commit('SET_LOADING', false));
    },

    deleteFavorites({commit}, {id, onComplete, onError}){
      axios.delete(`http://localhost:3000/favorites/${id}`)
      .then(onComplete)
      .catch(onError);
    },
  },
  modules: {
  }
})
