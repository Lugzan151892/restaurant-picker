<template>
	<section :class="$style[className]" class="r-px-16 r-pt-16">
    <RInput
      placeholder="Поиск по ресторанам"
      background-color="var(--main-color)"
      color="var(--main-white)"
      v-model="search"
    >
      <template #icon-before>
        <img :src="searchIcon" alt="Search" />
      </template>
    </RInput>
    <div>
      <h3>Выбери свой тип</h3>
      <div>
        тут список
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
  import RInput from '@/components/ui/RInput.vue';
  import searchIcon from '@/assets/icons/search.svg';
  import { computed, ref } from 'vue';

  const className = 'restaurants-view';
  
  const search = ref('');

  const foodTypeList = computed(() => ([
    {
      id: 1,
      text: 'Фастфуд',
      color: '',
      image: '',
    },
    {
      id: 2,
      text: 'Полезная пища',
      color: '',
      image: '',
    },
    {
      id: 3,
      text: 'Китайская кухня',
      color: '',
      image: '',
    },
    {
      id: 4,
      text: 'Корейская кухня',
      color: '',
      image: '',
    },
    {
      id: 5,
      text: 'Итальянская кухня',
      color: '',
      image: '',
    },
  ]))
</script>
<style lang="scss" module>
$component: restaurants-view;

.#{$component} {

}
</style>
