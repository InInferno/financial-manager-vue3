<template>
  <div>
    <div class="page-title">
      <h3>{{$filters.localizeFilter('History_Title')}}</h3>
    </div>

    <div class="history-chart">
      <Pie
        :chart-data="chartData"
      />
    </div>

    <LoaderApp v-if="loading" />

    <p class="center" v-else-if="!records.length">
      {{$filters.localizeFilter('NoRecords')}}
      <router-link to="/record">{{$filters.localizeFilter('AddFirst')}}</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />

      <Paginate
        v-model="page"
        :page-count="pageCount"
        :click-handler="pageChangeHandler"
        :prev-text="$filters.localizeFilter('Back')"
        :next-text="$filters.localizeFilter('Forward')"
        :container-class="'pagination'"
        :page-class="'waves-effect'"
      />
    </section>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin';
import HistoryTable from '@/components/HistoryTable.vue';
import {Pie} from 'vue-chartjs';
import {Chart, registerables} from 'chart.js';
import {useMeta} from 'vue-meta';
import filters from '../utils/filters';

Chart.register(...registerables);

export default {
  name: 'historyPage',
  mixins: [paginationMixin],
  setup() {
    useMeta({
      title: filters.localizeFilter('Menu_History')
    });
  },
  data: () => ({
    loading: true,
    records: [],
    chartData: {}
  }),
  async mounted() {
    this.records = await this.$store.dispatch('fetchRecords');
    const categoires = await this.$store.dispatch('fetchCategories');

    this.setup(categoires);

    this.loading = false;
  },
  methods: {
    setup(categoires) {
      this.setupPagination(this.records.map((record) => ({
        ...record,
        categoryName: categoires.find((c) => c.id === record.categoryId).title,
        typeClass: record.type === 'income' ? 'green' : 'red',
        typeText: record.type === 'income'
          ? this.$filters.localizeFilter('Income')
          : this.$filters.localizeFilter('Outcome')
      })));

      this.chartData = {
        labels: categoires.map((c) => c.title),
        datasets: [{
          label: this.$filters.localizeFilter('CostsForCategories'),
          data: categoires.map((c) => this.records.reduce((total, r) => {
            if (r.categoryId === c.id && r.type === 'outcome') {
              // eslint-disable-next-line no-param-reassign
              total += +r.amount;
            }
            return total;
          }, 0)),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      };
    }
  },
  components: {
    HistoryTable, Pie
  }
};
</script>
