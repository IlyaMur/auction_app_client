<template>
  <section class="authentication">
      <div class="auth-body">
        <h1 class="text-uppercase fw-500 mb-4 text-center font-22">Вход</h1>
        <form @submit.prevent="submit" class="auth-form">
          <alert-error v-if="form.errors.has('message')" :form="form">
            {{ form.errors.get('message') }}

            <div class="mt-3">
              <nuxt-link :to="{ name: 'verification.resend' }"
                >Повторно выслать письмо с активацией</nuxt-link
              >
            </div>
          </alert-error>
          <div class="form-group">
            <input
              type="text"
              name="email"
              v-model="form.email"
              class="form-control form-control-lg font-14 fw-300"
              :class="{ 'is-invalid': form.errors.has('email') }"
              placeholder="Почта"
            />
            <has-error :form="form" field="email"></has-error>
          </div>
          <div class="form-group">
            <input
              type="password"
              name="password"
              v-model="form.password"
              class="form-control form-control-lg font-14 fw-300"
              :class="{ 'is-invalid': form.errors.has('password') }"
              placeholder="Пароль"
            />
            <has-error :form="form" field="password"></has-error>
          </div>
          <div class="mt-4 mb-4 clearfix">
            <nuxt-link
              :to="{ name: 'password.email' }"
              class="forgot-pass color-blue font-14 fw-400"
            >
              Забыли пароль?
            </nuxt-link>
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
              Вход
            </button>
          </div>
          <p class="font-14 fw-400 text-center mt-4">
            Ещё нет аккаунта?
            <nuxt-link class="color-blue" :to="{ name: 'register' }"
              >Создать аккаунт</nuxt-link
            >
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
        email: '',
        password: '',
      }),
    }
  },
  methods: {
    submit() {
      this.$auth
        .loginWith('local', {
          data: this.form,
        })
        .then(() => {
        })
        .catch((e) => {
          this.form.errors.set(e.response.data.errors)
        })
    },
  },
}
</script>
