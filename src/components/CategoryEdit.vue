<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{$filters.localizeFilter('Edit')}}</h4>
      </div>

      <form @submit.prevent="submitHandler">
        <div class="input-field" >
          <select ref="select" v-model="current">
            <option
              v-for="c of categories"
              :key="c.id"
              :value="c.id"
            >
              {{c.title}}
            </option>
          </select>
          <label>{{$filters.localizeFilter('SelectCategory')}}</label>
        </div>

        <div class="input-field">
          <input
            id="name"
            type="text"
            v-model="vv.title.$model"
            :class="{'invalid': vv.title.$dirty && !vv.title.required.$response}"
          >
          <label for="name">{{$filters.localizeFilter('Title')}}</label>
          <span
            v-if="vv.title.$dirty && !vv.title.required.$response"
            class="helper-text invalid"
          >
            {{$filters.localizeFilter('Message_CategoryTitle')}}
          </span>
        </div>

        <div class="input-field">
          <input
              id="limit"
              type="number"
              v-model.number="vv.limit.$model"
              :class="{'invalid': vv.limit.$dirty && !vv.limit.minValue.$response}"
          >
          <label for="limit">{{$filters.localizeFilter('Limit')}}</label>
          <span
            v-if="vv.limit.$dirty && !vv.limit.minValue.$response"
            class="helper-text invalid"
          >
            {{$filters.localizeFilter('Message_MinLength')}} {{vv.limit.minValue.$params.min}}
          </span>
        </div>

        <button class="btn waves-effect waves-light" type="submit">
          {{$filters.localizeFilter('Update')}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import M from 'materialize-css';
import useVuelidate from '@vuelidate/core';
import {required, minValue} from '@vuelidate/validators';
import {inject} from 'vue';

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    vv: useVuelidate(),
    message: inject('message'),
    select: null,
    title: '',
    limit: 100,
    current: null
  }),
  validations() {
    return {
      title: {
        required
      },
      limit: {
        minValue: minValue(100)
      }
    };
  },
  created() {
    const {id, title, limit} = this.categories[0];
    this.current = id;
    this.title = title;
    this.limit = limit;
  },
  watch: {
    current(catId) {
      const {title, limit} = this.categories.find((c) => c.id === catId);
      this.title = title;
      this.limit = limit;
    }
  },
  mounted() {
    setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select, {});
    }, 1000);
    M.updateTextFields();
  },
  unmounted() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  methods: {
    async submitHandler() {
      if (this.vv.$invalid) {
        this.vv.$touch();
        // eslint-disable-next-line no-useless-return
        return;
      }
      try {
        const categoryData = {
          id: this.current,
          title: this.title,
          limit: this.limit
        };

        await this.$store.dispatch('updateCategory', categoryData);
        this.message(this.$filters.localizeFilter('Category_HasBeenUpdated'));
        this.$emit('updated', categoryData);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
