<template>
  <section class="authentication">
    <client-only>
      <div class="auth-body">
        <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
          Сброс пароля
        </h1>
        <form @submit.prevent="submit" class="auth-form">
          <alert-success :form="form">{{ status }}</alert-success>
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
          <div class="text-center">
            <button
              :disabled="form.busy"
              type="submit"
              class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase"
            >
              <span v-if="form.busy">
                <i class="fas fa-spinner fa-spin"></i>
              </span>
              Отправить ссылку
            </button>
          </div>
          <p class="font-14 fw-400 text-center mt-4">
            <nuxt-link class="color-blue" :to="{ name: 'login' }"
              >Вернуться к Входу</nuxt-link
            >
          </p>
        </form>
      </div>
    </client-only>
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
      this.form
        .post('/password/email')
        .then((res) => {
          this.status = res.data.status
          this.form.reset()
        })
        .catch((e) => {
          console.log(e)
        })
    },
  },
}
</script>
