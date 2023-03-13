<template>
  <div class="app-container">
    <div class="chat-container">
      <div class="wordslist" ref="wordslist">
        <div v-for="(item, indexc) in chatMessages" :key="indexc" class="words">
          <div class="mywords" v-if="item.role == 'user'">
            <div class="info">
              <div class="info-content">
                {{ item.content }}
              </div>
            </div>
          </div>
          <div class="urwords" v-if="item.role == 'assistant'">
            <div class="info">
              <div class="info-content">
                {{ item.content }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="inputs" ref="inputs">
        <el-button type="primary" round @click="send()" :disabled="gptKey==''&&canSend">
          发送
        </el-button>
        <el-input type="textarea" v-model="text" :placeholder="placeholder" id="input" :rows="5">

        </el-input>
      </div>
    </div>
  </div>
</template>

<script>
import { chat } from '@/api/openai.js'
import { mapGetters } from 'vuex'
export default {
  // 组件名称
  name: 'gpt-chat',
  // 组件参数 接收来自父组件的数据
  props: {},
  // 局部注册的组件
  components: {},
  // 组件状态值
  data() {
    return {
      inputsHeight: '',
      text:'',
      canSend : true
    }
  },
  // 计算属性
  computed: {
    ...mapGetters(['chatMessages']),
    ...mapGetters(['gptKey']),
    placeholder(){
      if(this.gptKey==''){
        return '请先配置key'
      }
      return '请输入内容';
    }
  },
  // 侦听器
  watch: {},
  // 组件方法
  methods: {
    send() {
      if(!this.canSend){
        return
      }
      if(this.text.trim()==''){
        this.$message.warning("请先输入内容")
        return
      }
      var newMsgs = this.chatMessages.push({"role":"user","content":this.text})
      this.$store.dispatch("SET_MEGS",newMsgs)
      this.text=''
      this.canSend = false
      //this.canSend = true //debug
      this.toEnd()
      console.log(this.chatMessages[0].content)
      chat().then(res => {
        console.log(res.data)
        this.$store.dispatch("SET_MEGS",this.chatMessages.push(res.data.choices[0].message))
        this.toEnd()
        this.canSend = true
      }).catch(err => {
        this.$message.error(err)
        this.canSend = true
      })
    },
    getInputsHeight() {
      this.inputsHeight = this.$refs.inputs.clientHeight;
      console.log("h=" + this.inputsHeight)
    },
    setWordsHeight() {
      console.log("n1=" + this.$refs.wordslist.offsetHeight)
      this.$refs.wordslist.style.height = document.documentElement.clientHeight-20-this.inputsHeight
      console.log("n2=" + this.$refs.wordslist.offsetHeight)
    },
    toEnd(){
      this.$nextTick(()=>{
        let middle = this.$refs.wordslist
        middle.scrollTop = middle.scrollHeight
      })
    }
  },
  // 以下是生命周期钩子   注：没用到的钩子请自行删除
  /**
  * 在实例初始化之后，组件属性计算之前，如data属性等
  */
  beforeCreate() {
  },
  /**
  * 组件实例创建完成，属性已绑定，但DOM还未生成，$ el属性还不存在
  */
  created() {
  },
  /**
  * 在挂载开始之前被调用：相关的 render 函数首次被调用。
  */
  beforeMount() {
  },
  /**
  * el 被新创建的 vm.$ el 替换，并挂载到实例上去之后调用该钩子。
  * 如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$ el 也在文档内。
  */
  mounted() {
    this.getInputsHeight()
    this.setWordsHeight()
    window.onresize = () => {
        this.getInputsHeight()
        this.setWordsHeight()
    }

  },
  /**
  * 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。
  * 你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。
  */
  beforeUpdate() {
  },
  /**
  * 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。
  * 当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。
  */
  updated() {
  },
  /**
  * keep-alive 组件激活时调用。 仅针对keep-alive 组件有效
  */
  activated() {
  },
  /**
  * keep-alive 组件停用时调用。 仅针对keep-alive 组件有效
  */
  deactivated() {
  },
  /**
  * 实例销毁之前调用。在这一步，实例仍然完全可用。
  */
  beforeDestroy() {
  },
  /**
  * Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，
  * 所有的事件监听器会被移除，所有的子实例也会被销毁。
  */
  destroyed() {
  }
}
</script> 


<style lang="scss" scoped>
.inputs {
  margin: 8px;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  left: 8px;
  right: 8px;
  bottom: 8px;
  float: right;
}

.wordslist {
  overflow-y: scroll;
  overflow-x: hidden;
  position: absolute;
  top: 60px;
  left: 8px;
  right: 8px;
  bottom: 176px;
}

.chat-container {
  width: 98%;
  padding: 20px;

  .urwords {
    display: flex;
    margin-bottom: 20px;

    .info {
      margin-left: 10px;

      .info-content {
        padding: 10px;
        font-size: 14px;
        background: #d3dc53;
        position: relative;
        margin-top: 8px;
      }

      .info-content::before {
        position: absolute;
        left: -8px;
        top: 8px;
        content: '';
        border-right: 10px solid #d3dc53;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
      }
    }
  }

  .mywords {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;

    .info {
      width: 90%;
      margin-left: 10px;
      text-align: right;

      .info-content {
        max-width: 70%;
        padding: 10px;
        font-size: 14px;
        float: right;
        margin-right: 10px;
        position: relative;
        margin-top: 8px;
        background: #A3C3F6;
        text-align: left;
      }

      .info-content::after {
        position: absolute;
        right: -8px;
        top: 8px;
        content: '';
        border-left: 10px solid #A3C3F6;
        border-top: 8px solid transparent;
        border-bottom: 8px solid transparent;
      }
    }
  }
}
</style>
