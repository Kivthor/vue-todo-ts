<script setup lang="ts">
interface Props {
  name: string
  placeholder?: string
  maxlength?: number
  rows?: number
  modelValue: string
}

withDefaults(defineProps<Props>(), {
  placeholder: 'default',
})

const emit = defineEmits(['update:model-value'])

const onInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit('update:model-value', target.value)
}
</script>

<template>
  <textarea
    :name="name"
    :placeholder="placeholder"
    :rows="rows"
    :maxlength="maxlength"
    :value="modelValue"
    class="todoItemTextInput"
    @input="onInput"
  />
</template>

<style scoped>
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
</style>
