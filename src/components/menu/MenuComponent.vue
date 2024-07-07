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
		<p
			:class="$style[`${className}-user`]"
			class="r-mb-32"
		>
			{{ authStore.user.userName || 'Не авторизован' }}
		</p>
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
						@click="item.action"
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
import { useRouter } from 'vue-router';

const className = 'menu-view';

const opened = defineModel({ default: false });
const authStore = useAuth();
const router = useRouter();

const styles = computed(() =>
	opened.value
		? {
				opacity: 1,
				left: 0,
			}
		: {},
);

const goToLogin = () => {
	router.push('/login');
};

const menuList = computed(() =>
	[
		{
			id: 1,
			text: 'Профиль',
			icon: noimage,
			show: authStore.user.isAuth,
			action: () => {},
		},
		{
			id: 2,
			text: 'Сообщить об ошибке',
			icon: call,
			show: true,
			action: () => {
				opened.value = false;
				router.push('/issues');
			},
		},
		{
			id: 3,
			text: 'О нас',
			icon: info,
			show: true,
			action: () => {},
		},
		{
			id: 4,
			text: 'Выйти',
			icon: signOut,
			show: authStore.user.isAuth,
			action: async () => {
				await authStore.logout();
				goToLogin();
			},
		},
		{
			id: 4,
			text: 'Войти',
			icon: signOut,
			show: !authStore.user.isAuth,
			action: goToLogin,
		},
	].filter((el) => el.show),
);
</script>
<style lang="scss" module>
$component: menu-view;
.#{$component} {
	position: absolute;
	width: 100%;
	max-width: 400px;
	height: 100dvh;
	background-color: var(--main-white);
	top: 0;
	left: -400px;
	overflow: hidden;
	opacity: 0;
	transition: all 0.25s;
	-webkit-transition: all 0.25s;
	z-index: 10;

	&-user {
		font-size: 20px;
		text-align: center;
		color: var(--main-color);
		margin-top: 10%;
	}

	&-navigation {
		& > ul {
			list-style: none;
			padding: 0;
		}
	}
}
</style>
