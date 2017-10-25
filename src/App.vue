<template>
  <div id="app">
    <div class="header">
      <img src="./assets/logo.png">
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
 @import "./sass/main.scss";
</style>
