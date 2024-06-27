<template>
	<RBackground
		:opened="opened"
		@close="opened = false"
	>
		<div
			v-if="opened"
			class="r-m-auto"
			:class="$style[`${className}-wrapper`]"
		>
			<div
				v-if="!hideHeader"
				:class="{
					[$style[`${className}-header`]]: true,
					'r-p-8': true,
				}"
			>
				<div :class="$style[`${className}-header--content`]">
					<slot name="header">
						<p :class="$style[`${className}-header--content-title`]">
							{{ title }}
						</p>
					</slot>
				</div>
				<div
					:class="{
						[$style[`${className}-header--right`]]: true,
						'r-hp-100': !$slots['header-right'],
					}"
				>
					<slot name="header-right">
						<RButton
							:class="{
								'r-ml-8': !$slots['header'],
							}"
							@click="opened = false"
						>
							<template #prepend>
								<img
									class="r-pointer r-h-20 r-w-15"
									src="@/assets/icons/close.svg"
									alt="Close"
								/>
							</template>
						</RButton>
					</slot>
				</div>
			</div>
			<div
				:class="{
					[$style[`${className}-content`]]: true,
					'r-mt-24': hideHeader,
				}"
			>
				<div :class="$style[`${className}-content--left`]">
					<slot name="content-left" />
				</div>
				<div :class="$style[`${className}-content--middle`]">
					<slot />
				</div>
				<div :class="$style[`${className}-content--right`]">
					<slot name="content-right" />
				</div>
			</div>
			<div :class="$style[`${className}-footer`]">
				<div :class="$style[`${className}-footer--left`]">
					<slot name="footer-left" />
				</div>
				<div :class="$style[`${className}-footer--middle`]">
					<slot name="footer" />
				</div>
				<div :class="$style[`${className}-footer--right`]">
					<slot name="footer-right" />
				</div>
			</div>
		</div>
	</RBackground>
</template>

<script lang="ts" setup>
import RButton from '@/components/ui/RButton.vue';
import RBackground from '@/components/ui/RBackground.vue';

withDefaults(
	defineProps<{
		title?: string;
		hideHeader?: boolean;
	}>(),
	{
		title: '',
		hideHeader: false,
	},
);

defineEmits(['close']);
const className = 'r-modal';

const opened = defineModel({ default: false });
</script>

<style lang="scss" module>
$component: 'r-modal';
.#{$component} {
	&-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: grid;
		min-width: 200px;
		background: #fff;
		min-height: 200px;
		opacity: 1;
		z-index: 11;
		border-radius: 5px;
		grid-template-columns: 1fr;
		grid-template-rows: max-content 1fr max-content;
		grid-template-areas:
			'header'
			'content'
			'footer';
	}

	&-header {
		display: grid;
		grid-area: header;
		grid-template-areas: 'header header header-right';
		grid-template-columns: 1fr 1fr auto;
		grid-template-rows: min-content;
		align-items: center;
		&--content {
			grid-area: header;

			&-title {
				font-size: 20px;
				font-weight: 600;
				text-align: center;
			}
		}

		&--right {
			grid-area: header-right;
		}
	}

	&-content {
		display: grid;
		grid-area: content;
		grid-template-areas: 'content-left content content-right';
		grid-template-columns: auto 1fr auto;
		&--left {
			grid-area: content-left;
		}

		&--middle {
			grid-area: content;
		}

		&--right {
			grid-area: content-right;
		}
	}

	&-footer {
		display: grid;
		grid-area: footer;
		grid-template-columns: auto 1fr auto;
		grid-template-areas: 'footer-left footer footer-right';
		&--left {
			grid-area: footer-left;
		}

		&--middle {
			grid-area: footer;
		}

		&--right {
			grid-area: footer-right;
		}
	}
}
</style>
