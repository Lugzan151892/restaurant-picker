<template>
  <div :class="$style[className]" class="r-grid">
    <img class="r-h-35 r-w-35" :src="icon" :alt="text" />
    <p 
      class="r-link" 
      :class="$style[`${className}-text`]"
    >
      {{ text }}
    </p>
  </div>
</template>
<script lang="ts" setup>
  import noImage from '@/assets/icons/no-image.svg';

  const className = 'menu-list-item';

  withDefaults(defineProps<{
    icon?: string;
    text?: string
  }>(), {
    text: '',
    icon: noImage
  });
  
</script>
<style lang="scss" module>
$component: menu-list-item;
.#{$component} {
  grid-template-columns: 35px max-content;
  align-items: center;
  column-gap: 24px;

  &-text {
    font-size: 20px;
  }
}
</style>