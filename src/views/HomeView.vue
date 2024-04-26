<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useNamesStore } from '@/stores/names.store';
const namesStore = useNamesStore();

const names = ref([]);

names.value = await namesStore.getNames();

watch(
	() => namesStore.names,
	() => {
		names.value = namesStore.names;
	}
)
const name1 = ref('');
const name2 = ref('');

onMounted(() => {  
	setNamesToChoose();
});

const setNamesToChoose = () => {
	name1.value = names.value[0];
	name2.value = names.value[1];
}

const handleRemoveName = (removeName) => {
	// Se actualiza el listado de nombres
	names.value = names.value.filter(name => name !== removeName);
	// Actualiza store
	namesStore.updateNames(names.value);

	// Guarda el nombre en "descartados"
	if(!namesStore.discardedNames.includes(removeName)){
		namesStore.addDiscardedName(removeName);
	}

	// Si quedan nombres
	if( names.value.length > 1 ) {
		// Extrae un nuevo nombre
		setNamesToChoose();
	} else {
		name1 = names.value[0]
	}
}

</script>

<template>
	<main>

		<div class="actions">
			
		</div>

		<template v-if="names.length > 1">
			<h1>Toca un nombre para descartarlo</h1>
			<div class="chooser">
				<div class="btn-name name--1" @click="handleRemoveName(name1)">
					{{name1}}
				</div>
				<div class="btn-name name--2" @click="handleRemoveName(name2)">
					{{name2}}
				</div>
			</div>
		</template>
		<template v-else>
			<div class="the-last-name">
				<h1>Y el último nombre que queda es... </h1>
				<h2 class="choosen">{{ name1 }}</h2>

			</div>
		</template>
	</main>
</template>

<style>
</style>
