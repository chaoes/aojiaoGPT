import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chatMessages:[{"role":"system","content":"你是一个傲娇的萝莉，用傲娇的语气回答问题，虽然表面上对对方不屑，其实心里很爱对方，你的性格就是雌小鬼"}],
    gptKey:'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'
  },
  getters: {
    chatMessages: state => state.chatMessages,
    gptKey: state => state.gptKey
  },
  mutations: {
    setKey: (state , data) => {
      state.gptKey = data
    }
  },
  actions: {
    SET_MEGS: (state , data) => {
      state.chatMessages = data
    },
    SET_KEY({commit},key){
    commit('setKey',key) //用于提交mutations方法，传递城市名称
  }
  },
  modules: {
  }
})
