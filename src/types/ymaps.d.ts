import type { LngLat } from '@yandex/ymaps3-types';

export interface YmapsResponseSearch {
	type: 'FeatureCollection';
	properties: {
		ResponseMetaData: {
			SearchRequest: {
				/** Строка запроса. */
				request: string;
				/** Максимальное количество возвращаемых результатов. */
				results: number;
				/** Количество пропускаемых результатов. */
				skip: number;
				/** Границы области, в которой предположительно находятся искомые объекты. */
				boundedBy: Array<LngLat>;
			};
			SearchResponse: {
				/** Количество найденных объектов. */
				found: number;
				Point: {
					/** Тип геометрии. */
					type: string;
					/** Координаты объекта. */
					coordinates: LngLat;
				};
				/** Границы области показа найденных объектов. Содержит координаты левого нижнего и правого верхнего углов области. Координаты указаны в последовательности «долгота, широта». */
				boundedBy: Array<LngLat>;
				/** Рекомендации по отображению результатов поиска. */
				display: 'single' | 'multiple';
			};
		};
	};
	features: [
		{
			type: 'Feature';
			properties: {
				GeocoderMetaData: {
					kind: 'house' | 'street' | 'metro' | 'district' | 'locality';
					/** Полный адрес объекта */
					text: string;
					/** Точность соответствия между номером найденного дома и номером дома из запроса */
					precision: 'other';
				};
				/** Текст, который рекомендуется указывать в качестве подзаголовка при отображении найденного объекта */
				description: 'Jumeira, Dubai, United Arab Emirates';
				/** Текст, который рекомендуется указывать в качестве заголовка при отображении найденного объекта. */
				name: 'Dubai Marina';
				/** Границы области, в которую входит организация. Содержит координаты левого нижнего и правого верхнего углов области. Координаты указаны в последовательности «долгота, широта». */
				boundedBy: Array<LngLat>;
			};
			geometry: {
				/** Тип геометрии. */
				type: 'Point';
				/** Координаты объекта */
				coordinates: LngLat;
			};
		},
	];
}

export as namespace YMAPS;
