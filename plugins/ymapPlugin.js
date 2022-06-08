import Vue from 'vue'
import YmapPlugin from 'vue-yandex-maps'

export default function ({ $config }) {
  const settings = {
    apiKey: $config.YANDEX_MAPS_API_KEY,
    lang: 'ru_RU',
    coordorder: 'latlong',
    enterprise: false,
    version: '2.1'
  }

  Vue.use(YmapPlugin, settings);
}

