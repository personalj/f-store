<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
    <header />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EmptyLayout from "@/layouts/EmptyLayout.vue";
import MainLayout from "@/layouts/MainLayout.vue";

@Component({
  components: {
    EmptyLayout,
    MainLayout,
  },
})
export default class Home extends Vue {
  get layout(): string {
    return (this.$route.meta?.layout || "empty") + "-layout";
  }
}
</script>
