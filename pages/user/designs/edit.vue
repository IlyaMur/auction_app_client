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
            <div class="card-body p-1">
              <img src="some" class="w-100 mb-4" />
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <form class="auth-form">
                <alert-success :form="form">
                  Design successfully updated
                </alert-success>
                <div class="form-group">
                  <base-input
                    :form="form"
                    field="title"
                    v-model="form.title"
                    placeholder="Enter a title"
                  ></base-input>
                </div>
                <div class="form-group">
                  <textarea name="" id="" cols="30" rows="10">42</textarea>
                </div>
                <div class="form-group">
                  <client-only>
                    <input type="text" placeholder="42">
                  </client-only>
                </div>
                <template>
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
                      Assign to team
                    </label>
                  </div>
                  <div class="form-group">
                    <select
                      class="custom-select"
                      :class="{ 'is-invalid': form.errors.has('team') }"
                      v-model="form.team"
                    >
                      <option :value="null">Select a team</option>
                      <option>
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
                    Publish this design
                  </label>
                </div>

                <div class="text-right">
                  <nuxt-link :to="{ name: 'settings.designs' }"
                    >Cancel</nuxt-link
                  >
                  <base-button :loading="form.busy">
                    Update Design
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
import { Form } from 'vform'

export default {
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
    submit() {},
  },
  mounted() {},
  async asyncData({ $axios, params, error, redirect }) {
    try {
      const design = await $axios.get(`/designs/${params.id}`)

      return {design: design.data}
    } catch (e) {}
  },
}
</script>

<style></style>
