import { ref, computed, provide, inject } from "vue";

const KEY = Symbol("busy");

export function createBusy() {
  const counter = ref(0);
  const busy = computed(() => counter.value > 0);

  async function run(fn) {
    counter.value++;
    try {
      return await fn();
    } finally {
      counter.value--;
    }
  }

  function start() {
    counter.value++;
  }

  function end() {
    if (counter.value > 0) counter.value--;
  }

  return { busy, counter, run, start, end };
}

export function provideBusy() {
  const state = createBusy();
  provide(KEY, state);
  return state;
}

export function useBusy() {
  return inject(KEY);
}
