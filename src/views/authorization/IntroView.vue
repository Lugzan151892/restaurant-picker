<template>
	<section>
		<img
			src="@/assets/images/intro.jpg"
			class="r-wp-100"
			:class="$style[`${className}-image`]"
		/>
		<div
			:class="$style[`${className}-wrapper`]"
			class="r-wp-60 r-m-auto r-px-40 r-mt-52 r-grid"
		>
			<h2 :class="$style[`${className}-wrapper--title`]">
				Подберите место для отдыха по Вашим критериям
			</h2>
			<p
				class="r-mt-16"
				:class="$style[`${className}-wrapper--description`]"
			>
				У Вас будет все, чтобы подобрать идеальное место для отдыха, ланча, ужина, свидания
				и др.
			</p>
			<RButton
				class="r-mt-44"
				text="Начать"
				@click="handleLogin()"
			/>
		</div>
	</section>
</template>
<script lang="ts" setup>
import RButton from '@/components/ui/RButton.vue';
import { useRouter } from 'vue-router';

const className = 'intro-view';

const router = useRouter();

const handleLogin = () => {
	router.push({ name: 'signup' });
};
</script>
<style lang="scss" module>
$component: 'intro-view';

.#{$component} {
	&-image {
		max-height: 60vh;
	}
	&-wrapper {
		&--title {
			text-align: center;
			font-size: 28px;
			font-weight: 600;
			color: var(--main-color);
		}
		&--description {
			text-align: center;
		}
	}
}
</style>
