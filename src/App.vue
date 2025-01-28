<script setup lang="ts">
import UiButton from './components/UiButton.vue'
import TodoItem from './components/TodoItem.vue'

import { v4 as uuidv4 } from 'uuid'
import { reactive, ref } from 'vue'

// interface Task {
//   id: number | string
//   name: string
//   text: string
//   date: string
//   status: string
// }
// const task: Task = reactive({
//   id: 'id' + Math.floor(Math.random() * 10000),
//   name: '',
//   text: '',
//   date: '',
//   status: 'WAITING',
// })
//
// const addTask = () => taskList.value.push(task)

const taskList = ref([])

const addTask = () => {
  taskList.value.push({
    // id: uuidv4(),
    id: 'id' + Math.floor(Math.random() * 1000),
    name: '',
    text: '',
    date: '',
    status: 'WAITING',
  })
}

const deleteTask = (taskId: string) => {
  taskList.value = taskList.value.filter((task) => task.id !== taskId)
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
}

const clearTaskList = () => {
  taskList.value = []
}

const changeColor = () => {
  const root = document.documentElement
  root.style.setProperty('--hue', Math.floor(Math.random() * 360))
}
</script>

<template>
  <div class="main-container">
    <div class="title-bar-container">
      <h1>Todo List</h1>
      <div class="title-bar-buttons">
        <UiButton @action="addTask" button-type="TOPBUTTON">add</UiButton>
        <UiButton @action="clearTaskList" button-type="TOPBUTTON">clear</UiButton>
        <UiButton @action="changeColor" button-type="TOPBUTTON">color</UiButton>
      </div>
    </div>
    <div class="title-bar-container">{{ taskList }}</div>
    <div class="todo-items-container">
      <TodoItem
        v-for="task in taskList"
        :key="task.id"
        :todo-item="task"
        @delete-task="deleteTask"
        @mod-task="modTask"
      />
    </div>
  </div>
</template>

<style scoped>
.main-container {
  width: 100vw;
  min-width: 17rem;
  display: flex;
  flex-direction: column;
  border: var(--border-main-container);
}

.todo-items-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: start;
  gap: 1rem;
  padding: 1rem;
  border: var(--border-container);
}

.title-bar-container {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  padding: 1rem;
  border: var(--border-container);
  background-color: var(--main-color-very-light-mod);
}

h1 {
  font-family: monospace;
  font-weight: bold;
  color: var(--main-color-darker);
  border: var(--border-sub-container);
}

.title-bar-buttons {
  display: flex;
  gap: 1rem;
  border: var(--border-sub-container);
}
</style>
