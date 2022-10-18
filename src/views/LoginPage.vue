<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">{{$filters.localizeFilter('CRM_Title')}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model="v$.form.email.$model"
        >
        <label for="email">Email</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.form.email.$errors"
          :key="index"
        >
          {{error.$message}}
        </small>
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model="v$.form.password.$model"
        >
        <label for="password">{{$filters.localizeFilter('Password')}}</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.form.password.$errors"
          :key="index"
        >
        {{error.$message}}
        </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
        >
          {{$filters.localizeFilter('Login')}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{$filters.localizeFilter('NoAccount')}}
        <router-link to="/register">{{$filters.localizeFilter('Register')}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import {required, email, minLength} from '@vuelidate/validators';
import {inject} from 'vue';
import messages from '@/utils/messages';
import {useMeta} from 'vue-meta';
import filters from '../utils/filters';

export default {
  name: 'loginPage',
  setup() {
    useMeta({
      title: filters.localizeFilter('Login')
    });
    return {v$: useVuelidate()};
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    };
  },
  validations() {
    return {
      form: {
        email: {
          required, email
        },
        password: {
          required,
          min: minLength(6)
        }
      }
    };
  },
  mounted() {
    const message = inject('message');
    if (messages[this.$route.query.message]) {
      message(messages[this.$route.query.message]);
    }
  },
  methods: {
    async submitHandler() {
      if (this.v$.form.$invalid) {
        this.v$.$touch();
        return;
      }
      const formData = {
        email: this.form.email,
        password: this.form.password
      };
      try {
        await this.$store.dispatch('login', formData);
        this.$router.push('/');
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  }
};
</script>
