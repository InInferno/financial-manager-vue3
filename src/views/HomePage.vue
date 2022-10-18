<template>
  <div>
    <div class="page-title">
      <h3>{{$filters.localizeFilter('Bill')}}</h3>

      <button class="btn waves-effect waves-light btn-small" @click="refresh">
        <i class="material-icons">refresh</i>
      </button>
    </div>

    <LoaderApp v-if="loading"/>

    <div v-else class="row">

      <HomeBill
        :rates="this.currency.rates"
      />

      <HomeCurrency
        :rates="this.currency.rates"
        :date="this.currency.date"
      />

    </div>
  </div>
</template>

<script>
import HomeBill from '@/components/HomeBill.vue';
import HomeCurrency from '@/components/HomeCurrency.vue';
import {useMeta} from 'vue-meta';
import filters from '../utils/filters';

export default {
  name: 'homePage',
  setup() {
    useMeta({
      title: filters.localizeFilter('CRM_Title')
    });
  },
  data: () => ({
    loading: true,
    currency: null
  }),
  async mounted() {
    this.currency = await this.$store.dispatch('fetchCurrency');
    this.loading = false;
  },
  methods: {
    async refresh() {
      this.loading = true;
      this.currency = await this.$store.dispatch('fetchCurrency');
      this.loading = false;
    }
  },
  components: {
    HomeBill,
    HomeCurrency
  }
};
</script>
