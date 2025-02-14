import { defineStore } from 'pinia'
import { ref } from 'vue'

const localTaskCounter: string | null = localStorage.getItem('taskCounter')

export const useTaskCounterStore = defineStore('taskCounter', () => {
  const taskCount = ref(0)
  taskCount.value = localTaskCounter !== null ? +JSON.parse(localTaskCounter) : 0
  const addTask = () => {
    taskCount.value++
    localStorage.setItem('taskCounter', JSON.stringify(taskCount.value))
  }
  const deleteTask = () => {
    taskCount.value--
    localStorage.setItem('taskCounter', JSON.stringify(taskCount.value))
  }
  const clearTasks = () => {
    taskCount.value = 0
    localStorage.removeItem('taskCounter')
  }
  return {
    taskCount,
    addTask,
    deleteTask,
    clearTasks,
  }
})
