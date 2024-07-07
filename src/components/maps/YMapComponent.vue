<template>
	<div :class="$style[className]">
		<RInput />
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
			<yandex-map-controls :settings="{ position: 'left' }">
				<yandex-map-geolocation-control />
			</yandex-map-controls>
		</yandex-map>
	</div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref, shallowRef } from 'vue';
import type { YMap } from '@yandex/ymaps3-types';
import {
	YandexMap,
	YandexMapControl,
	YandexMapControlButton,
	YandexMapControls,
	YandexMapDefaultFeaturesLayer,
	YandexMapDefaultSchemeLayer,
	YandexMapEntity,
	YandexMapGeolocationControl,
	YandexMapOpenMapsButton,
	YandexMapScaleControl,
	YandexMapZoomControl,
} from 'vue-yandex-maps';
import type { SearchResponse } from '@yandex/ymaps3-types/imperative/search';

const className = 'y-map-component';
const map = shallowRef<null | YMap>(null);

const search = ref('');
const searchResponse = shallowRef<null | SearchResponse>(null);
</script>

<style lang="scss" module>
$component: 'y-map-component';

.#{$component} {
	width: 100%;
	height: calc(100vh - 100px);
}
</style>
