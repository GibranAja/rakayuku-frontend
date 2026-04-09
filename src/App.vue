<script setup lang="ts"></script>

<template>
  <RouterView />
</template>

<style scoped>
:root {
  --color-primary: #227d55;
  --color-bg-page: #f7f7f7;
  --color-bg-component: #ffffff;
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}

body {
  background-color: var(--color-bg-page, #f7f7f7);
  font-family: 'DM Sans', 'Alumni Sans', sans-serif;
  color: #333;
  line-height: 1.6;
}
</style>
