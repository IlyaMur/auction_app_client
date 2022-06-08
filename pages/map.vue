<template>
  <section class="container">
    <client-only>
      <div v-if="isMounted">
        <yandex-map :coords="coords" :controls="['searchControl']" class="map">
          <ymap-marker
            @click="onClick"
            markerId="123"
            marker-type="placemark"
            hint-content="element.hint"
            :coords="[54, 39]"
          ></ymap-marker>
        </yandex-map>
      </div>
    </client-only>
  </section>
</template>

<script>
export default {
  data: () => ({
    isMounted: false,
    coords: [54.82896654088406, 39.831893822753904],
  }),
  methods: {
    onClick(e) {
      console.log(this.coords)
      this.coords = e.get('coords')
    },
  },
  mounted() {
    this.isMounted = true
  },
}
</script>

<style>
.ymap-container {
  height: 600px;
}
</style>
