<template>
	<yandex-map
		v-model="map"
		:settings="{
			location: {
				center: [37.617644, 55.755819],
				zoom: 9,
			},
		}"
		width="100%"
		height="calc(80vh - 100px)"
	>
		<yandex-map-default-scheme-layer />
	</yandex-map>
</template>

<script lang="ts" setup>
import { shallowRef } from 'vue';
import type { YMap } from '@yandex/ymaps3-types';
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps';

const map = shallowRef<null | YMap>(null);
</script>

<style lang="scss" module>
$component: 'y-map-component';
</style>
