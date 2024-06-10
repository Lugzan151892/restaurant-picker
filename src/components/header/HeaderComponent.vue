<template>
  <header
    class="r-pt-40 r-px-16 r-mb-16 r-grid"
    :class="$style[className]"
  >
    <MenuComponent v-model="menuOpened" />
    <img
      class="r-pointer"
      :class="{
        [$style[`${className}-icon`]]: true,
        [$style[`${className}-icon--active`]]: menuOpened,
        }"
          src="@/assets/icons/nav.svg"
        alt="Logo"
      @click="menuOpened = !menuOpened"
    />
  </header>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import MenuComponent from '@/components/menu/MenuComponent.vue';

  const componentName = 'HeaderComponent';
  const className = 'header-component';

  const menuOpened = ref(false);
  
</script>
<style lang="scss" module>
$component: header-component;
.#{$component} {
  position: relative;

  &-icon {
    transition: all 0.25s;
    -webkit-transition: all 0.25s;
  }

  &-icon--active {
    transform: rotate(90deg);
  }
}
</style>