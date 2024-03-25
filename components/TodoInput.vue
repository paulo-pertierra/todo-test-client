<template>
  <v-text-field
    v-model="newTodoItem"
    label="Add new todo item" 
    variant="solo-filled"
    append-inner-icon="mdi-plus"
    @keyup.prevent.enter="createTask"
    @click:append-inner="createTask"
    :loading="isLoading"
  />
</template>

<script lang="ts" setup>
import { useTasksStore } from "@/store/tasks.store";

const tasksStore = useTasksStore();

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

<style>

</style>