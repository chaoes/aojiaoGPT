<template>
  <div class="app-container">
    <el-header> 
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
        background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
        <el-menu-item index="1">chat</el-menu-item>
        <el-menu-item index="2">config</el-menu-item>
      </el-menu>
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
      activeIndex: '1',

    };
  },
  methods: {
    handleSelect(index) {
        var routeName='chat'
        if(index=='1') 
        routeName='chat'
        else if(index=='2') 
        routeName='config'
        this.$router.push({name:routeName})
      }
  }
}
</script>
<style lang="scss" scoped>
  .app-container {
    min-height:100%;
    width: 100%;
    overflow-x: hidden;
  }
  .el-menu-demo{
    width: 98%;
  }
</style>
