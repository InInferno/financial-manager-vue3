<template>
  <div>
    <div class="page-title">
      <h3>{{$filters.localizeFilter('Menu_Categories')}}</h3>
    </div>
    <section>
      <Loader v-if="loading" />
      <div class="row" v-else>
        <CategoryCreate @created="addNewCategory" />
        <CategoryEdit
          v-if="categories.length"
          :categories="categories"
          :key="categories.length + updateCount"
          @updated="updateCategories"
        />
        <p v-else class="center">{{$filters.localizeFilter('NoCategories')}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '@/components/CategoryCreate.vue';
import CategoryEdit from '@/components/CategoryEdit.vue';
import {useMeta} from 'vue-meta';
import filters from '../utils/filters';

export default {
  name: 'categoriesPage',
  setup() {
    useMeta({
      title: filters.localizeFilter('Menu_Categories')
    });
  },
  data: () => ({
    categories: [],
    loading: true,
    updateCount: 0
  }),
  async mounted() {
    this.categories = await this.$store.dispatch('fetchCategories');
    this.loading = false;
  },
  components: {
    CategoryCreate, CategoryEdit
  },
  methods: {
    updateCategories(category) {
      const idx = this.categories.findIndex((c) => c.id === category.id);
      this.categories[idx].title = category.title;
      this.categories[idx].limit = category.limit;
      // eslint-disable-next-line no-plusplus
      this.updateCount++;
    }
  }
};
</script>
