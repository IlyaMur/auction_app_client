<template>
  <header class="fixed-topx">
    <nav class="navbar navbar-expand-lg navbar-dark align-items-center">
      <nuxt-link
        :to="{ name: 'index' }"
        class="navbar-brand text-uppercase fw-500"
        >MyDesigns</nuxt-link
      >
      <button
        class="navbar-toggler mr-auto"
        type="button"
        data-toggle="collapse"
        data-target="#navbar"
        aria-controls="navbar"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbar">
        <ul class="navbar-nav font-14 fw-300">
          <li class="nav-item active">
            <nuxt-link
              :to="{ name: 'designs.search' }"
              class="nav-link"
              title="Дизайны"
            >
              Дизайны
            </nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link
              :to="{ name: 'users.search' }"
              class="nav-link"
              title="Designers"
            >
              Художники
            </nuxt-link>
          </li>
        </ul>
        <div class="header-search">
          <form @submit.prevent="submit" action="" method="">
            <div class="form-group">
              <input
                v-model="q"
                type="text"
                autocomplete="OFF"
                name="search"
                class="form-control text-white font-14 fw-300"
                placeholder="Поиск..."
              />
              <div class="search-icon text-white">
                <i class="fas fa-search"></i>
              </div>
            </div>
          </form>
        </div>
        <div
          class="upload-shot white-path font-14 fw-500 text-uppercase mr-auto"
        >
          <nuxt-link
            style="max-width: 100px; padding: 3px"
            class="primary-bg-color text-white d-flex justify-content-between align-items-center"
            :to="{ name: 'designs.upload' }"
          >
            <i class="fas fa-cloud-upload-alt"></i> Загрузка
          </nuxt-link>
        </div>
      </div>

      <!-- Before Login -->
      <template v-if="!$auth.loggedIn">
        <ul class="before-login font-14 fw-300 text-uppercase mr-3">
          <li>
            <nuxt-link style="min-width: 110px" :to="{ name: 'register' }">
              Регистрация
            </nuxt-link>
          </li>
          <li>
            <nuxt-link :to="{ name: 'login' }">Вход</nuxt-link>
          </li>
        </ul>
      </template>
      <template v-else>
        <ul class="author-page white-path">
          <!-- Profile Dropdown -->
          <li class="dropdown">
            <a
              href="#"
              class="dropdown-toggle text-white"
              id="userDropdown"
              role="button"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                :src="$auth.user.data.photo_url"
                class="user-thumb"
                alt="user avatar"
              />
              <div class="usr-info">
                <span class="user-name font-14 fw-500">{{
                  $auth.user.data.name
                }}</span>
                <span class="user-deg font-10 fw-300">{{
                  $auth.user.data.tagline || ''
                }}</span>
                <span class="down-chevron">
                  <i class="fa fa-angle-down"></i>
                </span>
              </div>
            </a>
            <div
              class="dropdown-menu user-dropdown font-14 fw-500"
              aria-labelledby="userDropdown"
            >
              <div class="dropdown-title-group font-12 fw-500">
                <span class="dropdown-title text-uppercase">Ваш аккаунт</span>
              </div>
              <nuxt-link
                :to="{ name: 'settings.profile' }"
                class="dropdown-item mt-28"
                title="Profile"
              >
                <i class="fa fa-user"></i>
                Профиль
              </nuxt-link>
              <nuxt-link
                :to="{ name: 'settings.dashboard' }"
                class="dropdown-item"
                title="Панель управления"
              >
                <i class="fa fa-tachometer-alt"></i>
                Панель управления
              </nuxt-link>
              <a class="dropdown-item" href="#" title="Setting">
                <i class="fa fa-cogs"></i>
                Настройки
              </a>
              <div class="dropdown-divider"></div>
              <a
                @click.prevent="logout"
                class="dropdown-item"
                href="#"
                title="Выход"
              >
                <i class="fa fa-lock"></i>
                Выход
              </a>
            </div>
          </li>
          <!-- End Profile Dropdown -->
        </ul>
      </template>

      <!-- End After Login -->
    </nav>
  </header>
</template>

<script>
export default {
  data() {
    return {
      q: '',
    }
  },
  methods: {
    submit() {
      window.location.replace('/designs/?q=' + this.q)
    },
    logout() {
      this.$auth.logout()
    },
  },
}
</script>

<style></style>
