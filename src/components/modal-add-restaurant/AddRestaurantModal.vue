<template>
	<RModal
		v-model="opened"
		title="Добавление нового места"
	>
		<div
			class="r-px-24 r-mt-32"
			:class="$style[className]"
		>
			<div>
				<p class="r-mb-4">Тип</p>
				<RInput class="r-mb-16" />
			</div>
			<div class="r-wp-100">
				<RButton
					class="r-wp-100"
					text="Указать на карте"
					@click="ymapsModal = true"
				/>
			</div>
			<div>
				<p class="r-mb-4">Название</p>
				<RInput class="r-mb-16" />
			</div>
			<div>
				<p class="r-mb-4">Комментарий</p>
				<RInput class="r-mb-16" />
			</div>
		</div>
		<template #footer>
			<div class="r-wp-100 r-grid r-p-16">
				<RButton
					class="r-h-30"
					text="Сохранить"
				/>
			</div>
		</template>
		<RModal
			v-model="ymapsModal"
			title="Добавление нового места"
		>
			<YMapComponent />
		</RModal>
	</RModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import YMapComponent from '../maps/YMapComponent.vue';

const className = 'add-restaurant-modal';

const opened = defineModel({ default: false });

const ymapsModal = ref(false);
</script>

<style lang="scss" module>
$component: 'add-restaurant-modal';
.#{$component} {
	min-width: 400px;
}
</style>
