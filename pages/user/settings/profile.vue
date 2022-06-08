<template>
  <div class="settings-block">
    <div class="setting-title font-16 fw-500">Редактирование профиля</div>

    <div class="setting-body white-bg-color">
      <form @submit.prevent="update" class="custom-form">
        <div class="row">
          <div class="col-md-6">
            <client-only>
              <alert-success :form="form">
                Информация успешно обновлена
              </alert-success>
            </client-only>
            <div class="form-group">
              <base-input
                :form="form"
                field="name"
                v-model="form.name"
                placeholder="Имя"
              >
              </base-input>
            </div>
            <div class="form-group">
              <base-input
                :form="form"
                field="tagline"
                v-model="form.tagline"
                placeholder="Девиз"
              >
              </base-input>
            </div>
            <div class="form-group">Местоположение</div>
            <div class="form-group">
              <base-textarea
                :form="form"
                :rows="4"
                field="about"
                v-model="form.about"
                placeholder="Пожалуйста, напишите что-нибудь о себе."
              >
              </base-textarea>
            </div>
            <div class="form-group custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="available_to_hire"
                v-model="form.available_to_hire"
              />
              <label
                class="custom-control-label"
                value="true"
                for="available_to_hire"
              >
                В поисках работы?
              </label>
            </div>
            <div class="text-right">
              <base-button
                class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase"
                :loading="form.busy"
                >Обновить профиль</base-button
              >
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { Form } from 'vform'

export default {
  data() {
    return {
      form: new Form({
        name: '',
        about: '',
        tagline: '',
        formatted_address: '',
        location: {},
        available_to_hire: false,
      }),
    }
  },
  methods: {
    update() {},
  },
  mounted() {
    Object.keys(this.form).forEach((key) => {
      if (this.$auth.user.hasOwnProperty(key)) {
        this.form[key] = this.$auth.user[key]
      }
    })
    this.form.location = {
      longitude: this.$auth.user.location.coordinates[0],
      latitude: this.$auth.user.location.coordinates[1],
    }
  },
}
</script>
