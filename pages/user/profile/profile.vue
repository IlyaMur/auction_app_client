<template>
  <div>
    <section class="filters-block designer-profile">
      <div class="container">
        <div
          class="filters text-center d-flex justify-content-center align-items-center"
        >
          <ul
            class="search-filter active-state hover-state list-color font-16 fw-400"
          >
            <li>
              <a class="active" href="#" title="Shots">Работы</a>
              {{ designs.length }}
            </li>
            <li class="m-none">
              <a href="#" title="Projects">Projects</a> 100
            </li>
            <li class="m-none">
              <a href="#" title="Followers">Followers</a>
              15,000
            </li>
          </ul>
          <ul class="filters-dropdown">
            <li class="dropdown">
              <a
                class="dropdown-toggle font-16 fw-400"
                href="#"
                id="popularDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
                title="Popular"
              >
                Popular
              </a>
              <div
                class="dropdown-menu font-14"
                aria-labelledby="popularDropdown"
              >
                <a class="dropdown-item" href="#" title="Recent">Recent</a>
                <a class="dropdown-item" href="#" title="Most Viewed"
                  >Most Viewed</a
                >
                <a class="dropdown-item" href="#" title="Most Commented"
                  >Most Commented</a
                >
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>

    <section class="designer-profile-block mt-4">
      <div class="container">
        <div class="row">
          <!-- LEFT -->
          <div class="col-lg-3">
            <div class="designer-profile-sidebar bg-white p-4 shadow-sm">
              <div class="modal-user-meta text-center">
                <div class="mb-2">
                  <a href="#">
                    <img
                      :src="user.photo_url"
                      width="100"
                      class="mx-auto rounded-circle"
                    />
                    <div class="modal-user-detail mt-2">
                      <h1 class="font-16 fw-500">{{ user.name }}</h1>
                      <p class="font-14 fw-300 mt-1">{{ user.tagline }}</p>
                      <p class="font-14 fw-300 mt-2">
                        {{ user.formatted_address }}
                      </p>
                    </div>
                  </a>
                </div>

                <div class="d-flex justify-content-center">
                  <a
                    href="#"
                    class="btn btn-primary font-14 fw-400 text-white mr-2"
                  >
                    <i class="fas fa-envelope"></i>
                    Написать
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- RIGHT -->
          <div class="col-lg-8">
            <div class="designer-profile-content">
              <div class="row">
                <!-- CARD -->
                <design-profile
                  v-for="design in designs"
                  :key="design.id"
                  :design="design"
                >
                </design-profile>

                <!-- END CARDS -->
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- END ROW -->
    </section>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios, params, error }) {
    try {
      const user = (await $axios.$get(`/user/` + params.name)).data
      const designs = user.designs

      return { user, designs }
    } catch (e) {
      if (e.response.status === 404) {
        error({ statusCode: 404, message: 'Пользователь не был найден' })
      } else {
        error({ statusCode: 500, message: 'Произошла непредвиденная ошибка' })
      }
    }
  },
}
</script>

<style></style>
