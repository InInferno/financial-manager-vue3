<template>
  <div>
    <div class="page-title">
      <h3>{{$filters.localizeFilter('Menu_Planning')}}</h3>
      <h4>{{currencyFilter(info.bill)}}</h4>
    </div>
    <LoaderApp v-if="loading" />

    <p
      class="center"
      v-else-if="!categories.length"
    >
      {{$filters.localizeFilter('NoCategories')}}
      <router-link to="/categories">
        {{$filters.localizeFilter('AddFirst')}}
      </router-link>
    </p>

    <section v-else>
      <div v-for="cat of categories" :key="cat.id">
        <p>
          <strong>{{cat.title}}:</strong>
          {{currencyFilter(cat.spend)}}
          {{$filters.localizeFilter('Of')}}
          {{currencyFilter(cat.limit)}}
        </p>
        <div class="progress" v-tooltip="cat.tooltip">
          <div
              class="determinate"
              :class="[cat.progressColor]"
              :style="{'width': cat.progressPercent + '%'}"
          ></div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import {useMeta} from 'vue-meta';
import filters from '../utils/filters';

export default {
  name: 'planningPage',
  setup() {
    useMeta({
      title: filters.localizeFilter('Menu_Planning')
    });
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  methods: {
    currencyFilter(value, currency = 'RUB') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency
      }).format(value);
    }
  },
  async mounted() {
    const records = await this.$store.dispatch('fetchRecords');
    const categoires = await this.$store.dispatch('fetchCategories');
    this.categories = categoires.map((cat) => {
      const spend = records
        .filter((r) => r.categoryId === cat.id)
        .filter((r) => r.type === 'outcome')
        // eslint-disable-next-line arrow-body-style
        .reduce((total, record) => {
          // eslint-disable-next-line no-return-assign, no-param-reassign
          return total += +record.amount;
        }, 0);
      const percent = (100 * spend) / cat.limit;
      const progressPercent = percent > 100 ? 100 : percent;
      // eslint-disable-next-line no-nested-ternary
      const progressColor = percent < 60
        ? 'green'
        : percent < 100
          ? 'yellow'
          : 'red';

      const tooltipValue = cat.limit - spend;
      const tooltip = `${tooltipValue < 0
        ? this.$filters.localizeFilter('MoreThan')
        : this.$filters.localizeFilter('Stayed')} ${this.currencyFilter(Math.abs(tooltipValue))}`;
      return {
        ...cat,
        progressPercent,
        progressColor,
        spend,
        tooltip
      };
    });
    this.loading = false;
  }
};
</script>
