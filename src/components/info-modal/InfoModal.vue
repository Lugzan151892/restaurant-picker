<template>
	<RModal
		v-model="mainStore.mainModal"
		hide-header
	>
		<div
			class="r-px-16"
			:class="$style[className]"
		>
			<img
				:class="$style[`${className}-image`]"
				:src="icons[mainStore.mainModalSettings.type]"
				:alt="mainStore.mainModalSettings.type"
			/>
			<p>{{ mainStore.mainModalSettings.text }}</p>
		</div>
		<template #footer>
			<div class="r-wp-100 r-grid r-p-16">
				<RButton
					class="r-h-30"
					:text="mainStore.mainModalSettings.buttonText"
					@click="closeModal"
				/>
			</div>
		</template>
	</RModal>
</template>

<script lang="ts" setup>
import success from '@/assets/icons/success.svg';
import warning from '@/assets/icons/warning.svg';
import error from '@/assets/icons/error.svg';
import { useMain } from '@/stores/mainStore';
import { useRouter } from 'vue-router';

const className = 'info-modal';

const icons: { [key: string]: any } = {
	success,
	error,
	warning,
};

const router = useRouter();

const mainStore = useMain();

const closeModal = () => {
	mainStore.mainModal = false;
	if (mainStore.mainModalSettings.redirect) {
		router.push(mainStore.mainModalSettings.redirect);
	}
	mainStore.clearData();
};
</script>

<style lang="scss" module>
$component: 'info-modal';
.#{$component} {
	text-align: center;
	&-image {
		height: 50px;
		width: 50px;
		margin-bottom: 30px;
	}
}
</style>
