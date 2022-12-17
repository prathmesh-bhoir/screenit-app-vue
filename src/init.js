import Vue from 'vue'
import Vuex from 'vuex'
import Router from 'vue-router';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueToast from 'vue-toast-notification';
import Vuelidate from 'vuelidate';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';

// import any icons that you use in the app
import { fas, faHome } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'vue-toast-notification/dist/theme-default.css'


// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(Vuex)
Vue.use(Router)
Vue.use(Vuelidate);
Vue.use(VueToast);

/* add icons to the library */
library.add( fas, far, faHome )

/* use Vue.component( componentName, ComponentObject ) to globally register the component - once you globally register a component you don't need to locally register in each and every component */
Vue.component('font-awesome-icon', FontAwesomeIcon)