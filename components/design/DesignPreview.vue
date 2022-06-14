<template>
  <li class="col-md-6">
    <nuxt-link
      class="img-container w-100"
      style="overflow: hidden"
      :to="{
        name: 'designs.show',
        params: { slug: preview.slug },
      }"
    >
      <img class="image w-100" :src="preview.images.thumbnail" alt="Image" />
      <div class="overlay">
        <div class="text">{{ preview.title }}</div>
      </div>
    </nuxt-link>
  </li>
</template>

<script>
export default {
  props: {
    preview: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style scoped>
.img-container {
  position: relative;
  width: 50%;
}

.image {
  display: block;
  width: 100%;
  height: auto;
}

.overlay {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100%;
  width: 100%;
  opacity: 0;
  transition: 0.5s ease;
  background-color: grey;
}

.img-container:hover .overlay {
  opacity: 0.5;
}

.text {
  color: white;
  font-size: 1rem;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>
