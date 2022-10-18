<template>
  <table>
    <thead>
    <tr>
      <th>#</th>
      <th>{{$filters.localizeFilter('Amount')}}</th>
      <th>{{$filters.localizeFilter('Date')}}</th>
      <th>{{$filters.localizeFilter('Category')}}</th>
      <th>{{$filters.localizeFilter('Type')}}</th>
      <th>{{$filters.localizeFilter('Open')}}</th>
    </tr>
    </thead>

    <tbody>
    <tr v-for="(record, idx) of records" :key="record.id">
      <td>{{idx + 1}}</td>
      <td>{{currencyFilter(record.amount)}}</td>
      <td>{{dateFilter(record.date)}}</td>
      <td>{{record.categoryName}}</td>
      <td>
        <span
          :class="[record.typeClass]"
          class="white-text badge"
        >{{ record.typeText }}</span>
      </td>
      <td>
        <button
          v-tooltip="$filters.localizeFilter('OpenRecord')"
          class="btn-small btn"
          @click="$router.push('/detail/' + record.id)"
        >
          <i class="material-icons">open_in_new</i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    records: {
      required: true,
      type: Array
    }
  },
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
  }
};
</script>
