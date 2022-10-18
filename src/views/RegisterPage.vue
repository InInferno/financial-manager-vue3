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
      <div class="input-field">
        <input
          id="name"
          type="text"
          v-model="v$.form.name.$model"
        >
        <label for="name">{{$filters.localizeFilter('Name')}}</label>
        <small
          class="helper-text invalid"
          v-for="(error, index) of v$.form.name.$errors"
          :key="index"
        >
        {{error.$message}}
        </small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="v$.form.agree.$model" />
          <span>{{$filters.localizeFilter('AcceptRules')}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          {{$filters.localizeFilter('Register')}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{$filters.localizeFilter('HasAccount')}}
        <router-link to="/login">{{$filters.localizeFilter('Login')}}</router-link>
      </p>
    </div>
  </form>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import {required, email, minLength} from '@vuelidate/validators';
import {useMeta} from 'vue-meta';
import filters from '../utils/filters';

export default {
  name: 'registerPage',
  setup() {
    useMeta({
      title: filters.localizeFilter('Menu_NewRecord')
    });
    return {v$: useVuelidate()};
  },
  // setup() {
  //   return {v$: useVuelidate()}
  // },
  data() {
    return {
      form: {
        email: '',
        password: '',
        name: '',
        agree: false
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
        },
        name: {
          required,
          min: minLength(6)
        },
        agree: {checked: (value) => value}
      }
    };
  },
  methods: {
    async submitHandler() {
      if (this.v$.form.$invalid) {
        this.v$.$touch();
        return;
      }
      const formData = {
        email: this.form.email,
        password: this.form.password,
        name: this.form.name
      };
      try {
        await this.$store.dispatch('register', formData);
        this.$router.push('/');
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  }
};
</script>
