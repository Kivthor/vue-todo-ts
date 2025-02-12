<script setup lang="ts">
import { useGlobalCounter } from '@/stores/globalCounter.ts'
import { computed } from 'vue'

const globalCounter = useGlobalCounter()
const emit = defineEmits(['action'])
const props = defineProps({
  buttonType: String,
  // func: Function,
})
const isItDeleteButton = computed(() => props.buttonType === 'DELETE')
const isItTopButton = computed(() => props.buttonType === 'TOPBUTTON')
const onClick = () => {
  emit('action')
  globalCounter.increment()
}
</script>

<template>
  <button
    @click="onClick"
    type="button"
    class="buttons"
    :class="{
      deleteButton: isItDeleteButton,
      topButton: isItTopButton,
    }"
  >
    <slot />
  </button>
</template>

<style scoped>
.buttons {
  cursor: pointer;
  margin: 0;
  border-radius: var(--main-radius);
  font-size: 1rem;
  padding: 0.2rem 0.5rem;
  border: var(--border-button);
  background-color: var(--main-color-lighter);
  color: var(--main-color-text);
  transition: 0.1s;
  &:hover {
    background-color: var(--main-color-darker);
    border-color: var(--main-color-darker);
  }
  &:active {
    background-color: var(--main-color-very-light);
    border-color: var(--main-color-very-light);
    color: var(--main-color-darker);
  }
}

.deleteButton {
  border-radius: 50%;
}

.topButton {
  font-weight: bold;
  padding: 0.5rem 1rem;
  background-color: var(--main-color-text);
  color: var(--main-color-darker);
  box-shadow: var(--main-shadow);
  &:hover {
    background-color: var(--main-color);
    color: var(--main-color-text);
  }
  &:active {
    background-color: var(--main-color-text);
    color: var(--main-color-darker);
  }
}
</style>
