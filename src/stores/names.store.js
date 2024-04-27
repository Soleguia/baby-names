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
      const files = [
        '/data/adorables.json',
        '/data/antiguos.json',
        '/data/bonitos.json',
        '/data/clasicos.json',
        '/data/dulces.json',
        '/data/lugares.json',
        '/data/mas.json',
        '/data/naturaleza.json',
        '/data/originales.json',
        '/data/palabras.json',
        '/data/tradicionales.json',
        '/data/names.json',
      ];
      
      for (const file of files) {
        const response = await fetch(file);
        const namesJson = await response.json();
        namesJson.map((name) => {
          if (!names.value.includes(name)){
            addName(name)
          }
        });
      }
      
      namesList = names.value;
    }

    return namesList.sort((_a, _b) => 0.5 - Math.random());
    
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
