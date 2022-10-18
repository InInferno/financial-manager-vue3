<template>
  <div class="grey darken-1 empty-layout">
    <router-view />
  </div>
</template>

<script>
import messages from '@/utils/messages';
import {inject} from 'vue';

export default {
  data() {
    return {
      errorMessage: inject('error')
    };
  },
  computed: {
    error() {
      return this.$store.getters.error;
    }
  },
  watch: {
    error() {
      this.errorMessage(messages[this.error.code] || this.$filters.localizeFilter('Error'));
    }
  }
};
</script>
