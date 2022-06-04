<template>
  <section class="authentication">
    <client-only>
      <div class="auth-body">
        <h1 class="text-uppercase fw-500 mb-4 text-center font-22">
          Выслать активацию повторно
        </h1>
        <form class="auth-form" @submit.prevent="submit">
          <alert-error v-if="form.errors.has('message')" :form="form">
            {{ form.errors.get('message') }}
          </alert-error>
          <alert-success :form="form">
            Мы отправили вам на почту письмо с активацией
          </alert-success>
          <div class="form-group">
            <base-input
              field="email"
              :form="form"
              v-model="form.email"
              placeholder="Почта"
            ></base-input>
          </div>

          <div class="text-right">
            <base-button
              :loading="form.busy"
              class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase"
            >
              Выслать
            </base-button>
          </div>
        </form>
      </div>
    </client-only>
  </section>
</template>

<script>
import { Form } from 'vform'

export default {
  middleware: ['guest'],
  data() {
    return {
      form: new Form({
        email: '',
      }),
    }
  },
  methods: {
    submit() {
      this.form.post(`/verification/resend`).then((res) => this.form.reset())
    },
  },
}
</script>
