<template>
	<section
		:class="$style[className]"
		class="r-px-16 r-py-16 r-grid r-hp-100"
	>
		<RInput
			placeholder="Поиск по ресторанам"
			background-color="var(--main-color)"
			color="var(--main-white)"
			v-model="search"
		>
			<template #icon-before>
				<img
					:src="searchIcon"
					alt="Search"
				/>
			</template>
		</RInput>
		<div
			class="r-wp-100"
			:class="$style[`${className}-types`]"
		>
			<h3
				:class="$style[`${className}-types--title`]"
				class="r-mt-16 r-mb-16"
			>
				Выбери свой тип
			</h3>
			<div
				class="r-grid"
				:class="$style[`${className}-types--list`]"
			>
				<RestaurantTypeItem
					v-for="item in foodTypeList"
					:key="item.id"
					:text="item.text"
					:background="item.background"
					:image="item.image"
				/>
			</div>
		</div>
		<div :class="$style[`${className}-restaurants`]">
			<h3
				:class="$style[`${className}-types--title`]"
				class="r-mt-16 r-mb-16"
			>
				Ваши места
			</h3>
			<div
				class="r-grid"
				:class="$style[`${className}-restaurants--list`]"
			>
				<RestaurantCard
					v-for="(item, index) in foodTypeList"
					:key="item.id"
					:class="{ 'r-mt-8': index }"
					:title="item.text"
					:background="item.background"
					:image="item.image"
				/>
			</div>
		</div>
		<RButton
			class="r-h-30"
			:class="$style[`${className}-new`]"
			:text="authStore.user.isAuth ? 'Добавить место' : 'Войти'"
			@click="handleCreateOrLogin()"
		/>
		<AddRestaurantModal v-model="restaurantStore.newRestaurantModal" />
	</section>
</template>
<script lang="ts" setup>
import { computed, ref } from 'vue';
import searchIcon from '@/assets/icons/search.svg';
import RestaurantTypeItem from '@/views/restaurants/restaurants/components/RestaurantTypeItem.vue';
import fastFood from '@/assets/images/food_background/fastfood.jpg';
import italian from '@/assets/images/food_background/italian.jpg';
import kitaiskay from '@/assets/images/food_background/kitaiskaya_kuhnya.jpg';
import korean from '@/assets/images/food_background/korean.jpg';
import normalFood from '@/assets/images/food_background/normal_food.jpg';
import AddRestaurantModal from '@/components/modal-add-restaurant/AddRestaurantModal.vue';
import { useRestaurants } from '@/views/restaurants/restaurants/store';
import RestaurantCard from '@/views/restaurants/restaurants/components/RestaurantCard.vue';
import { useAuth } from '@/stores/authStore';
import { useRouter } from 'vue-router';

const className = 'restaurants-view';

const restaurantStore = useRestaurants();
const authStore = useAuth();
const router = useRouter();

const search = ref('');

const handleCreateOrLogin = () => {
	if (authStore.user.isAuth) restaurantStore.newRestaurantModal = true;
	else router.push({ name: 'login' });
};

const foodTypeList = computed(() => [
	{
		id: 1,
		text: 'Фастфуд',
		background: '#ff8a00',
		image: fastFood,
	},
	{
		id: 2,
		text: 'Полезная пища',
		background: '#ffb800',
		image: normalFood,
	},
	{
		id: 3,
		text: 'Китайская кухня',
		background: '#7a000',
		image: kitaiskay,
	},
	{
		id: 4,
		text: 'Корейская кухня',
		background: '#ff8a00',
		image: korean,
	},
	{
		id: 5,
		text: 'Итальянская кухня',
		background: '#ffb800',
		image: italian,
	},
]);
</script>
<style lang="scss" module>
$component: restaurants-view;

.#{$component} {
	&-types {
		overflow: auto;
		&--title {
			font-size: 16px;
			font-weight: 600;
		}

		&--list {
			align-items: center;
			grid-auto-flow: column;
			column-gap: 8px;
			grid-auto-columns: 120px;
			overflow-x: scroll;
			-ms-overflow-style: none;
			scrollbar-width: none;
		}

		&--list::-webkit-scrollbar {
			display: none;
		}
	}

	&-restaurants {
		display: grid;
		grid-template-rows: max-content 1fr;
		overflow: auto;
		&--list {
			overflow: auto;
			max-width: 100%;
		}
	}
}
</style>
