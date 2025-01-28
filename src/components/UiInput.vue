<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: string
  name: string
  placeholder?: string
  maxlength?: number
  rows?: number
  modelValue: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'default',
})

const emit = defineEmits(['update:model-value'])

const isItNameInput = computed(() => props.name === 'name-input')
const isItTextInput = computed(() => props.name === 'text-input')
const isItDateInput = computed(() => props.name === 'date-input')

const tag = computed(() => (props.name === 'text-input' ? 'textarea' : 'input'))

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:model-value', target.value)
}
</script>

<template>
  <component
    :is="tag"
    :type="type"
    :name="name"
    :placeholder="placeholder"
    :rows="rows"
    :maxlength="maxlength"
    :value="modelValue"
    @input="onInput"
    :class="{
      todoItemNameInput: isItNameInput,
      todoItemTextInput: isItTextInput,
      todoItemDateInput: isItDateInput,
    }"
  />
</template>

<style scoped>
.todoItemNameInput {
  display: block;
  flex: 1;
  margin: 0;
  padding: 0;
  font-size: 1rem;
  font-family: 'Courier New', Courier, monospace;
  text-transform: capitalize;
  font-weight: bold;
  letter-spacing: normal;
  word-spacing: normal;
  background-color: var(--main-color);
  color: var(--main-color-text-mod);
  border: var(--border-sub-container);
  color-scheme: dark;
}

.todoItemTextInput {
  display: block;
  width: 100%;
  padding: 0;
  font-size: 1rem;
  letter-spacing: normal;
  word-spacing: normal;
  resize: none;
  background-color: var(--main-color);
  color: var(--main-color-text);
  color-scheme: dark;
  border: var(--border-sub-container);
}

.todoItemDateInput {
  padding: 0 0.5rem;
  text-transform: uppercase;
  font-family: monospace;
  background-color: var(--main-color-lighter);
  color: var(--main-color-text);
  color-scheme: dark;
  border: var(--border-button);
  border-radius: var(--main-radius);
  transition: 0.2s;
  &:hover {
    background-color: var(--main-color-darker);
    border-color: var(--main-color-darker);
  }
  &:active {
    background-color: var(--main-color-very-light);
    border-color: var(--main-color-very-light);
  }
}
</style>
