<template>
  <div class="app-container">
    <el-header>
      <div class="mymenu">
        <div class="mybutton">
          
        </div>
        <el-button @click="handleSelect('chat')" class="mybutton" type="primary" name = 'chat' icon="el-icon-chat-round" round> 聊天 </el-button >
        <el-button @click="handleSelect('config')" class="mybutton" type="primary"  name = 'config' icon="el-icon-setting" round> 配置</el-button >
      </div>
    </el-header>
    <el-main>
      <keep-alive>
        <router-view />
      </keep-alive>
    </el-main>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      activeIndex: 'chat',
    };
  },
  methods: {
    handleSelect(routeName) {
      this.activeIndex = routeName
      this.$router.push({ name: this.activeIndex })
    }
  },
  created() {
    console.log("key="+this.$route.query.key)
    this.$store.dispatch("SET_KEY",this.$route.query.key)
  }
}
</script>
<style lang="scss" scoped>
.app-container {
  min-height: 100%;
  width: 100%;
  overflow-x: hidden;
}
.mymenu{
  display: flex;
  width: auto;
  height: 40px;
  background-color: aquamarine;
}
.mybutton{
  margin-left: auto;
}
.el-menu-demo {
  width: 98%;
}
</style>
