<template>
  <v-card class="pa-2 ma-2">
    <v-list v-if="tasks">
      <v-list-subheader>Your Tasks</v-list-subheader>
      <TodoItem v-for="task in tasks" :task="task!" />
    </v-list>
  </v-card>
  <div class="bottom pa-6 ma-2">
    <TodoInput />
  </div>
</template>

<script lang="ts" setup>
import { useTasksStore } from "@/store/tasks.store";
const tasksStore = useTasksStore();
const { tasks } = storeToRefs(tasksStore);
</script>

<style scoped>
.bottom {
  margin: 10px 0px 10px 0px;
  position: sticky;
  width: inherit;
  bottom: 0;
}
</style>