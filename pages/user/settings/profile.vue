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

            <template v-if="hasCoords">
              Ваше местоположение:
              {{ form.formatted_address }}
            </template>
            <div class="form-group mt-2 custom-control custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                id="showMap"
                v-model="showMap"
              />
              <label class="custom-control-label" value="true" for="showMap">
                {{ hasCoords ? 'Изменить' : 'Указать' }} местоположение
              </label>
            </div>

            <div class="form-group" v-if="showMap">
              <span class="font-16">Выберите местоположение:</span>

              <p class="font-14 mb-3 mt-1">
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
      showMap: false,
      coords: [],
      form: new Form({
        name: '',
        about: '',
        tagline: '',
        formatted_address: '',
        location: { longitude: null, latitude: null },
        available_to_hire: false,
      }),
    }
  },
  methods: {
    async getPlace() {
      try {
        const resp = await this.$axios.get(
          'https://geocode-maps.yandex.ru/1.x/?apikey=' +
            this.$config.YANDEX_MAPS_API_KEY +
            '&format=json' +
            '&geocode=' +
            this.coords[1] +
            ',' +
            this.coords[0]
        )
        this.place = await resp.data.response.GeoObjectCollection
          .featureMember[1].GeoObject.description
      } catch (error) {
        console.log(error)
      }
    },
    onClick(e) {
      this.coords = e.get('coords')
    },
    async update() {
      if (this.showMap) {
        await this.getPlace()
        this.form.update({
          formatted_address: this.place,
          location: {
            longitude: this.coords[0],
            latitude: this.coords[1],
          },
        })
      }

      this.form
        .put(`/settings/profile`)
        .then((res) => {
          console.log(res)
        })
        .catch((e) => console.log(e))
    },
  },

  filters: {
    roundCoords(values) {
      return Math.round(values * 100) / 100
    },
  },

  async asyncData(context) {
    const hasCoords = context.$auth.user.location?.coordinates

    const coords = [
      context.$auth.user.location?.coordinates[0] || 55.7471259277933, // default coordinates if null (Moscow city)
      context.$auth.user.location?.coordinates[1] || 37.61220483593749,
    ]
    return { coords, hasCoords }
  },

  mounted() {
    Object.keys(this.form).forEach((key) => {
      if (this.$auth.user.hasOwnProperty(key)) {
        this.form[key] = this.$auth.user[key]
      }
    })
  },
}
</script>

<style>
.ymap-container {
  height: 375px;
  width: 375px;
}
</style>
