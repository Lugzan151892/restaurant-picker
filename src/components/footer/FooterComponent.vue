<template>
	<div
		class="r-wp-100 r-h-80 r-px-40 r-py-15"
		:class="$style[className]"
	>
		<div
			class="r-grid"
			:class="$style[`${className}-wrapper`]"
		>
			<FooterMenuItem
				v-for="item in footerMenuList"
				:key="item.id"
				:text="item.text"
				:image="item.icon"
			/>
		</div>
	</div>
</template>
<script lang="ts" setup>
import FooterMenuItem from '@/components/footer/components/FooterMenuItem.vue';
import home from '@/assets/icons/home.svg';
import search from '@/assets/icons/search.svg';
import ticket from '@/assets/icons/ticket.svg';
import noImage from '@/assets/icons/no-image.svg';

const className = 'footer-component';

const footerMenuList = [
	{
		id: 1,
		text: 'Домой',
		icon: home,
	},
	{
		id: 2,
		text: 'Рестораны',
		icon: ticket,
	},
	{
		id: 3,
		text: 'Поиск',
		icon: search,
	},
	{
		id: 4,
		text: 'Профиль',
		icon: noImage,
	},
];
</script>
<style lang="scss" module>
$component: 'footer-component';

.#{$component} {
	border-radius: 30px 30px 0 0;
	background-color: var(--main-color);

	&-wrapper {
		align-items: center;
		grid-auto-flow: column;
	}
}
</style>
