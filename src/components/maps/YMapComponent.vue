<template>
	<div
		:class="$style[className]"
		class="r-h-300 r-w-300"
		ref="map"
	></div>
</template>

<script lang="ts" setup>
import { YMap } from '@yandex/ymaps3-types';
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';

const componentName = 'YMapComponent';
const className = 'y-map-component';

const APIKEY = '41c61946-3a38-4b32-9810-a2f061c4f35e';
const map = ref<YMap | null>(null);

async function initMap() {
	await ymaps3.ready;

	map.value = new ymaps3.YMap(map.value as unknown as HTMLDivElement, {
		location: {
			center: [37.588144, 55.733842],
			zoom: 10,
		},
	});

	//@ts-ignore
	const layer = new ymaps3.YMapDefaultSchemeLayer();
	map.value.addChild(layer);
}

onBeforeMount(() => {
	const yMapScript = document.createElement('script');
	yMapScript.setAttribute('src', `https://api-maps.yandex.ru/v3/?apikey=${APIKEY}&lang=ru_RU`);
	yMapScript.setAttribute('type', 'text/javascript');
	yMapScript.setAttribute('id', 'yMap');
	console.log(document.head);
	yMapScript.onload = () => {
		initMap();
	};
	document.head.appendChild(yMapScript);
});

onBeforeUnmount(() => {
	const mapScript = Array.from(document.scripts).find((script) => {
		return script.id === 'yMap';
	});

	if (mapScript) {
		mapScript.remove();
	}
});
</script>

<style lang="scss" module>
$component: 'y-map-component';
.#{$component} {
}
</style>
