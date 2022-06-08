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
            <div class="form-group">
              <span class="font-16">Выберите местоположение:</span>

              <p class="font-14 mb-3 mt-1">
                {{ place }}
                <br />
                {{ coords[0] | roundCoords }} /
                {{ coords[1] | roundCoords }}
              </p>

              <template>
                <yandex-map
                  :coords="coords"
                  :controls="['searchControl']"
                  :init-without-markers="false"
                  :zoom="10"
                  @click="onClick"
                  @actionend="onActionEnd"
                >
                  <ymap-marker
                    @click="onClick"
                    :coords="coords"
                    marker-id="123"
                    hint-content="Где Вы сейчас находитесь?"
                  />
                </yandex-map>
              </template>
            </div>
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
      place: '',
      coords: [],
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
    onClick(e) {
      this.coords = e.get('coords')
    },
    onActionEnd() {
      this.getPlace()
    },
    update() {},
    async getPlace() {
      await this.$axios
        .get(
          'https://geocode-maps.yandex.ru/1.x/?apikey=' +
            this.$config.YANDEX_MAPS_API_KEY +
            '&format=json' +
            '&geocode=' +
            this.coords[1] +
            ',' +
            this.coords[0]
        )
        .then((res) => {
          this.place =
            res.data.response.GeoObjectCollection.featureMember[1].GeoObject.description
        })
    },
  },

  filters: {
    roundCoords(values) {
      return Math.round(values * 100) / 100
    },
  },

  async asyncData(context) {
    const coords = [
      context.$auth.user.location?.coordinates[0] || 55.7471259277933, // default coordinates if null (Moscow city)
      context.$auth.user.location?.coordinates[1] || 37.61220483593749,
    ]
    return { coords }
  },

  mounted() {
    Object.keys(this.form).forEach((key) => {
      if (this.$auth.user.hasOwnProperty(key)) {
        this.form[key] = this.$auth.user[key]
      }
    })

    this.getPlace()
  },
}
</script>

<style>
.ymap-container {
  height: 375px;
  width: 375px;
}
</style>
