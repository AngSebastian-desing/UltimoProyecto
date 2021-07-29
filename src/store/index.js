import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    boardgames:[],
    boardgame: {},
    loading:false
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
    }
  },
  modules: {
  }
})
