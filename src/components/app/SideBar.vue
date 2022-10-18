<template>
  <ul class="sidenav app-sidenav" :class="{open: isOpen}">
    <router-link
      v-for="link in links"
      :key="link.url"
      :to="link.url"
      v-slot="{href, navigate, isExactActive}"
    >
      <li :class="[isExactActive && 'active']">
        <a :href="href" @click="navigate" class="waves-effect waves-orange pointer">
          {{link.title}}
        </a>
      </li>
    </router-link>
  </ul>
</template>

<script>
import store from '../../store/index';
import ru from '../../locales/ru.json';
import en from '../../locales/en.json';

const locales = {
  'ru-RU': ru,
  'en-US': en
};
export default {
  props: ['isOpen'],
  methods: {
    localizeFilter(key) {
      const locale = store.getters.info.locale || 'ru-RU';
      return locales[locale][key] || `[Localize error]: key ${key} not found`;
    }
  },
  computed: {
    links() {
      return [
        {title: this.$filters.localizeFilter('Menu_Bill'), url: '/', exact: true},
        {title: this.$filters.localizeFilter('Menu_History'), url: '/history'},
        {title: this.$filters.localizeFilter('Menu_Planning'), url: '/planning'},
        {title: this.$filters.localizeFilter('Menu_NewRecord'), url: '/record'},
        {title: this.$filters.localizeFilter('Menu_Categories'), url: '/categories'}
      ];
    }
  }
};
</script>
