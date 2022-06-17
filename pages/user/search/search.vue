<template>
  <section class="filter-search-section">
    <div class="container-fluid mb-4">
      <div class="row">
        <!-- SEARCH FILTERS -->
        <div class="col-md-3">
          <div class="card text-white bg-secondary">
            <div class="card-header">Поиск</div>
            <div class="card-body">
              <div class="form-group mb-2">
                <label class="text-uppercase font-14 fw-500"
                  >Поиск по местоположению</label
                >
                <input
                  @change="getPlace"
                  v-model="city"
                  type="text"
                  name="skills"
                  class="form-control form-control-lg white-bg-color font-14 fw-300 mt-1"
                  placeholder="Введите город..."
                />
              </div>
              <div class="form-group mb-3">
                в радиусе:
                <input type="text" v-model="filters.distance" /> единицы:
                <select v-model="filters.unit" class="mt-2">
                  <option value="km">км</option>
                  <option value="m">мили</option>
                </select>
                <br />
                <hr />
              </div>
              <div class="form-group ml-4">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="toHire"
                  v-model="filters.available_to_hire"
                  true-value="1"
                  false-value="0"
                />
                <label class="custom-control-label" for="toHire"
                  >В поиске работы</label
                >
              </div>
              <div class="form-group ml-4">
                <input
                  type="checkbox"
                  class="custom-control-input"
                  id="hasDesigns"
                  v-model="filters.has_designs"
                  true-value="1"
                  false-value="0"
                />
                <label class="custom-control-label" for="hasDesigns"
                  >Есть проекты</label
                >
              </div>
              <button
                class="btn btn-primary mt-2"
                @click="getResults"
              >
                Поиск
              </button>
              <!-- <div class="form-group mb-3">Place skills</div> -->
            </div>
          </div>
        </div>

        <!-- SEARCH RESULTS -->
        <div class="col-md-9">
          <!-- Section Designers -->
          <section class="all-designers">
            <!-- Filters -->
            <div class="designers-meta white-bg-color p-2">
              <div class="row align-items-center">
                <div class="col-md-3"></div>
                <div class="col-md-9 text-right">
                  <ul class="sort-list hover-state active-state font-14 fw-400">
                    <li>Сортировать:</li>
                    <li>
                      <a href="#" title="views">По просмотрам</a>
                    </li>
                    <li>-</li>
                    <li>
                      <a href="#" title="rating">По рейтингу</a>
                    </li>
                    <li>-</li>
                    <li>
                      <a href="#" :class="{ 'active': true }" title="rating">Ближайшие</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!--/ end filters -->
            <ul class="designer-listing mt-3" v-if="!loading">
              <li v-if="designers.data[0]">
                <div class="row">
                  <div class="col-lg-6 pr-0 clearfix">
                    <nuxt-link :to="{name: 'users.profile', params: {name: designers.data[0].username}}">
                      <div class="designer-img float-left">
                        <img :src="designers.data[0].photo_url" alt="designer" />
                      </div>
                    </nuxt-link>
                    <designer-card
                      :unit="filters.unit"
                      :designer="designers.data[0]"
                    />
                    <Pagination
                      :limit="-1"
                      class="mt-3"
                      :data="designers"
                      @pagination-change-page="getResults"
                    >
                      <template #prev-nav>
                        <span>&lt; Предыдущий</span>
                      </template>
                      <template #next-nav>
                        <span>Следующий &gt;</span>
                      </template>
                    </Pagination>
                  </div>

                  <!-- Author Cards -->
                  <div class="col-lg-5">
                    <div class="card-slide">
                      <!-- ITEM -->
                      <div class="card-outer">
                        <preview-img
                          class="mt-2"
                          v-for="design in designers.data[0].designs"
                          :key="design.id"
                          :design="design"
                        ></preview-img>
                      </div>

                      <!-- ITEM -->

                      <!-- END SLICK CAROUSEL -->
                    </div>
                  </div>
                </div>
              </li>
              <li class="d-flex justify-content-center mt-5" v-else>
                <div>Никто не найден :(. Попробуйте другие фильтры поиска</div>
              </li>
            </ul>
            <base-spinner v-else class="mt-3"></base-spinner>
          </section>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import LaravelVuePagination from 'laravel-vue-pagination'

export default {
  data() {
    return {
      hasCoords: false,
      coords: '',
      loading: true,
      designers: {},
      city: '',
      filters: {
        unit: 'km',
        distance: '',
        latitude: '',
        longitude: '',
        has_designs: '',
        available_to_hire: '',
      },
    }
  },
  methods: {
    getResults(page = 1) {
      this.$axios
        .$get(`/search/designers?${this.queryString}&page=` + page)
        .then((res) => {
          this.loading = false
          this.designers = res
        })
        .catch((e) => console.log(e))
        .finally(() => (this.searching = false))
    },
    async getPlace() {
      this.checkCoords()

      if (!this.hasCoords) return

      try {
        const resp = await this.$axios.$get(
          'https://geocode-maps.yandex.ru/1.x/?apikey=' +
            this.$config.YANDEX_MAPS_API_KEY +
            '&format=json' +
            '&geocode=' +
            this.city
        )

        const coords = (
          await resp.response.GeoObjectCollection.featureMember[0].GeoObject
            .Point.pos
        ).split(' ')

        this.filters.latitude = coords[0]
        this.filters.longitude = coords[1]
      } catch (error) {
        console.log(error)
      }
    },
    checkCoords() {
      if (this.city === '') {
        this.hasCoords = false
        this.filters.latitude = ''
        this.filters.longitude = ''
        return
      }

      this.hasCoords = true
    },
  },
  components: {
    Pagination: LaravelVuePagination,
  },
  beforeMount() {
    this.getResults()
  },
  computed: {
    queryString() {
      this.filters.distance ||= 100
      return Object.keys(this.filters)
        .filter((k) => this.filters[k] !== '')
        .map((k) => `${k}=${this.filters[k]}`)
        .join('&')
    },
  },
}
</script>
