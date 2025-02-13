<script setup lang="ts">
import UiButton from './components/UiButton.vue'
import TodoItem from './components/TodoItem.vue'
import { useGlobalCounterStore } from './stores/globalCounterStore.ts'
import { useTaskCounterStore } from './stores/taskCounterStore.ts'
import { useTaskListStore } from '@/stores/taskListStore.ts'
import { ref } from 'vue'

const taskListStore = useTaskListStore()
const globalCounterStore = useGlobalCounterStore()
const taskCounterStore = useTaskCounterStore()
const hueNumber = ref(210)

const addTask = () => {
  taskListStore.addTask()
  taskCounterStore.addTask()
}

const clearTaskList = () => {
  taskListStore.clearTaskList()
  taskCounterStore.clearTasks()
}

const changeColor = () => {
  const root = document.documentElement
  hueNumber.value = Math.floor(Math.random() * 360)
  root.style.setProperty('--hue', hueNumber.value.toString())
}
</script>

<template>
  <div class="main-container">
    <div class="title-bar-container">
      <div>total button clicks: {{ globalCounterStore.count }}</div>
      <div class="title-container">
        <div v-if="taskCounterStore.taskCount" class="counter-container">
          {{ taskCounterStore.taskCount }}
        </div>
        <h1 class="title">tasks</h1>
      </div>
      <div class="title-bar-buttons">
        <UiButton @action="addTask" button-type="TOPBUTTON">+</UiButton>
        <UiButton @action="changeColor" button-type="TOPBUTTON">HUE {{ hueNumber }}</UiButton>
        <UiButton v-if="taskCounterStore.taskCount" @action="clearTaskList" button-type="TOPBUTTON"
          >clear</UiButton
        >
      </div>
    </div>
    <div v-if="taskCounterStore.taskCount" class="title-bar-container">
      {{ taskListStore.taskList }}
    </div>
    <div class="todo-items-container">
      <TodoItem v-for="task in taskListStore.taskList" :key="task.id" :todo-item="task" />
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

.title-container {
  min-width: 8rem;
  display: flex;
  justify-content: space-evenly;
  border: var(--border-container);
}

.title,
.counter-container {
  font-size: 1.5rem;
  font-family: monospace;
  font-weight: bold;
  color: var(--main-color-darker);
  border: var(--border-sub-container);
}

.title-bar-buttons {
  min-width: 16.6rem;
  display: flex;
  gap: 1rem;
  border: var(--border-sub-container);
}
</style>
