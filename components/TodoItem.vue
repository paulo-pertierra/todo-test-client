<template>
  <v-list-item>
    <v-form v-if="isEditingName" ref="editTodoForm" @submit.prevent="updateName">
      <v-text-field
      append-inner-icon="mdi-undo"
      v-model="newName"
      @click:append-inner="isEditingName = false"
      :rules="todoInputRules"
      @keyup.prevent.enter="$refs.editTodoForm!.$el.requestSubmit()"
      validate-on="submit"
      density="compact"
      variant="underlined"
    ></v-text-field>
    </v-form>
    <v-list-item-title v-else v-text="task.todo"></v-list-item-title>
    <template v-slot:prepend>
      <v-icon v-if="task.done" @click="unsetDone" icon="mdi-check-circle" />
      <v-icon v-else @click="setDone" icon="mdi-check-circle-outline" />
    </template>
    <template v-slot:append>
      <v-btn icon variant="text">
        <v-icon icon="mdi-dots-vertical"></v-icon>
        <v-menu activator="parent" location="bottom end" transition="fade-transition">
          <v-list density="compact" min-width="250" rounded="lg" slim>
            <v-list-item @click="isEditingName = true" prepend-icon="mdi-pen" title="Edit" link />
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

const props = defineProps<{
  task: Task
}>()

const deleteTask = async () => {
  await useAsyncGql({
    operation: "deleteTask",
    variables: { id: props.task.id }
  });
  tasksStore.reload();
}

const setDone = async () => {
  await useAsyncGql({
    operation: "updateTask",
    variables: {
      id: props.task.id,
      todo: props.task.todo,
      done: true
    }
  })
  tasksStore.reload();
}

const unsetDone = async () => {
  await useAsyncGql({
    operation: "updateTask",
    variables: {
      id: props.task.id,
      todo: props.task.todo,
      done: false
    }
  })
  tasksStore.reload();
}

const isEditingName = ref(false);
const newName = ref(props.task.todo);
const updateName = async () => {
  const result = await useAsyncGql({
    operation: "updateTask",
    variables: {
      id: props.task.id,
      todo: newName.value,
      done: props.task.done
    }
  })
  if (result.error.value) return;
  
  isEditingName.value = false
  tasksStore.reload();
}

const todoInputRules = [
  (v: string) => !!v || 'Name is required',
]
</script>