<template>
  <v-card class="pa-2 ma-2">
    <v-list v-if="tasks">
      <v-list-subheader>Your Tasks</v-list-subheader>
      <TodoItem v-for="task in tasks" :task="task!" />
    </v-list>
  </v-card>
  <div class="bottom pa-6 ma-2">
    <!-- <v-form @submit="createTask"> -->
      <v-text-field
      v-model="newTodoItem"
      label="Add new todo item" 
      variant="solo-filled"
      append-inner-icon="mdi-plus"
      @keyup.prevent.enter="createTask"
      @click:append-inner="createTask"
      :loading="isLoading"
    />
    <!-- </v-form> -->
  </div>
</template>

<script lang="ts" setup>
import { useTasksStore } from "@/store/tasks.store";
const tasksStore = useTasksStore();
const { tasks } = storeToRefs(tasksStore);

const isLoading = ref(false);
const newTodoItem = ref("");
const createTask = async () => {
  if (isLoading.value) return;

  isLoading.value = true;

  const response = await useAsyncGql({
    operation: "createTask",
    variables: { todo: newTodoItem.value }
  })

  if (response.error.value) {
    alert(`Error: Invalid action. Please fix your input.`)
  }

  isLoading.value = false;

  newTodoItem.value = "";
  tasksStore.reload();
}
</script>

<style scoped>
.bottom {
  margin: 10px 0px 10px 0px;
  position: sticky;
  width: inherit;
  bottom: 0;
}
</style>