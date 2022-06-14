<template>
  <div>
    <section class="filters-block shadow-sm">
      <div class="container">
        <form v-on:submit.prevent="searchByButton">
          <div
            class="filters d-flex justify-content-between align-items-center"
          >
            <ul class="filters-dropdown hide-when-mobile">
              <li class="dropdown">
                <select
                  @change="search"
                  v-model="filters.orderBy"
                  class="custom-select"
                >
                  <option value="latest">Сначала свежие</option>
                  <option value="likes">Больше лайков</option>
                </select>
              </li>
            </ul>
            <div class="d-flex align-items-center">
              <div
                class="custom-control mr-3 custom-checkbox d-flex flex-column"
                style="align-items: flex-start; gap: 3px"
              >
                <div>
                  <input
                    type="checkbox"
                    class="custom-control-input p-3"
                    id="hasComments"
                    v-model="filters.has_comments"
                    true-value="1"
                    false-value="0"
                  />
                  <label class="custom-control-label" for="hasComments"
                    >С комм-ми</label
                  >
                </div>
                <div>
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="hasTeam"
                    v-model="filters.has_team"
                    true-value="1"
                    false-value="0"
                  />
                  <label class="custom-control-label" for="hasTeam"
                    >С командой</label
                  >
                </div>
              </div>
              <div class="custom-control custom-checkbox mr-3"></div>
              <div>
                <div class="input-group mb-0">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Поиск..."
                    v-model="filters.q"
                  />
                  <div class="input-group-append">
                    <button
                      :disabled="searching"
                      class="btn rounded primary-bg-color text-white"
                      type="submit"
                    >
                      <span v-if="searching">
                        <i class="fas fa-spinner fa-spin"></i>
                      </span>
                      Поиск
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
    <section class="cards-block">
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
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      designs: [],
      searching: false,
      filters: {
        has_team: 0,
        has_comments: 0,
        q: '',
        orderBy: 'likes',
      },
    }
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
        .$get(`/search/designs?${this.queryString}`)
        .then((res) => (this.designs = res.data))
        .catch((e) => console.log(e))
        .finally(() => (this.searching = false))
    },
  },
  beforeMount() {
    this.search()
  },
  computed: {
    queryString() {
      return Object.keys(this.filters)
        .map((k) => `${k}=${this.filters[k]}`)
        .join('&')
    },
  },
}
</script>

<style scoped>
@media screen and (max-width: 700px) {
  .hide-when-mobile {
    display: none;
  }
  .filters {
    justify-content: center !important;
  }
}

</style>
