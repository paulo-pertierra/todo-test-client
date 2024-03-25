<template>
  <v-list-item>
    <v-list-item-title v-if="true" v-text="task.todo"></v-list-item-title>
    <v-text-field 
      v-else
      density="compact"
      variant="underlined"
    ></v-text-field>
    <template v-slot:prepend>
      <!-- <v-icon v-if="task.done" @click="unsetDone" icon="mdi-check-circle" />
      <v-icon v-else @click="setDone" icon="mdi-check-circle-outline" /> -->
    </template>
    <template v-slot:append>
      <v-btn icon variant="text">
        <v-icon icon="mdi-dots-vertical"></v-icon>
        <v-menu activator="parent" location="bottom end" transition="fade-transition">
          <v-list density="compact" min-width="250" rounded="lg" slim>
            <v-list-item prepend-icon="mdi-pen" title="Edit" link />
            <v-list-item @click="deleteTask" prepend-icon="mdi-trash-can" title="Delete" link />
          </v-list>
        </v-menu>
      </v-btn>
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
import type { Task } from '~/types/task.type';
import { useTasksStore } from '~/store/tasks.store';
const tasksStore = useTasksStore();

const deleteTask = async () => {
  await useAsyncGql({
    operation: "deleteTask",
    variables: { id: props.task.id }
  });
  tasksStore.reload();
}

const props = defineProps<{
  task: Task
}>()
</script>