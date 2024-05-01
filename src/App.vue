<script setup>
import {computed} from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { useNamesStore } from './stores/names.store';
const namesStore = useNamesStore();
const namesCount = computed(() => namesStore.names.length);
const forLaterCount = computed(() => namesStore.forLaterNames.length);
const discardedCount = computed(() => namesStore.discardedNames.length);
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home <sup>{{ namesCount }}</sup></RouterLink>
        <RouterLink to="/for-later">Reservados para después <sup>{{ forLaterCount }}</sup></RouterLink>
        <RouterLink to="/discarded">Descartados <sup>{{ discardedCount }}</sup></RouterLink>
      </nav>
    </div>
  </header>
  <Suspense>
    <template #default>
      <RouterView />
    </template>
  </Suspense>
</template>

<style scoped>
  header {
    display: flex;
    place-items: center;
    line-height: 1.5;
    width: 100%;
    max-height: 100svh;
  }
  header div {
    width: 100%;
  }

  nav {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-block-start: .5rem;
    margin-block-end: 1.5rem;
    width: 100%;
    font-size: 12px;
    text-align: center;
  }

  nav a.router-link-exact-active {
    color: var(--color-text);
  }

  nav a.router-link-exact-active:hover {
    background-color: transparent;
  }

  nav a {
    display: inline-block;
    font-size: .85rem;
  }

  nav a:first-of-type {
    border: 0;
  }

  
</style>
