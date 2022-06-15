<template>
  <div>
    <section class="filters-block shadow-sm">
      <div class="container"></div>
    </section>
    <section class="cards-block">
      <template v-if="!loading">
        <div class="container">
          <div class="row">
            <base-design
              v-for="design in designs"
              :key="design.id"
              :design="design"
            >
            </base-design>
          </div>
        </div>
      </template>

      <div v-else class="container d-flex justify-content-center">
        <template>
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params, error }) {
    const designs = $axios
      .$get(`/tags/` + params.tag)
      .then((res) => {})
      .catch((e) => console.log(e))
      .finally(() => (this.searching = false))

    return { designs }
  },

  methods: {
    searchByFilter() {
      this.search()
    },
    searchByButton() {
      this.searching = true
      this.search()
    },
    search() {
      this.$axios
        .$get(`/tags/`)
        .then((res) => {
          this.loading = false
          this.designs = res.data
        })
        .catch((e) => console.log(e))
        .finally(() => (this.searching = false))
    },
  },
  beforeMount() {
    this.search()
  },
}
</script>

<style></style>
