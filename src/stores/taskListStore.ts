import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Task {
  id: string
  name: string
  text: string
  date: string
  status: 'SAVED' | 'NOT-SAVED'
}

const localTaskList: string | null = localStorage.getItem('taskList')

export const useTaskListStore = defineStore('taskListStore', () => {
  const taskList = ref<Task[]>([])
  taskList.value = localTaskList !== null ? JSON.parse(localTaskList) : []

  const addTask = () => {
    taskList.value.push({
      id: 'id' + Math.floor(Math.random() * 1000),
      name: '',
      text: '',
      date: '',
      status: 'NOT-SAVED',
    })
    localStorage.setItem('taskList', JSON.stringify(taskList.value))
  }
  const deleteTask = (taskId: string) => {
    taskList.value = taskList.value.filter((task) => task.id !== taskId)
    localStorage.setItem('taskList', JSON.stringify(taskList.value))
    console.log(`DELETED TASK WITH ID === ${taskId}`)
  }
  const modTask = (
    taskId: string,
    taskName: string,
    taskText: string,
    taskDate: string,
    isSaved: boolean,
  ) => {
    for (const task of taskList.value) {
      if (task.id === taskId) {
        task.name = taskName
        task.text = taskText
        task.date = taskDate
        task.status = isSaved ? 'SAVED' : 'NOT-SAVED'
      }
    }
    localStorage.setItem('taskList', JSON.stringify(taskList.value))
  }
  const clearTaskList = () => {
    taskList.value = []
    localStorage.removeItem('taskList')
    console.log('CLEAR ALL TASKS')
  }
  return {
    taskList,
    addTask,
    deleteTask,
    modTask,
    clearTaskList,
  }
})
