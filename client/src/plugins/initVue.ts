import { VueConstructor } from 'vue';
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import StarRating from 'vue-star-rating';
import { priceFilter } from '@/filters/priceFilter';
import '@/assets/styles/main.scss';

function loadPlugins(Vue: VueConstructor): void {
    Vue.use(VueToast);
    Vue.component('star-rating', StarRating);
    Vue.filter('priceFilter', priceFilter);
}

export default function initVue(Vue: VueConstructor): void {
    loadPlugins(Vue);
}
