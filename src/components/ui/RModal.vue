<template>
	<RBackground
		:opened="opened"
		@close="opened = false"
	>
		<div
			v-if="opened"
			:class="$style[`${className}-wrapper`]"
		>
			<div :class="$style[`${className}-header`]">
				<slot name="header">
					<p>
						{{ title }}
					</p>
				</slot>
			</div>
			<div :class="$style[`${className}-header--right`]">
				<slot name="header-right">
					<div class="r-p-8">
						<RButton @click="opened = false">
							<template #prepend>
								<img
									class="r-pointer r-h-15 r-w-15"
									src="@/assets/icons/close.svg"
									alt="Close"
								/>
							</template>
						</RButton>
					</div>
				</slot>
			</div>
			<div :class="$style[`${className}-content--left`]">
				<slot name="content-left" />
			</div>
			<div :class="$style[`${className}-content`]">
				<slot name="content" />
			</div>
			<div :class="$style[`${className}-content--right`]">
				<slot name="content-right" />
			</div>
			<div :class="$style[`${className}-footer--left`]">
				<slot name="footer-left" />
			</div>
			<div :class="$style[`${className}-footer`]">
				<slot name="footer" />
			</div>
			<div :class="$style[`${className}-footer--right`]">
				<slot name="footer-right" />
			</div>
		</div>
	</RBackground>
</template>

<script lang="ts" setup>
import RButton from '@/components/ui/RButton.vue';
import RBackground from '@/components/ui/RBackground.vue';

defineProps<{
	title?: string;
}>();

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
		min-height: 250px;
		opacity: 1;
		z-index: 11;
		border-radius: 5px;
		grid-template-columns: auto 1fr auto;
		grid-template-rows: auto 1fr auto;
		grid-template-areas:
			'header header header-right'
			'content-left content content-right'
			'footer-left footer footer-right';
	}

	&-header {
		grid-area: header;
	}

	&-header--right {
		grid-area: header-right;
	}

	&-content--left {
		grid-area: content-left;
	}

	&-content {
		grid-area: content;
	}

	&-content--right {
		grid-area: content-right;
	}

	&-footer--left {
		grid-area: footer-left;
	}

	&-footer {
		grid-area: footer;
	}

	&-footer--right {
		grid-area: footer-right;
	}
}
</style>
