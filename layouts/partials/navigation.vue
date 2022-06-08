<template>
  <header class="fixed-topx">
    <nav class="navbar navbar-expand-lg navbar-dark align-items-center">
      <nuxt-link
        :to="{ name: 'index' }"
        class="navbar-brand text-uppercase fw-500"
        title="Project Name"
        >MyDesign</nuxt-link
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
            <a class="nav-link" href="#" title="Shots">Дизайны</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#" title="Designers"> Дизайнеры </a>
          </li>
        </ul>
        <div class="header-search">
          <form action="" method="">
            <div class="form-group">
              <input
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
            class="primary-bg-color text-white"
            :to="{ name: 'designs.upload' }"
          >
            <i class="fas fa-cloud-upload-alt"></i> Загрузка
          </nuxt-link>
        </div>
      </div>

      <!-- Before Login -->
      <template v-if="!$auth.loggedIn">
        <ul class="before-login font-14 fw-300 text-uppercase">
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
              <nuxt-img
                :src="$auth.user.photo_url"
                class="user-thumb"
                alt="user avatar"
              />
              <div class="usr-info">
                <span class="user-name font-14 fw-500">{{
                  $auth.user.name
                }}</span>
                <span class="user-deg font-10 fw-300">{{
                  $auth.user.tagline || ''
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
                title="Sign Out"
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
  methods: {
    logout() {
      this.$auth.logout()
    },
  },
}
</script>

<style></style>
