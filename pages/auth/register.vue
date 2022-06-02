<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Регистрация
      </h1>
      <form class="auth-form" @submit.prevent="submit">
        <alert-success class="text-center" :form="form">
          Мы отправили вам письмо для активации аккаунта.
        </alert-success>
        <div class="form-group">
          <input
            type="text"
            v-model.trim="form.name"
            name="name"
            :class="{ 'is-invalid': form.errors.has('name') }"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Имя"
          />
          <has-error :form="form" field="name"></has-error>
        </div>
        <div class="form-group">
          <input
            type="text"
            v-model.trim="form.username"
            name="username"
            :class="{ 'is-invalid': form.errors.has('username') }"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Желаемый юзернейм"
          />
          <has-error :form="form" field="username"></has-error>
        </div>
        <div class="form-group">
          <input
            type="text"
            v-model.trim="form.email"
            name="email"
            :class="{ 'is-invalid': form.errors.has('email') }"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Почта"
          />
          <has-error :form="form" field="email"></has-error>
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model.trim="form.password"
            name="password"
            :class="{ 'is-invalid': form.errors.has('password') }"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Пароль"
          />
          <has-error :form="form" field="password"></has-error>
        </div>
        <div class="form-group">
          <input
            type="password"
            v-model.trim="form.password_confirmation"
            name="password_confirmation"
            class="form-control form-control-lg font-14 fw-300"
            placeholder="Подтверждение пароля"
          />
        </div>

        <div class="text-right">
          <button
            :disabled="form.busy"
            type="submit"
            class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase"
          >
            <span v-if="form.busy">
              <i class="fas fa-spinner fa-spin"></i>
            </span>

            Регистрация
          </button>
        </div>

        <p class="font-14 fw-400 text-center mt-4">
          Уже есть аккаунт?
          <nuxt-link class="color-blue" :to="{ name: 'login' }">Вход</nuxt-link>
        </p>
      </form>
    </div>
  </section>
</template>

<script>
import { Form } from 'vform'

export default {
  data() {
    return {
      form: new Form({
        username: '',
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }),
    }
  },
  methods: {
    submit() {
      this.form
        .post(`/register`)
        .then((res) => {
          this.form.reset()
        })
        .catch((e) => console.log(e))
    },
  },
}
</script>

<style></style>
