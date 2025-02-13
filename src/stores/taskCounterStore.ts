import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskCounterStore = defineStore('taskCounter', () => {
  const taskCount = ref(0)
  const addTask = () => taskCount.value++
  const deleteTask = () => taskCount.value--
  const clearTasks = () => (taskCount.value = 0)
  return {
    taskCount,
    addTask,
    deleteTask,
    clearTasks,
  }
})
