<template>
  <img :src="src" :alt="alt" />
</template>
<script lang="ts" setup>

  withDefaults(defineProps<{
    src: string;
    alt?: string;
  }>(), {
    alt: 'Icon'
  })
  const componentName = 'RIcon';
  const className = 'r-icon';
  
</script>
<style lang="scss" module>
  $component: r-icon;
  .#{$component} {
    
  }
</style>