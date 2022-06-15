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
  data() {
    return {
      loading: true,
      designs: '',
    }
  },
  // async asyncData({ $axios, params, error }) {
  //   const designs = $axios
  //     .$get(`/designs/tag/` + params.tag)
  //     .then((res) => {})
  //     .catch((e) => console.log(e))
  //     .finally(() => (this.searching = false))

  //   return { designs }
  // },
  methods: {},
  beforeMount() {
    this.$axios
      .$get(`/designs/tag/` + this.$route.params.tag)
      .then((res) => {
        this.loading = false
        this.designs = res.data
      })
      .catch((e) => console.log(e))
      .finally(() => (this.searching = false))
  },
}
</script>

<style></style>
