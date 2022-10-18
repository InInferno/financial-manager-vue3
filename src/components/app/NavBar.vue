<template>
  <nav class="navbar orange lighten-1">
    <div class="nav-wrapper">
      <div class="navbar-left">
        <div>
          <a href="#" @click.prevent="$emit('openMenu')">
            <i class="material-icons black-text">dehaze</i>
          </a>
        </div>

        <span class="black-text">{{ dateFilter('datetime') }}</span>
      </div>

      <ul class="right hide-on-small-and-down">
        <li>
          <a
            class="dropdown-trigger black-text"
            href="#"
            data-target="dropdown"
            ref="dropwown"
          >
            {{name}}
            <i class="material-icons right">arrow_drop_down</i>
          </a>

          <ul id='dropdown' class='dropdown-content'>
            <li>
              <router-link to="/profile" class="black-text">
                <i class="material-icons">account_circle</i>
                {{$filters.localizeFilter('ProfileTitle')}}
              </router-link>
            </li>
            <li class="divider" tabindex="-1"></li>
            <li>
              <a href="#" class="black-text" @click.prevent="logout">
                <i class="material-icons">assignment_return</i>
                {{$filters.localizeFilter('Exit')}}
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import M from 'materialize-css';

export default ({
  data: () => ({
    date: new Date(),
    interval: null,
    dropwown: null
  }),
  methods: {
    async logout() {
      await this.$store.dispatch('logout');
      this.$router.push('/login?message=logout');
    },
    dateFilter(format = 'date') {
      // value = this.date;
      const options = {};

      if (format.includes('date')) {
        options.day = '2-digit';
        options.month = 'long';
        options.year = 'numeric';
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.second = '2-digit';
      }
      const locale = this.$store.getters.info.locale || 'ru-RU';
      return new Intl.DateTimeFormat(locale, options).format(new Date(this.date));
    }
  },
  computed: {
    name() {
      return this.$store.getters.info.name;
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date();
    }, 1000);
    M.Dropdown.init(this.$refs.dropwown, {
      constrainWidth: false
    });
  },
  beforeUnmount() {
    clearInterval(this.interval);
    if (this.dropwown && this.dropwown.destroy) {
      this.dropwown.destroy();
    }
  }
});
</script>
