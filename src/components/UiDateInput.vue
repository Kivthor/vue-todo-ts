<script setup lang="ts">
defineProps<{
  type?: string
  name: string
  modelValue: string
}>()

const emit = defineEmits(['update:model-value'])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:model-value', target.value)
}
</script>

<template>
  <input :type="type" :name="name" :value="modelValue" class="todoItemDateInput" @input="onInput" />
</template>

<style scoped>
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
