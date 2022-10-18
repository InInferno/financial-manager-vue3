<template>
  <div>
    <LoaderApp v-if="loading" />
    <div v-else class="app-main-layout">

    <NavBar @openMenu="isOpen = !isOpen" />

    <SideBar :isOpen="isOpen" />

    <main class="app-content" :class="{full: !isOpen}" :key="locale">
      <div class="app-page">
        <router-view />
      </div>
    </main>

    <div class="fixed-action-btn">
      <router-link
        class="btn-floating btn-large blue"
        to="/record" v-tooltip="$filters.localizeFilter('CreateNewRecord')"
      >
        <i class="large material-icons">add</i>
      </router-link>
    </div>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/app/NavBar.vue';
import SideBar from '@/components/app/SideBar.vue';
import messages from '@/utils/messages';
import {inject} from 'vue';

export default {
  name: 'main-layout',
  data: () => ({
    isOpen: true,
    loading: true,
    errorMessage: inject('error')
  }),
  async mounted() {
    if (!Object.keys(this.$store.getters.info).length) {
      await this.$store.dispatch('fetchInfo');
    }

    this.loading = false;
  },
  computed: {
    error() {
      return this.$store.getters.error;
    },
    locale() {
      return this.$store.getters.info.locale;
    }
  },
  watch: {
    error() {
      this.errorMessage(messages[this.error.code] || this.$filters.localizeFilter('Error'));
    }
  },
  components: {
    NavBar,
    SideBar
  }
};
</script>
