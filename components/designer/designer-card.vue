<template>
  <div class="designer-meta">
    <div class="designer-title hover-state">
      <a class="font-16 fw-500" href="#" title="Neba Funwi-Gabga">{{
        designer.name
      }}</a>
    </div>
    <div
      v-if="designer.formatted_address"
      class="designer-address font-14 fw-300 mt-1"
    >
      {{ designer.formatted_address }}
    </div>

    <ul class="icon-list white-path mt-2">
      <li>
        <a class="secondary-bg-color text-white font-12" href="#">
          <i class="fas fa-plus"></i>
        </a>
      </li>
      <li>
        <a class="secondary-bg-color text-white active font-12" href="#">
          <i class="fas fa-share"></i>
        </a>
      </li>
      <li>
        <a class="primary-bg-color text-white font-12" href="#">
          <i class="fas fa-envelope"></i>
        </a>
      </li>
      <li>
        <a class="secondary-bg-color text-white font-12" href="#">
          <i class="fas fa-list"></i>
        </a>
      </li>
    </ul>
    <p class="font-13 fw-300 mt-1">
      {{ designer.tagline }}
    </p>
    <div class="mt-3" v-if="designer.distance">
      Расстояние от вас: {{ designer.distance }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    designer: {
      type: Object,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
  },
}
</script>

<style></style>
