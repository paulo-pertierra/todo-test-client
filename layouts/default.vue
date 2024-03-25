<template>
  <div class="app-container">
    <div class="app">
      <v-app>
        <v-toolbar title="ToDo App Mini">
        <v-spacer></v-spacer>

        <v-btn icon>
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar>
        <slot />
      </v-app>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.app-container {
  background-color: black;
}

.app {
  margin: auto;
  max-width: 768px;
}
</style>