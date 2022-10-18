<template>
  <div>
    <div class="page-title">
      <h3>{{$filters.localizeFilter('ProfileTitle')}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="vv.name.$model"
          :class="{'invalid': vv.name.$dirty && !vv.name.required.$response}"
        >
        <label for="description">{{$filters.localizeFilter('Name')}}</label>
        <small
          class="helper-text invalid"
          v-if="vv.name.$dirty && !vv.name.required.$response"
        >{{$filters.localizeFilter('Message_EnterName')}}</small>
      </div>

      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale">
          <span class="lever"></span>
          Русский
        </label>
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{$filters.localizeFilter('Update')}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import {required} from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import M from 'materialize-css';
import {useMeta} from 'vue-meta';
import filters from '../utils/filters';

export default {
  setup() {
    useMeta({
      title: filters.localizeFilter('ProfileTitle')
    });
  },
  name: 'profilePage',
  data: () => ({
    name: '',
    isRuLocale: true,
    vv: useVuelidate()
  }),
  computed: {
    ...mapGetters(['info'])
  },
  validations() {
    return {
      name: {
        required
      }
    };
  },
  mounted() {
    this.name = this.info.name;
    this.isRuLocale = this.info.locale === 'ru-RU';
    setTimeout(() => {
      M.updateTextFields();
    }, 1000);
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.vv.$invalid) {
        this.vv.$touch();
        return;
      }

      try {
        await this.updateInfo({
          name: this.name,
          locale: this.isRuLocale ? 'ru-RU' : 'en-US'
        });
      } catch (e) {
        console.log(e);
      }
    }
  }
};
</script>

<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>
