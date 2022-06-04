<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Сброс старого пароля
      </h1>
      <form @submit.prevent="submit" class="auth-form">
        <alert-success :form="form">
          {{ status }}
          <p v-if="status">
            <nuxt-link :to="{ name: 'login' }">Войти</nuxt-link>
          </p>
        </alert-success>
        <alert-error v-if="form.errors.has('message')" :form="form">
          {{ form.errors.get('message') }}
        </alert-error>
        <div class="form-group">
          <base-input
            :readonly="true"
            field="email"
            :form="form"
            v-model="form.email"
            placeholder="Почта"
          ></base-input>
        </div>
        <div class="form-group">
          <input
            type="password"
            name="password"
            v-model.trim="form.password"
            class="form-control form-control-lg font-14 fw-300"
            :class="{ 'is-invalid': form.errors.has('password') }"
            placeholder="Пароль"
          />
          <has-error :form="form" field="password"></has-error>
        </div>
        <div class="form-group">
          <input
            type="password"
            name="password_confirmation"
            v-model.trim="form.password_confirmation"
            class="form-control form-control-lg font-14 fw-300"
            :class="{
              'is-invalid': form.errors.has('password_confirmation'),
            }"
            placeholder="Подтвердите новый пароль"
          />
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
            :loading="form.busy"
            class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase"
          >
            Изменить пароль
          </base-button>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import { Form } from 'vform'

export default {
  middleware: ['guest'],
  created() {
    this.form.email = this.$route.query.email
    this.form.token = this.$route.params.token
  },
  data() {
    return {
      status: '',
      form: new Form({
        email: '',
        password: '',
        password_confirmation: '',
        token: '',
      }),
    }
  },
  methods: {
    submit() {
      this.form
        .post('/password/reset')
        .then((res) => {
          this.status = res.data.status
        })
        .catch((e) => {
          this.form.errors.set(e.response.data)
        })
    },
  },
}
</script>

<style></style>
