<template>
  <div>
    <div class="page-title">
      <h3>{{$filters.localizeFilter('Menu_NewRecord')}}</h3>
    </div>

    <Loader v-if="loading" />

    <p
      class="center"
      v-else-if="!categories.length"
    >
      {{$filters.localizeFilter('NoCategories')}}
      <router-link to="/categories">
        {{$filters.localizeFilter('AddFirst')}}
      </router-link>
    </p>

    <form class="form" v-else @submit.prevent="handleSubmit">
      <div class="input-field" >
        <select ref="select" v-model="category">
          <option
            v-for="c in categories"
            :key="c.id"
            :value="c.id"
          >{{c.title}}</option>
        </select>
        <label>{{$filters.localizeFilter('SelectCategory')}}</label>
      </div>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="income"
              v-model="type"
          />
          <span>{{$filters.localizeFilter('Income')}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
              class="with-gap"
              name="type"
              type="radio"
              value="outcome"
              v-model="type"
          />
          <span>{{$filters.localizeFilter('Outcome')}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
            id="amount"
            type="number"
            v-model.number="vv.amount.$model"
            :class="{'invalid': vv.amount.$dirty && !vv.amount.minValue.$response}"
        >
        <label for="amount">{{$filters.localizeFilter('Amount')}}</label>
        <span
            v-if="vv.amount.$dirty && !vv.amount.minValue.$response"
            class="helper-text invalid"
          >
            {{$filters.localizeFilter('Message_MinLength')}} {{vv.amount.minValue.$params.min}}
          </span>
      </div>

      <div class="input-field">
        <input
            id="description"
            type="text"
            v-model="vv.description.$model"
            :class="{'invalid': vv.description.$dirty && !vv.description.required.$response}"
        >
        <label for="description">{{$filters.localizeFilter('Description')}}</label>
        <span
            v-if="vv.description.$dirty && !vv.description.required.$response"
            class="helper-text invalid"
          >
            {{$filters.localizeFilter('Message_EnterDescription')}}
          </span>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{$filters.localizeFilter('Create')}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {required, minValue} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import {inject} from 'vue';
import {mapGetters} from 'vuex';
import M from 'materialize-css';
import {useMeta} from 'vue-meta';
import filters from '../utils/filters';

export default {
  name: 'recordPage',
  setup() {
    useMeta({
      title: filters.localizeFilter('Menu_NewRecord')
    });
  },
  data: () => ({
    vv: useVuelidate(),
    message: inject('message'),
    loading: true,
    select: null,
    categories: [],
    category: null,
    type: 'outcome',
    amount: 1,
    description: ''
  }),
  validations: {
    amount: {minValue: minValue(1)},
    description: {required}
  },
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    await this.$store.dispatch('fetchCategories');
    this.loading = false;
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 1000);
  },
  computed: {
    ...mapGetters(['info']),
    canCreateRecord() {
      if (this.type === 'income') {
        return true;
      }

      return this.info.bill >= this.amount;
    }
  },
  methods: {
    async handleSubmit() {
      if (this.vv.$invalid) {
        this.vv.$touch();
        return;
      }

      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch('createRecord', {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toJSON()
          });
          const bill = this.type === 'income'
            ? this.info.bill + this.amount
            : this.info.bill - this.amount;

          await this.$store.dispatch('updateInfo', {bill});
          this.message(this.$filters.localizeFilter('RecordHasBeenCreated'));
          this.vv.$reset();
          this.amount = 1;
          this.description = '';
        } catch (e) {
          console.log('e', e);
        }
      } else {
        this.message(`${this.$filters.localizeFilter('NotEnoughMoney')} (${this.amount - this.info.bill})`);
      }
    }
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  }
};
</script>
