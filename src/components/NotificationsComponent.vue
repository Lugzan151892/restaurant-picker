<template>
  <transition-group
    :class="$style[className]"
    tag="div"
    appear
    :move-class="$style[`${className}-move`]"
    :enter-active-class="$style[`${className}-enter-active`]"
    :leave-active-class="$style[`${className}-leave-active`]"
  >
    <div 
      :class="$style[`${className}-notification`]" 
      :key="notification.id" 
      v-for="notification in mainStore.notifications"
      @click="mainStore.deleteNotification(notification.id)"
    >
      <img
        :class="$style[`${className}-notification--image`]"
        :src="icons[notification.type]"
        :alt="notification.type"
      />
      <div :class="$style[`${className}-notification--text`]">{{ notification.text }}</div>
    </div>
  </transition-group>
</template>

<script lang="ts" setup>
import success from '@/assets/icons/success.svg';
import warning from '@/assets/icons/warning.svg';
import error from '@/assets/icons/error.svg';
import { useMain } from '@/stores/mainStore';

const className = 'notification-component';
const mainStore = useMain();

const icons: { [key: string]: any } = {
	success,
	error,
	warning,
};

</script>

<style lang="scss" module>
$component: 'notification-component';
.#{$component} {
  position: fixed;
  bottom: 16px;
  left: 16px;
  z-index: 50;

  &-notification {
    display: grid;
    grid-template-columns: max-content 1fr;
    border: 1px solid black;
    border-radius: 20px;
    width: 250px;
    background-color: var(--main-color);
    color: var(--main-white);
    padding: 4px 8px;
    align-items: center;
    column-gap: 8px;
    font-size: 16px;
		font-weight: 600;
    cursor: pointer;

    &--image {
      height: 30px;
      width: 30px;
    }

    &--text {
      text-wrap: wrap;
    }
  }

  @keyframes notification {
    0% {
      right: calc(100% + 16px);
      width: 64px;
    }

    50% {
      right: 0;
      width: 64px;
    }

    100% {
      right: 0;
      width: 250px;
    }
  }

  @keyframes notification-reverse {
    0% {
      opacity: 1;
      right: 0;
    }

    100% {
      opacity: 0;
      right: calc(100% + 16px);
    }
  }

  &-move {
    transition: all 0.25s;
  }

  &-enter-active {
    overflow: hidden;
    position: relative;
    animation: notification 1s forwards;
  }

  &-leave-active {
    overflow: hidden;
    position: relative;
    animation: notification-reverse 0.5s forwards;
  }
}
</style>
