<template>
  <v-form ref="newTodoForm" @submit.prevent="createTask">
    <v-text-field
      v-model="newTodoItem"
      label="Add new todo item" 
      variant="solo-filled"
      validate-on="submit"
      append-inner-icon="mdi-plus"
      :rules="todoInputRules"
      @click:append-inner="$refs.newTodoForm!.$el.requestSubmit()"
      :loading="isLoading"
    />
  </v-form>
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

  isLoading.value = false;

  newTodoItem.value = "";
  tasksStore.reload();
}

const todoInputRules = [
  (v: string) => !!v || 'Name is required',
]
</script>

<style>

</style>