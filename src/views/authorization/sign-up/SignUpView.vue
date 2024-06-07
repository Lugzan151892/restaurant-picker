<template>
<section>
  <div class="logo">
    tut logo
  </div>
  <div class="form">
    <h2>
      Signup
    </h2>
    <form>
      <RInput v-model="name" />
    </form>
  </div>
</section>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import RInput from '../../../components/ui/RInput.vue';

const name = ref('');
  
</script>
<style lang="scss" module>
$component: SignUpView;
.#{$component} {
  
}
</style>