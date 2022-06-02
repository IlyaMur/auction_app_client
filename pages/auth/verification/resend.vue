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
            <input
              type="text"
              name="email"
              v-model="form.email"
              class="form-control form-control-lg font-14 fw-300"
              :class="{ 'is-invalid': form.errors.has('email') }"
              placeholder="Email"
            />
            <has-error :form="form" field="email"></has-error>

          </div>

          <div class="text-right">
            <button
              class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase"
              :disabled="form.busy"
            >
              <i class="fas fa-spinner fa-spin"></i>
              Выслать
            </button>
          </div>
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
      form: new Form({
        email: '',
      }),
    }
  },
  methods: {
    submit() {
      this.form
        .post(`/verification/resend`)
        .then((res) => this.form.reset())
        .catch((e) => console.log(e))
    },
  },
}
</script>
