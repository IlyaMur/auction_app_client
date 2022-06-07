<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Регистрация
      </h1>
      <form class="auth-form" @submit.prevent="submit">
        <client-only>
          <alert-success class="text-center" :form="form">
            Мы отправили вам письмо для активации аккаунта.
          </alert-success>
        </client-only>
        <div class="form-group">
          <base-input
            field="name"
            :form="form"
            v-model="form.name"
            placeholder="Имя"
          ></base-input>
        </div>
        <div class="form-group">
          <base-input
            field="username"
            :form="form"
            v-model.trim="form.username"
            placeholder="Юзернейм"
          ></base-input>
        </div>
        <div class="form-group">
          <base-input
            field="email"
            :form="form"
            v-model.trim="form.email"
            placeholder="Почта"
          ></base-input>
        </div>
        <div class="form-group">
          <base-input
            inputType="password"
            field="password"
            :form="form"
            v-model.trim="form.password"
            placeholder="Пароль"
          ></base-input>
        </div>
        <div class="form-group">
          <base-input
            inputType="password"
            field="password_confirmation"
            :form="form"
            v-model.trim="form.password_confirmation"
            placeholder="Повторите пароль"
          ></base-input>
        </div>
        <div class="text-right">
          <base-button
            :loading="form.busy"
            class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase"
          >
            Регистрация
          </base-button>
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
  middleware: ['guest'],
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
        .then(() => {
          this.form.reset()
        })
        .catch((e) => console.log(e))
    },
  },
}
</script>

<style></style>
