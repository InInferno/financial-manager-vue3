<template>
  <div class="col s12 m6">
    <div>
      <div class="page-subtitle">
        <h4>{{$filters.localizeFilter('Create')}}</h4>
      </div>

      <form @submit.prevent="submitHandler()">
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
          {{$filters.localizeFilter('Create')}}
          <i class="material-icons right">send</i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import {inject} from 'vue';
import {required, minValue} from '@vuelidate/validators';
import M from 'materialize-css';

export default {
  name: 'categoryCreate',
  data: () => ({
    title: '',
    limit: 100,
    vv: useVuelidate(),
    message: inject('message')
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
  mounted() {
    M.updateTextFields();
  },
  methods: {
    async submitHandler() {
      if (this.vv.$invalid) {
        this.vv.$touch();
        // eslint-disable-next-line no-useless-return
        return;
      }
      try {
        const category = await this.$store.dispatch('createCategory', {
          title: this.title,
          limit: this.limit
        });
        this.title = '';
        this.limit = 100;
        this.vv.$reset();
        this.message(this.$filters.localizeFilter('Category_HasBeenCreated'));
        this.$emit('created', category);
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>
