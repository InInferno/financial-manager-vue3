<template>
    <metainfo>
      <template
        v-slot:title="{content}"
      >
        {{content ? `${content} - Vadim Corp.` : `CRM - Vadim Corp.`}}
      </template>
    </metainfo>
  <component :is="layout" />
</template>

<script>
import EmptyLayout from './layouts/EmptyLayout.vue';
import MainLayout from './layouts/MainLayout.vue';

export default {
  components: {
    EmptyLayout, MainLayout
  },
  computed: {
    layout() {
      return `${this.$route.meta.layout || 'empty'}-layout`;
    }
  }
};
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css';
</style>
