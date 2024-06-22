<template>
	<div
		:class="$style[className]"
		:style="styles"
		class="r-pt-40 r-px-16"
	>
		<img
			class="r-pointer"
			src="@/assets/icons/arrow-left.svg"
			alt="Back"
			@click="opened = false"
		/>
		<div class="r-vh-30" />
		{{ authStore.user.userName || 'Не авторизован' }}
		<nav
			:class="$style[`${className}-navigation`]"
			class="r-mt-16"
		>
			<ul>
				<li
					:class="{ 'r-mt-30': index }"
					v-for="(item, index) in menuList"
					:key="item.id"
				>
					<MenuListItem
						:icon="item.icon"
						:text="item.text"
					/>
				</li>
			</ul>
		</nav>
	</div>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import MenuListItem from '@/components/menu/components/MenuListItem.vue';
import call from '@/assets/icons/call.svg';
import info from '@/assets/icons/info.svg';
import signOut from '@/assets/icons/sign-out.svg';
import noimage from '@/assets/icons/no-image.svg';
import { useAuth } from '@/stores/authStore';

const className = 'menu-view';

const opened = defineModel({ default: false });
const authStore = useAuth();

const styles = computed(() =>
	opened.value
		? {
				opacity: 1,
				left: 0,
			}
		: {},
);

const menuList = computed(() =>
	[
		{
			id: 1,
			text: 'Профиль',
			icon: noimage,
			show: true,
		},
		{
			id: 2,
			text: 'Контакты',
			icon: call,
			show: true,
		},
		{
			id: 3,
			text: 'О нас',
			icon: info,
			show: true,
		},
		{
			id: 4,
			text: 'Выйти',
			icon: signOut,
			show: true,
		},
	].filter((el) => el.show),
);
</script>
<style lang="scss" module>
$component: menu-view;
.#{$component} {
	position: absolute;
	width: 400px;
	height: 100vh;
	background-color: var(--main-white);
	top: 0;
	left: -400px;
	overflow: hidden;
	opacity: 0;
	transition: all 0.25s;
	-webkit-transition: all 0.25s;
	z-index: 10;

	&-navigation {
		& > ul {
			list-style: none;
			padding: 0;
		}
	}
}
</style>
