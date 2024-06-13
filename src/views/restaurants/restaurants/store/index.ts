import { defineStore } from 'pinia';

export const useRestaurants = defineStore('useRestaurants', {
	state: () => ({
		newRestaurantModal: false,
	}),
});
