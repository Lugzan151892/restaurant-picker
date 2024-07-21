<template>
	<div :class="$style[className]">
		<RInputDatalist
			id="ymaps-search"
			:options="suggestedResults"
			@change="getData($event)"
		>
			<template #item="{ item }">
				<div class="r-flex r-flex-column">
					<span>
						{{ item.text }}
					</span>
					<span>
						{{ item.id }}
					</span>
				</div>
			</template>
		</RInputDatalist>
		<div
			ref="mapEl"
			class="r-w-300 r-h-300"
			id="map"
		/>
	</div>
</template>

<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount, ref } from 'vue';
import type { LngLat, YMap, YMapLocationRequest } from '@yandex/ymaps3-types';
import type { YMapDefaultMarker as IMarker } from '@yandex/ymaps3-types/packages/markers';
import RInputDatalist from '@/components/ui/RInputDatalist.vue';
import { YMAPS_API_KEY, YMAPS_SEARCH_KEY } from '@/utils/ymaps';
import api from '@/services/api';

const className = 'y-map-component';

const mapEl = ref<HTMLDivElement | null>(null);

const yMap = ref<YMap | null>(null);
const newmarker = ref<IMarker>();
const suggestedResults = ref<{ id: number; text: string; description: string }[]>([]);
const search = ref('');

const testOptions = [
	{
		id: 0,
		text: 'test1',
	},
	{
		id: 1,
		text: 'test2',
	},
];

const getObjects = async (request: LngLat | string) => {
	api.setPath('https://search-maps.yandex.ru/v1/');
	api.loadingOff();
	const result = await api.get<any, YMAPS.YmapsResponseSearch>('', {
		apikey: YMAPS_SEARCH_KEY,
		text: Array.isArray(request) ? 'Рестораны' : request,
		lang: 'ru_RU',
		type: 'biz',
		...(Array.isArray(request) ? { ll: request.toString() } : {}),
	});

	console.log(result);

	suggestedResults.value = result.features.map((place, index) => {
		return {
			id: index,
			text: place.properties.name,
			description: place.properties.description,
		};
	});
};

async function initMap(): Promise<void> {
	await ymaps3.ready;

	const { YMap, YMapDefaultSchemeLayer, YMapDefaultFeaturesLayer, YMapListener, YMapControls } =
		ymaps3;

	const { YMapDefaultMarker } = await ymaps3.import('@yandex/ymaps3-markers@0.0.1');

	const LOCATION: YMapLocationRequest = {
		center: [37.623082, 55.75254],
		zoom: 9,
	};

	if (!mapEl.value) return;

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
		getObjects(coordinates);
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

onBeforeMount(() => {
	const yMapScript = document.createElement('script');
	yMapScript.setAttribute(
		'src',
		`https://api-maps.yandex.ru/v3/?apikey=${YMAPS_API_KEY}&lang=ru_RU`,
	);
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

const getData = async (e: string) => {
	if (!e) {
		suggestedResults.value = [];
		return;
	}
	console.log(e);
	// api.setPath('https://suggest-maps.yandex.ru/v1/suggest');
	getObjects(e);
	// const result = await ymaps3.search({
	// 	text: search.value,
	// 	bounds: yMap.value?.bounds,
	// });
	// const result = await api.get('', {
	// 	apikey: geoApiKey,
	// 	text: search.value,
	// 	types: 'biz,geo',
	// 	attrs: 'uri',
	// });
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
