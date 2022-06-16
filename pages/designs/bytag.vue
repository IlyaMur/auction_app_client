<template>
  <div>
    <section class="filters-block shadow-sm">
      <div class="container"></div>
    </section>
    <section class="cards-block">
      <template v-if="!loading">
        <div class="container">
          <h1>Работы по тэгу: #{{ this.$route.params.tag }}</h1>
          <div class="row">
            <base-design
              v-for="design in designs.data"
              :key="design.id"
              :design="design"
            >
            </base-design>
          </div>
        </div>
      </template>
      <base-spinner v-else />
    </section>
    <div class="d-flex justify-content-center" style="margin-bottom: 60px">
      <Pagination :data="designs" @pagination-change-page="getResults">
        <template #prev-nav>
          <span>&lt; Назад</span>
        </template>
        <template #next-nav>
          <span>Вперед &gt;</span>
        </template>
      </Pagination>
    </div>
  </div>
</template>

<script>
import LaravelVuePagination from 'laravel-vue-pagination'

export default {
  components: {
    Pagination: LaravelVuePagination,
  },
  data() {
    return {
      loading: true,
      designs: {},
    }
  },

  methods: {
    getResults(page = 1) {
      this.$axios
        .get(`/designs/tag/${this.$route.params.tag}?page=` + page)
        .then((res) => {
          this.loading = false
          this.designs = res.data
        })
        .catch((e) => console.log(e))
        .finally(() => (this.searching = false))
    },
  },
  beforeMount() {
    this.getResults()
  },
}
</script>

<style></style>
