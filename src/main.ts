import '@/assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from '@/App.vue';
import router from '@/router';
import RBackground from '@/components/ui/RBackground.vue';
import RButton from '@/components/ui/RButton.vue';
import RCodeInput from '@/components/ui/RCodeInput.vue';
import RIcon from '@/components/ui/RIcon.vue';
import RInput from '@/components/ui/RInput.vue';
import RLabel from '@/components/ui/RLabel.vue';
import RModal from '@/components/ui/RModal.vue';
import RSelect from '@/components/ui/RSelect.vue';


const app = createApp(App);

app
  .component('RBackground', RBackground)
  .component('RButton', RButton)
  .component('RCodeInput', RCodeInput)
  .component('RIcon', RIcon)
  .component('RInput', RInput)
  .component('RLabel', RLabel)
  .component('RModal', RModal)
  .component('RSelect', RSelect)

app.use(createPinia());
app.use(router);

app.mount('#app');
