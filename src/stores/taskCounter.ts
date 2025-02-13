import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTaskCounter = defineStore('taskCounter', () => {
  const taskCount = ref(0)
  const addTask = () => taskCount.value++
  const deleteTask = () => taskCount.value--
  const clearTask = () => (taskCount.value = 0)
  return {
    taskCount,
    addTask,
    deleteTask,
    clearTask,
  }
})
