<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="less">
body{
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  min-width: 1200px;
  font-family: Arial,'Microsoft Yahei';
}
a{
  color: #000;
  text-decoration: none;
}
#app{

    .container{
        width: 1200px;
        margin: 0 auto;
        box-sizing: border-box;
    }
    .flex-box{
        display: flex;
    }
}
</style>
