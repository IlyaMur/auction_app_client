<template>
  <div>
    <section class="hero text-center bg-secondary mb-4 text-white">
      <div class="container">
        <h1 class="font-28 fw-600 text-uppercase">Редактирование дизайна</h1>
      </div>
    </section>

    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body p-1" v-if="design.data.images">
              <nuxt-img :src="design.data.images.large" class="w-100 mb-4" />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <form class="auth-form" @submit.prevent="submit">
                <alert-success :form="form">
                  Дизайн успешно обновлен
                </alert-success>
                <div class="form-group">
                  <base-input
                    :form="form"
                    field="title"
                    v-model="form.title"
                    placeholder="Заголовок..."
                  ></base-input>
                </div>
                <div class="form-group">
                  <base-textarea
                    :form="form"
                    field="description"
                    v-model="form.description"
                    placeholder="Описание дизайна..."
                  ></base-textarea>
                </div>
                <div class="form-group">
                  <client-only>
                    <better-input-tag
                      :tags="form.tags"
                      placeholder="Тэги через запятую"
                      on-paste-delimiter=","
                    ></better-input-tag>
                  </client-only>
                </div>
                <template v-if="teams.data.length">
                  <div class="form-group custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      class="custom-control-input"
                      id="assign_to_team"
                      v-model="form.assign_to_team"
                    />
                    <label
                      class="custom-control-label"
                      value="true"
                      for="assign_to_team"
                    >
                      Закрепить за командой
                    </label>
                  </div>
                  <div class="form-group">
                    <select
                      :class="{ 'is-invalid': form.errors.has('team') }"
                      :disabled="!form.assign_to_team"
                      class="custom-select"
                      v-model="form.team"
                    >
                      <option :value="null">Выберите команду</option>
                      <option
                        v-for="team in teams.data"
                        :key="team.id"
                        :value="team.id"
                      >
                        {{ team.name }}
                      </option>
                    </select>
                    <has-error :form="form" field="team"></has-error>
                  </div>
                </template>
                <div class="form-group custom-control custom-checkbox">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    id="is_live"
                    v-model="form.is_live"
                  />
                  <label
                    class="custom-control-label"
                    value="true"
                    for="is_live"
                  >
                    Опубликовать этот дизайн
                  </label>
                </div>

                <div class="text-right">
                  <a href="#">Отменить </a>
                  <base-button
                    class="btn btn-primary primary-bg-color font-16 fw-500 text-uppercase"
                    :loading="form.busy"
                  >
                    Обновить дизайн
                  </base-button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BetterInputTag from 'better-vue-input-tag'
import { Form } from 'vform'

export default {
  middleware: ['auth'],
  components: {
    BetterInputTag,
  },
  data() {
    return {
      form: new Form({
        title: '',
        description: '',
        is_live: '',
        tags: [],
        assign_to_team: false,
        team: null,
      }),
    }
  },
  methods: {
    submit() {
      this.form
        .put(`/designs/${this.$route.params.id}`)
        .then((res) => {
          setTimeout(() => {
            this.$router.push({ name: 'settings.dashboard' })
          }, 1000)
        })
        .catch((e) => console.log(e.response))
    },
  },
  mounted() {
    if (!this.design) return

    Object.keys(this.form).forEach((key) => {
      if (this.design.data.hasOwnProperty(key)) {
        this.form[key] = this.design.data[key]
      }
    })

    this.form.tags = this.design.data.tag_list.tags || []

    if (this.design.data.team) {
      this.form.team = this.design.data.team.id
      this.form.assign_to_team = true
    } else {
      this.form.assign_to_team = false
    }

    this.imgURL = this.design.data.images.large
  },
  async asyncData({ $axios, params, error, redirect }) {
    try {
      const design = await $axios.get(`/designs/${params.id}/byUser`)
      const teams = await $axios.get(`/users/teams/`)

      return { design: design.data, teams: teams.data }
    } catch (e) {
      if (e.response.status === 404) {
        error({ statusCode: 404, message: 'Дизайн не был найден' })
      } else {
        error({ statusCode: 500, message: 'Произошла непредвиденная ошибка' })
      }
    }
  },
}
</script>

<style></style>
