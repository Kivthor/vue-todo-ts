<script setup lang="ts">
import UiButton from './UiButton.vue'
import UiInput from './UiInput.vue'
import UiTextArea from './UiTextArea.vue'
import UiDateInput from './UiDateInput.vue'
import { ref } from 'vue'

const emit = defineEmits(['delete-task', 'mod-task'])
const props = defineProps({
  todoItem: Object,
})

const taskId = ref(props.todoItem.id)
const taskName = ref('')
const taskText = ref('')
const taskDate = ref('')
const isSaved = ref(false)

const deleteTask = () => {
  emit('delete-task', taskId.value)
}

const modTask = () => {
  isSaved.value = !isSaved.value
  emit('mod-task', taskId.value, taskName.value, taskText.value, taskDate.value, isSaved.value)
}
</script>

<template>
  <div class="todo-item-container" :class="{ modColor: isSaved }">
    <div class="todo-item-top">
      <UiInput
        type="text"
        name="name-input"
        placeholder="Name..."
        :maxlength="20"
        :model-value="taskName"
        @update:model-value="taskName = $event"
        v-if="!isSaved"
      />
      <h2 class="todo-item-name" v-else>{{ taskName }}</h2>
      <UiButton @action="deleteTask" button-type="DELETE">x</UiButton>
    </div>
    <div class="todo-item-body">
      <UiTextArea
        name="text-input"
        placeholder="description..."
        :rows="10"
        :maxlength="200"
        :model-value="taskText"
        @update:model-value="taskText = $event"
        v-if="!isSaved"
      />
      <p class="todo-item-text" v-else>{{ taskText }}</p>
    </div>
    <div class="todo-item-footer">
      <UiDateInput
        type="date"
        name="date-input"
        :model-value="taskDate"
        @update:model-value="taskDate = $event"
        v-if="!isSaved"
      />
      <div class="todo-item-date" v-else>{{ taskDate }}</div>
      <UiButton v-if="isSaved" @action="modTask" button-type="EDIT">edit</UiButton>
      <UiButton v-if="!isSaved && taskText" @action="modTask" button-type="SAVE">save</UiButton>
    </div>
    <span>{{ taskId }}</span>
    <span>{{ todoItem }}</span>
  </div>
</template>

<style scoped>
.todo-item-container {
  min-width: 17rem;
  max-width: 18rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem;
  border-radius: var(--main-radius);
  background-color: var(--main-color);
  box-shadow: var(--main-shadow);
  border: var(--border-container);
}

.todo-item-top {
  display: flex;
  min-height: 1.7rem;
  align-items: center;
  gap: 0.5rem;
  border: var(--border-container);
}

.todo-item-name {
  display: flex;
  align-items: center;
  flex: 1;
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-family: 'Courier New', Courier, monospace;
  text-transform: capitalize;
  font-weight: bold;
  letter-spacing: normal;
  word-spacing: normal;
  background-color: inherit;
  color: inherit;
  border: var(--border-sub-container);
}

.todo-item-body {
  display: flex;
  border: var(--border-container);
}

.todo-item-text {
  word-break: break-word;
  white-space: pre-wrap;
  font-size: 1rem;
  letter-spacing: normal;
  word-spacing: normal;
  background-color: inherit;
  color: inherit;
  border: var(--border-sub-container);
}

.todo-item-footer {
  display: flex;
  min-height: 1.7rem;
  flex-flow: row nowrap;
  justify-content: space-between;
  gap: 0.5rem;
  border: var(--border-container);
}

.todo-item-date {
  display: flex;
  align-items: center;
  background-color: inherit;
  color: var(--main-color-very-light-mod);
  border: var(--border-button);
  transition: 0.1s;
}

.modColor {
  background-color: var(--main-color-mod);
  color: var(--main-color-text-mod);
  box-shadow: var(--main-shadow-mod);
  button {
    background-color: var(--main-color-lighter-mod);
    color: var(--main-color-text-mod);
    &:hover {
      background-color: var(--main-color-darker-mod);
      border-color: var(--main-color-darker-mod);
    }
    &:active {
      background-color: var(--main-color-very-light-mod);
      border-color: var(--main-color-very-light-mod);
      color: var(--main-color-darker-mod);
    }
  }
}
</style>
