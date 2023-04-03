<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import Layout from './components/Layout.vue'

export default {
  name: 'App',
  components: {
    Layout
  }
}
</script>

<style>
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  header {
    background: dimgrey;
    width: auto;
    height: 80px;
  }
</style>
