<template>
  <div>
    <section
      v-if="!$auth.loggedIn"
      class="hero text-center bg-light shadow-sm text-blue"
    >
      <div class="container">
        <h1 class="font-28 fw-600 text-uppercase">
          Над чем сейчас кипит работа?
        </h1>
        <p class="font-16 fw-400">
          MyDesigns место, где дизайнеры находят вдохновение
        </p>
        <nuxt-link
          :to="{ name: 'register' }"
          class="mt-4 btn btn-danger font-16 fw-400"
          >Присоединяйтесь!</nuxt-link
        >
      </div>
    </section>
    <section class="filters-block shadow-sm">
      <div class="container">
        <form v-on:submit.prevent="searchByButton">
          <div
            class="filters d-flex justify-content-between align-items-center"
          >
            <ul class="filters-dropdown hide-when-mobile">
              <li class="dropdown">
                <select
                  @change="getResults"
                  v-model="filters.orderBy"
                  class="custom-select"
                >
                  <option value="popular">Популярные</option>
                  <option value="likes">Больше лайков</option>
                  <option value="latest">Сначала свежие</option>
                </select>
              </li>
            </ul>
            <div class="d-flex align-items-center">
              <div
                class="custom-control custom-checkbox d-flex flex-column"
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
                    >С комментариями</label
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
      <template v-if="!loading">
        <div class="container">
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
    <div class="d-flex justify-content-center fixed-bottom" style="margin-bottom: 60px">
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
      searching: false,
      filters: {
        has_team: 0,
        has_comments: 0,
        q: '',
        orderBy: 'popular',
      },
    }
  },
  methods: {
    searchByFilter() {
      this.getResults()
    },
    searchByButton() {
      this.searching = true
      this.getResults()
    },
    getResults(page = 1) {
      this.$axios
        .$get(`/search/designs?${this.queryString}&page=` + page)
        .then((res) => {
          this.loading = false
          this.designs = res
        })
        .catch((e) => console.log(e))
        .finally(() => (this.searching = false))
    },
  },
  beforeMount() {
    if (this.$route.query.q) {
      this.filters.q = this.$route.query.q
    }

    this.getResults()
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
