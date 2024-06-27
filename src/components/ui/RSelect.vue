<template>
	<div :class="$style[className]">
		<select
			name="cars"
			id="cars"
		>
			<option value="volvo">Volvo</option>
			<option value="saab">Saab</option>
			<option value="mercedes">Mercedes</option>
			<option value="audi">Audi</option>
		</select>
	</div>
</template>

<script lang="ts" setup>
const componentName = 'RSelect';
const className = 'r-select';
</script>

<style lang="scss" module>
$component: 'r-select';
.#{$component} {
}
</style>
