<template>
  <section class="authentication">
    <div class="auth-body">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
        Сброс пароля
      </h1>
      <form @submit.prevent="submit" class="auth-form">
        <alert-success :form="form">{{ status }}</alert-success>
        <div class="form-group">
          <base-input
            field="email"
            :form="form"
            v-model="form.email"
            placeholder="Почта"
          ></base-input>
        </div>
        <div class="text-center">
          <base-button
            class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase"
            :loading="form.busy"
          >
            Отправить ссылку
          </base-button>
        </div>
        <p class="font-14 fw-400 text-center mt-4">
          <nuxt-link class="color-blue" :to="{ name: 'login' }"
            >Вернуться к Входу</nuxt-link
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
      status: '',
      form: new Form({
        email: '',
      }),
    }
  },
  methods: {
    submit() {
      this.form.post('/password/email').then((res) => {
        this.status = res.data.status
        this.form.reset()
      })
    },
  },
}
</script>
