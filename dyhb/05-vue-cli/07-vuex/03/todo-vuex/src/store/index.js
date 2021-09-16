import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    todos: [
      {
        id: 1,
        text: "111",
        completed: true,
      },
      {
        id: 3,
        text: "222",
        completed: false,
      },
      {
        id: 4,
        text: "333",
        completed: true,
      },
    ],
    filter: "All",
  },
  
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
