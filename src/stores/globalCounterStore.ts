import { defineStore } from 'pinia'

export const useGlobalCounterStore = defineStore('globalCounter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count += 1
    },
  },
})
