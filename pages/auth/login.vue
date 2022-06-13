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
          <base-input
            field="email"
            :form="form"
            v-model="form.email"
            placeholder="Почта"
          ></base-input>
        </div>
        <div class="form-group">
          <base-input
            field="password"
            inputType="password"
            :form="form"
            v-model="form.password"
            placeholder="Пароль"
          ></base-input>
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
          <base-button
            class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase"
            :loading="form.busy"
          >
            Войти
          </base-button>
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
  middleware: ['guest'],
  data() {
    return {
      evalue: '',
      form: new Form({
        email: '',
        password: '',
      }),
    }
  },
  methods: {
    submit() {
      this.$auth
        .loginWith('laravelJWT', {
          data: this.form,
        })
        .then(() => {})
        .catch((e) => {
          this.form.errors.set(e.response.data.errors)
        })
    },
  },
}
</script>
