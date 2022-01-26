<template>
  <div class="app-main">
    <div class="container">
      <app-header />
      <main class="app-content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import AppHeader from "@/components/common/AppHeader.vue";

@Component({
  components: {
    AppHeader,
  },
})
export default class MainLayout extends Vue {}
</script>