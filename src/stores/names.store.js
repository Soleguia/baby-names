import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useNamesStore = defineStore('names', () => {
  const names = ref([]);

  const getNames = async () => {
    
    const localStorageNames = JSON.parse(localStorage.getItem('names'));
    
    let namesList = [];

    if (localStorageNames) {
      namesList = [...localStorageNames.names];
    } else {
      const response = await fetch('/names.json');
      const namesJson = await response.json();
    
      namesJson.map((name) => {
        if (!names.value.includes(name)){
          addName(name)
        }
      });
      namesList = names.value;
    }

    return namesList;
    
  }

  const updateNames = (newNames) => {
    names.value = newNames
  }
  
  const addName = (name) => {
    names.value.push(name)
  }

  const chosenNames = ref([]);
  const addChosenName = (name) => {
    chosenNames.value.push(name)
  }

  const discardedNames = ref([]);

  const updateDiscardedNames = (names) => {
    discardedNames.value = names
  }
  
  const addDiscardedName = (name) => {
    discardedNames.value.push(name)
  }

  const recoverName = (name) => {
    discardedNames.value = discardedNames.value.filter(discardedName => discardedName !== name);
    addName(name);
  }

  return { 
    names, 
    getNames, 
    updateNames, 
    addName, 
    chosenNames, 
    addChosenName, 
    discardedNames, 
    updateDiscardedNames,
    addDiscardedName, 
    recoverName 
  }
});
