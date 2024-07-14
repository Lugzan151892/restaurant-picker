<template>
	<div :class="$style[className]">
		<RInput
			v-model="search"
			@change="getData($event)"
		/>
		<yandex-map
			v-model="map"
			:settings="{
				location: {
					center: [37.617644, 55.755819],
					zoom: 9,
				},
			}"
		>
			<yandex-map-default-scheme-layer />
			<yandex-map-default-features-layer />
			<yandex-map-default-marker
				v-if="marker"
				:settings="marker"
			>
				<div class="r-h-20 r-w-20">marker</div>
			</yandex-map-default-marker>
			<yandex-map-controls :settings="{ position: 'left' }">
				<yandex-map-geolocation-control />
			</yandex-map-controls>
			<yandex-map-listener
				:settings="{
					onClick: handleClick,
				}"
			/>
		</yandex-map>
	</div>
</template>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue';
import type { DomEventHandler, YMap, YMapMarkerProps } from '@yandex/ymaps3-types';
import {
	YandexMap,
	YandexMapControls,
	YandexMapDefaultFeaturesLayer,
	YandexMapDefaultSchemeLayer,
	YandexMapGeolocationControl,
	YandexMapListener,
	YandexMapDefaultMarker,
} from 'vue-yandex-maps';
import type { SearchResponse } from '@yandex/ymaps3-types/imperative/search';
import api from '@/services/api';

const className = 'y-map-component';
const map = shallowRef<null | YMap>(null);

const search = ref('');
const searchResponse = ref<null | SearchResponse>(null);

const marker = ref<null | YMapMarkerProps>(null);

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

const handleClick: DomEventHandler = async (obj, e) => {
	const { coordinates } = e;
	if (marker.value) {
		marker.value.coordinates = coordinates;
	} else {
		marker.value = { coordinates, onClick: () => (marker.value = null), draggable: true };
	}

	api.setPath('https://geocode-maps.yandex.ru/1.x/');

	const result = await api.get('', {
		apikey: '41c61946-3a38-4b32-9810-a2f061c4f35e',
		geocode: coordinates,
		format: 'json',
	});

	console.log(result);

	console.log(obj, 'obj');
	console.log(e, 'event');
};
</script>

<style lang="scss" module>
$component: 'y-map-component';

.#{$component} {
	width: 100%;
	height: calc(100vh - 100px);
}
</style>
