<template>
  <div class="col-md-4 mb-4">
    <div class="card">
      <nuxt-link
        class="img-container w-100"
        :to="{
          name: 'designs.show',
          params: { slug: design.slug },
        }"
      >
        <img
          class="card-img-top image"
          :src="design.images.thumbnail"
          alt="louies
        secondary marks"
        />
        <div class="overlay">
          <div class="text">{{ design.title }}</div>
        </div>
      </nuxt-link>
      <div class="card-body py-2 text-center">
        <div class="card-meta">
          <div class="d-flex justify-content-center">
            <div class="card-common mr-3">
              <span class="title-text">
                <i class="fas fa-eye"></i>
              </span>
              <span class="title font-12 fw-400">{{ design.views }}</span>
            </div>

            <div class="card-common mr-3">
              <span class="title-text">
                <i class="fas fa-comments"></i>
              </span>
              <span class="title font-12 fw-400">{{
                design.comments_count
              }}</span>
            </div>

            <div class="card-common">
              <span class="title-text">
                <i class="fas fa-heart"></i>
              </span>
              <span class="title font-12 fw-400">{{ design.likes_count }}</span>
            </div>
          </div>
        </div>
      </div>
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
