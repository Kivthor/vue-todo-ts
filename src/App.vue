<script setup lang="ts">
import UiButton from './components/UiButton.vue'
import TodoItem from './components/TodoItem.vue'
import { useTaskCounterStore } from './stores/taskCounterStore.ts'
import { useTaskListStore } from '@/stores/taskListStore.ts'
import { ref } from 'vue'

const root = document.documentElement
const taskListStore = useTaskListStore()
const taskCounterStore = useTaskCounterStore()
const hueNumber = ref(210)
const colorPickerVisible = ref(false)

const addTask = () => {
  taskListStore.addTask()
  taskCounterStore.addTask()
}

const clearTaskList = () => {
  taskListStore.clearTaskList()
  taskCounterStore.clearTasks()
}

const showColorPicker = () => {
  colorPickerVisible.value = !colorPickerVisible.value
}

const changeColor = () => {
  root.style.setProperty('--hue', hueNumber.value.toString())
}
</script>

<template>
  <div class="main-container">
    <div class="title-bar-container">
      <div class="title-container">
        <div v-if="taskCounterStore.taskCount" class="counter-container">
          {{ taskCounterStore.taskCount }}
        </div>
        <h1 class="title">tasks</h1>
      </div>
      <div class="title-bar-buttons">
        <UiButton @action="addTask" button-type="TOPBUTTON">+</UiButton>
        <UiButton @action="showColorPicker" button-type="TOPBUTTON">color</UiButton>
        <UiButton v-if="taskCounterStore.taskCount" @action="clearTaskList" button-type="TOPBUTTON"
          >clear</UiButton
        >
      </div>
    </div>
    <div v-if="colorPickerVisible" class="title-bar-container">
      <input
        class="color-input"
        v-model="hueNumber"
        @input="changeColor"
        name="color-picker"
        type="range"
        min="0"
        max="360"
        step="1"
      />
      <span class="hue-number">{{ hueNumber }}</span>
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

.hue-number {
  font-weight: bold;
  color: var(--main-color-darker);
}
</style>
