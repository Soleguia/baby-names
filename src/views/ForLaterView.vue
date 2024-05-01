<script setup>
import { ref, watch } from 'vue';

import { useNamesStore } from '@/stores/names.store';
const namesStore = useNamesStore();

const forLaterNames = ref(namesStore.forLaterNames);

watch(
  () => namesStore.forLaterNames,
  () => {
    forLaterNames.value = namesStore.forLaterNames;
  }
);

const handleReturnName = (name) => {
  namesStore.restoreName(name);
};

const handleReset = () => {
  namesStore.updateNames([...namesStore.names, ...forLaterNames.value, ...namesStore.discardedNames]);
  forLaterNames.value = [];
  namesStore.updateForLaterNames([]);
}
</script>

<template>
  <div class="about">
    <h1 class="full-width">Nombres reservados</h1>
    <h2>Toca alguno para devolverlo al listado inicial</h2>
    <div>

      <button @click="handleReset()">Recuperar todos</button>
    </div>

    <div class="forlater-names full-width">
      <article 
        v-for="name in forLaterNames" 
        class="name" 
        :key="name"
        @click="handleReturnName(name)"
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
  .forlater-names {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-wrap: wrap;
    gap: .3rem;
    margin-block-start: 1rem;
    width: 100%;
  }
  .forlater-names .name {
    display: flex;
    padding: .75rem 1.4rem;
    font-size: 1.4rem;
    text-align: center;
    color: #333;
    background-color: hsl(193, 96%, 80%);
    border: 1px solid hsl(240, 18%, 34%);
    border-radius: 1rem;
    cursor: pointer;

  }
</style>
