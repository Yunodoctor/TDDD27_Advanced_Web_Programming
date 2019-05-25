import Vue from "vue";
import App from "./App.vue";
import router from "./router/routes";
import BootstrapVue from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "vue-material-design-icons/styles.css";
import ArchiveIcon from "vue-material-design-icons/PackageDown.vue";
import EditIcon from "vue-material-design-icons/Pencil.vue";
import DeleteIcon from "vue-material-design-icons/Delete.vue";

//Icons
Vue.component("archive-icon", ArchiveIcon);
Vue.component("edit-icon", EditIcon);
Vue.component("delete-icon", DeleteIcon);

Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
  router
}).$mount("#app");
