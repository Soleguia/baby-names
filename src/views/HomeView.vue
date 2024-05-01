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

const handleForLaterName = (forLaterName) => {
	// Se actualiza el listado de nombres
	names.value = names.value.filter(name => name !== forLaterName);
	// Actualiza store
	namesStore.updateNames(names.value);

	// Guarda el nombre en "descartados"
	if(!namesStore.forLaterNames.includes(forLaterName)){
		namesStore.addForLaterName(forLaterName);
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
		<div class="actions">
			<h2>Reservar para pensarlo después</h2>
			<div class="chooser">

				<div class="btn-name btn-name--forlater name--1" @click="handleForLaterName(name1)">
					{{name1}}
				</div>
				<div class="btn-name btn-name--forlater name--2" @click="handleForLaterName(name2)">
					{{name2}}
				</div>
			</div>
		</div>
	</main>
</template>

<style>
.actions {
	margin-block-start: 3rem;
}
.actions .chooser {
	gap: 2rem;
	margin-block-start: 1rem
}
.btn-name--forlater {
	padding: .4rem 1rem;
	color: #333;
	font-size: 1.5rem;
	background-color: lightblue;
	border: 4px solid lightblue;
	border-radius: .7rem;
}
</style>
