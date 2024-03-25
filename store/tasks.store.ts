import { defineStore } from 'pinia'

export const useTasksStore = defineStore("tasks", () => {
  const { data } = useAsyncGql({
    operation: "tasks"
  });

  function reload() {
    data.value = useAsyncGql({
      operation: "tasks"
    }).data.value
  }
  
  const tasks = computed(() => data.value.tasks);

  return { tasks, reload };
})
