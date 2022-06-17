<template>
  <div class="card w-60 p-2">
    <nuxt-link :to="{ name: 'designs.show', params: { slug: design.slug } }">
      <img
        v-if="design.images.thumbnail"
        class="card-img-top"
        :src="design.images.large"
        alt="louies secondary marks"
      />
    </nuxt-link>
    <div class="card-body py-2 text-center">
      <h5 class="card-title hover-state font-14 fw-500 mb-2">
        <a class="title" href="#">
          <span>{{ design.title }}</span>
        </a>
      </h5>
      <p class="card-text font-12 fw-400">
        <a href="#">
          <span> {{ design.created_at_dates.created_at_human }} </span>
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    design: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style></style>
