<template>
	<div :class="$style[className]">
		<RInput
			v-model="search"
			@change="getData($event)"
		/>
		<div
			ref="mapEl"
			class="r-w-300 r-h-300"
			id="map"
		/>
	</div>
</template>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue';
import { type LngLat, type YMap, type YMapLocationRequest } from '@yandex/ymaps3-types';
import type { YMapDefaultMarker as IMarker } from '@yandex/ymaps3-types/packages/markers';

const mapEl = ref<HTMLDivElement | null>(null);

const yMap = ref<YMap | null>(null);
const newmarker = ref<IMarker>();

async function initMap(): Promise<void> {
	await ymaps3.ready;

	const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapListener, YMapControls } =
		ymaps3;

	const { YMapDefaultMarker } = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');

	const LOCATION: YMapLocationRequest = {
		center: [37.623082, 55.75254],
		zoom: 9,
	};

	yMap.value = new YMap(mapEl.value, { location: LOCATION, showScaleInCopyrights: true }, [
		new YMapDefaultSchemeLayer({}),
		new YMapDefaultFeaturesLayer({}),
	]);

	const controls = new YMapControls({ position: 'top left', orientation: 'vertical' });
	yMap.value.addChild(controls);

	const handleClick = (_: any, o: any) => {
		console.log(_, o);
		var coordinates = o.coordinates;

		if (newmarker.value) {
			newmarker.value.update({ coordinates });
		} else {
			newmarker.value = createPlacemark(coordinates);
			console.log(newmarker.value);
			yMap.value?.addChild(newmarker.value);
		}
	};

	const mapListener = new YMapListener({
		layer: 'any',
		onClick: handleClick,
	});

	function createPlacemark(coordinates: LngLat) {
		return new YMapDefaultMarker({
			coordinates,
			draggable: true,
			title: 'test',
		});
	}

	if (newmarker.value) {
		yMap.value?.addChild(newmarker.value);
	}

	yMap.value?.addChild(mapListener);
}

initMap();

const className = 'y-map-component';
const map = shallowRef<null | YMap>(null);

const search = ref('');

const getData = async (e: any) => {
	console.log(e);
	// api.setPath('https://suggest-maps.yandex.ru/v1/suggest');
	const result = await ymaps3.search({
		text: search.value,
		bounds: map.value?.bounds,
	});
	// const result = await api.get('', {
	// 	apikey: geoApiKey,
	// 	text: search.value,
	// 	types: 'biz,geo',
	// 	attrs: 'uri',
	// });
	console.log(result);
};
</script>

<style lang="scss" module>
$component: 'y-map-component';

.#{$component} {
	width: 100%;
	height: calc(100vh - 100px);
}
</style>
import type { YMapDefaultMarkerProps } from '@yandex/ymaps3-types/packages/markers';
