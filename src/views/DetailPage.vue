<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">
          {{$filters.localizeFilter('Menu_History')}}
        </router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === 'income'
          ? $filters.localizeFilter('Income')
          : $filters.localizeFilter('Outcome') }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div class="card" :class="{
            'red': record.type === 'outcome',
            'green': record.type === 'income'
          }">
            <div class="card-content white-text">
              <p>{{$filters.localizeFilter('Description')}}: {{record.description}} </p>
              <p>{{$filters.localizeFilter('Amount')}}: {{currencyFilter(record.amount)}} </p>
              <p>{{$filters.localizeFilter('Categories')}}: {{record.categoryName}} </p>

              <small>{{dateFilter(record.date, ('datetime'))}}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>
      {{$filters.localizeFilter('Detail_Title')}}
      {{$filters.localizeFilter('With')}}
      id={{$route.params.id}}
      {{$filters.localizeFilter('NotFound')}}
    </p>
  </div>
</template>

<script>
import {useMeta} from 'vue-meta';
import filters from '../utils/filters';

export default {
  name: 'detailPage',
  setup() {
    useMeta({
      title: filters.localizeFilter('Detail_Title')
    });
  },
  data: () => ({
    record: null,
    loading: true
  }),
  methods: {
    currencyFilter(value, currency = 'RUB') {
      return new Intl.NumberFormat('ru-RU', {
        style: 'currency',
        currency
      }).format(value);
    },
    dateFilter(value, format = 'date') {
      const options = {};

      if (format.includes('date')) {
        options.day = '2-digit';
        options.month = 'long';
        options.year = 'numeric';
      }

      if (format.includes('time')) {
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.second = '2-digit';
      }

      return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value));
    }
  },
  async mounted() {
    const {id} = this.$route.params;
    const record = await this.$store.dispatch('fetchRecordById', id);
    const category = await this.$store.dispatch('fetchCategoryById', record.categoryId);

    this.record = {
      ...record,
      categoryName: category.title
    };

    this.loading = false;
  }
};
</script>
