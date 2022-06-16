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
                  v-model="filters.city"
                  type="text"
                  name="skills"
                  class="form-control form-control-lg white-bg-color font-14 fw-300 mt-1"
                  placeholder="Введите город..."
                />
              </div>
              <div class="form-group mb-3">
                в радиусе <input type="text" v-model="filters.radius" />
                <select v-model="filters.mesure">
                  <option value="km">км</option>
                  <option value="m">миль</option>
                </select>

                <button class="btn btn-primary mt-2">Поиск</button>
              </div>
              <!-- <div class="form-group mb-3">Place skills</div> -->
            </div>
          </div>
        </div>

        <!-- SEARCH RESULTS -->
        <div class="col-md-9">
          <!-- Section Designers -->
          <section class="all-designers">
            <!-- Filters -->
            <div class="designers-meta white-bg-color">
              <div class="row align-items-center">
                <div class="col-md-3">
                  <select class="custom-select font-14 fw-300">
                    <option selected>Designers & Teams</option>
                    <option value="1">Designers</option>
                    <option value="2">Design teams</option>
                  </select>
                </div>
                <div class="col-md-9 text-right">
                  <ul class="sort-list hover-state active-state font-14 fw-400">
                    <li>Sort:</li>
                    <li>
                      <a class="active" href="#" title="Trending">Trending</a>
                    </li>
                    <li>-</li>
                    <li>
                      <a href="#" title="Followers">Followers</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <!--/ end filters -->
            <ul class="designer-listing" v-if="!loading">
              <li>
                <div class="row align-items-center">
                  <div class="col-lg-4 pr-0 clearfix">
                    <div class="designer-img float-left">
                      <img src="assets/images/profile.png" alt="Neba" />
                    </div>
                    <div class="designer-meta">
                      <div class="designer-title hover-state">
                        <a
                          class="font-16 fw-500"
                          href="#"
                          title="Neba Funwi-Gabga"
                          >Neba Funwi-Gabga</a
                        >
                      </div>
                      <div class="designer-address font-14 fw-300 mt-1">
                        San Francisco, CA /
                        <a href="#"><strong>115,000</strong> followers</a>
                      </div>
                      <ul class="icon-list white-path mt-2">
                        <li>
                          <a
                            class="secondary-bg-color text-white font-12"
                            href="#"
                          >
                            <i class="fas fa-plus"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            class="secondary-bg-color text-white active font-12"
                            href="#"
                          >
                            <i class="fas fa-share"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            class="primary-bg-color text-white font-12"
                            href="#"
                          >
                            <i class="fas fa-envelope"></i>
                          </a>
                        </li>
                        <li>
                          <a
                            class="secondary-bg-color text-white font-12"
                            href="#"
                          >
                            <i class="fas fa-list"></i>
                          </a>
                        </li>
                      </ul>
                      <p class="font-13 fw-300 mt-1">
                        Agency in SF, NY, LA and Iceland. Clients: Google,
                        Reuters, Apple, Facebook, Uber, ESPN, Red Bull, Samsung,
                        Airbnb, V...
                      </p>
                      <ul class="tags-list font-12 fw-300 mt-1 hover-state">
                        <li>
                          <a href="#" title="illustration">illustration</a>
                        </li>
                        ,
                        <li>
                          <a href="#" title="logo">logo</a>
                        </li>
                        ,
                        <li>
                          <a href="#" title="icon">icon</a>
                        </li>
                        ,
                        <li>
                          <a href="#" title="strategy">strategy</a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <!-- Author Cards -->
                  <div class="col-lg-8">
                    <div class="card-slide">
                      <!-- ITEM -->
                      <div class="card-outer">
                        <div class="card">
                          <a href="#">
                            <img
                              class="card-img-top"
                              src="http://via.placeholder.com/350x250"
                              alt="louies secondary marks"
                            />
                          </a>
                          <div class="card-body py-2 text-center">
                            <h5
                              class="card-title hover-state font-14 fw-500 mb-2"
                            >
                              <a class="title" href="#">
                                <span>Shot Title</span>
                              </a>
                            </h5>
                            <p class="card-text font-12 fw-400">
                              <a href="#">
                                <span>8 hrs ago</span>
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>

                      <!-- ITEM -->
                      <div class="card-outer">
                        <div class="card">
                          <a href="#">
                            <img
                              class="card-img-top"
                              src="http://via.placeholder.com/350x250"
                              alt="louies secondary marks"
                            />
                          </a>
                          <div class="card-body py-2 text-center">
                            <h5
                              class="card-title hover-state font-14 fw-500 mb-2"
                            >
                              <a class="title" href="#">
                                <span>Shot Title</span>
                              </a>
                            </h5>
                            <p class="card-text font-12 fw-400">
                              <a href="#">
                                <span>8 hrs ago</span>
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>

                      <!-- ITEM -->
                      <div class="card-outer">
                        <div class="card">
                          <a href="#">
                            <img
                              class="card-img-top"
                              src="http://via.placeholder.com/350x250"
                              alt="louies secondary marks"
                            />
                          </a>
                          <div class="card-body py-2 text-center">
                            <h5
                              class="card-title hover-state font-14 fw-500 mb-2"
                            >
                              <a class="title" href="#">
                                <span>Shot Title</span>
                              </a>
                            </h5>
                            <p class="card-text font-12 fw-400">
                              <a href="#">
                                <span>8 hrs ago</span>
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>

                      <!-- ITEM -->
                      <div class="card-outer">
                        <div class="card">
                          <a href="#">
                            <img
                              class="card-img-top"
                              src="http://via.placeholder.com/350x250"
                              alt="louies secondary marks"
                            />
                          </a>
                          <div class="card-body py-2 text-center">
                            <h5
                              class="card-title hover-state font-14 fw-500 mb-2"
                            >
                              <a class="title" href="#">
                                <span>Shot Title</span>
                              </a>
                            </h5>
                            <p class="card-text font-12 fw-400">
                              <a href="#">
                                <span>8 hrs ago</span>
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>

                      <!-- ITEM -->
                      <div class="card-outer">
                        <div class="card">
                          <a href="#">
                            <img
                              class="card-img-top"
                              src="http://via.placeholder.com/350x250"
                              alt="louies secondary marks"
                            />
                          </a>
                          <div class="card-body py-2 text-center">
                            <h5
                              class="card-title hover-state font-14 fw-500 mb-2"
                            >
                              <a class="title" href="#">
                                <span>Shot Title</span>
                              </a>
                            </h5>
                            <p class="card-text font-12 fw-400">
                              <a href="#">
                                <span>8 hrs ago</span>
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>

                      <!-- ITEM -->
                      <div class="card-outer">
                        <div class="card">
                          <a href="#">
                            <img
                              class="card-img-top"
                              src="http://via.placeholder.com/350x250"
                              alt="louies secondary marks"
                            />
                          </a>
                          <div class="card-body py-2 text-center">
                            <h5
                              class="card-title hover-state font-14 fw-500 mb-2"
                            >
                              <a class="title" href="#">
                                <span>Shot Title</span>
                              </a>
                            </h5>
                            <p class="card-text font-12 fw-400">
                              <a href="#">
                                <span>8 hrs ago</span>
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>

                      <!-- ITEM -->
                      <div class="card-outer">
                        <div class="card">
                          <a href="#">
                            <img
                              class="card-img-top"
                              src="http://via.placeholder.com/350x250"
                              alt="louies secondary marks"
                            />
                          </a>
                          <div class="card-body py-2 text-center">
                            <h5
                              class="card-title hover-state font-14 fw-500 mb-2"
                            >
                              <a class="title" href="#">
                                <span>Shot Title</span>
                              </a>
                            </h5>
                            <p class="card-text font-12 fw-400">
                              <a href="#">
                                <span>8 hrs ago</span>
                              </a>
                            </p>
                          </div>
                        </div>
                      </div>

                      <!-- END SLICK CAROUSEL -->
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <base-spinner v-else></base-spinner>
          </section>
          <Pagination
            class="mt-3"
            :data="designers"
            @pagination-change-page="getResults"
          >
            <template #prev-nav>
              <span>&lt; Назад</span>
            </template>
            <template #next-nav>
              <span>Вперед &gt;</span>
            </template>
          </Pagination>
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
      coords: '',
      loading: true,
      designers: {},
      filters: {
        mesure: 'km',
        city: '',
        radius: '',
      },
      queryString: '',
    }
  },
  methods: {
    getResults(page = 1) {
      this.$axios
        .$get(`/search/designers?${this.queryString}?page=` + page)
        .then((res) => {
          this.loading = false
          this.designers = res
        })
        .catch((e) => console.log(e))
        .finally(() => (this.searching = false))
    },
    async getPlace() {
      try {
        const resp = await this.$axios.$get(
          'https://geocode-maps.yandex.ru/1.x/?apikey=' +
            this.$config.YANDEX_MAPS_API_KEY +
            '&format=json' +
            '&geocode=' +
            this.filters.city
        )
        this.coords = (
          await resp.response.GeoObjectCollection.featureMember[1].GeoObject
            .Point.pos
        ).split(' ')
      } catch (error) {
        console.log(error)
      }
    },
  },
  components: {
    Pagination: LaravelVuePagination,
  },
  beforeMount() {
    if (this.$route.query.q) {
      this.filters.q = this.$route.query.q
    }

    this.getResults()
  },
}
</script>

<style></style>
