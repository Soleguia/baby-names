<script setup>
import { ref, watch } from 'vue';

import { useNamesStore } from '@/stores/names.store';
const namesStore = useNamesStore();

const discardedNames = ref(namesStore.discardedNames);

watch(
  () => namesStore.discardedNames,
  () => {
    discardedNames.value = namesStore.discardedNames;
  }
);

const handleRecoverName = (name) => {
  namesStore.recoverName(name);
};

const handleReset = () => {
  namesStore.updateNames([...namesStore.names, ...discardedNames.value]);
  discardedNames.value = [];
  namesStore.updateDiscardedNames([]);
}
</script>

<template>
  <div class="about">
    <h1 class="full-width">Nombres descartados</h1>
    <h2>Toca alguno para recuperarlo</h2>
    <div>

      <button @click="handleReset()">Recuperar todos</button>
    </div>

    <div class="discarded-names full-width">
      <article 
        v-for="name in discardedNames" 
        class="name" 
        :key="name"
        @click="handleRecoverName(name)"
      >
        {{ name }}
      </article>
    </div>
  </div>
</template>

<style>
  .about {
    display: grid;
    grid-template-rows: repeat(3, min-content);
    grid-template-columns: 1fr min-content;
    align-items: flex-start;
    gap: 1rem;
    width: 100%;
  }
  .full-width {
    grid-column: 1 / 3;
  }
  .discarded-names {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: .3rem;
    margin-block-start: 1rem;
    width: 100%;
  }
  .discarded-names .name {
    display: flex;
    padding: 1rem;
    font-size: 1.4rem;
    text-align: center;
    color: white;
    background-color: hsl(193, 7%, 39%);
    border: 1px solid hsl(240, 1%, 14%);
    border-radius: 1rem;

  }
</style>
