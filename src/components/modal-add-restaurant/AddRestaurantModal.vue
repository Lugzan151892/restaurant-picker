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
				<p class="r-mb-4">Название</p>
				<RInput class="r-mb-16" />
			</div>
			<div>
				<p class="r-mb-4">Описание</p>
				<RInput class="r-mb-16" />
			</div>
			<div>
				<p class="r-mb-4">Ссылка на карте</p>
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
	</RModal>
</template>

<script lang="ts" setup>

const componentName = 'AddRestaurantModal';
const className = 'add-restaurant-modal';

const opened = defineModel({ default: false });
</script>

<style lang="scss" module>
$component: 'add-restaurant-modal';
.#{$component} {
	min-width: 400px;
}
</style>
