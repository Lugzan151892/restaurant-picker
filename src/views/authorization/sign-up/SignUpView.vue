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
      <RInput placeholder="Введите имя" v-model="name" />
      <RInput placeholder="Введите e-mail" v-model="email" />
      <RInput placeholder="Введите номер телефона" v-model="phone" />
    </form>
  </div>
</section>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import RInput from '../../../components/ui/RInput.vue';

const name = ref('');
const email = ref('');
const phone = ref('');

</script>
<style lang="scss" module>
$component: SignUpView;
.#{$component} {
  
}
</style>