<template>
  <section class="post-details mt-4 pb-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-9">
          <div class="row">
            <!-- LEFT -->
            <div class="col-md-8">
              <!-- Single Image -->
              <div class="post-detail">
                <div class="single-img">
                  <img :src="design.images.large" alt="Image" />
                </div>
              </div>
              <!-- End Single Image -->
              <!-- Design Detail Text -->
              <div class="desing-text font-16 fw-400 pb-3 pt-2">
                <p>
                  {{ design.description }}
                </p>
              </div>
              <!-- End Design Detail Text -->
              <!-- Design Comments -->
              <div class="design-comments mt-3">
                <h1 class="font-16 fw-300 mb-4">
                  <strong class="fw-500"
                    >{{ comments.length }} комментариев</strong
                  >
                </h1>
                <ul class="comment-list">
                  <design-comment
                    @deleted="handleDelete"
                    :design="design"
                    :comment="comment"
                    v-for="comment in comments"
                    :key="comment.id"
                  />
                </ul>
              </div>

              <template v-if="$auth.loggedIn">
                <form @submit.prevent="save">
                  <base-textarea
                    :rows="2"
                    :form="form"
                    field="body"
                    v-model.trim="form.body"
                    placeholder="Ваш комментарий..."
                  />
                  <div class="mt-2 text-right">
                    <base-button
                      class="btn btn-primary primary-bg-color font-16 fw-500"
                      :loading="form.busy"
                      size="sm"
                    >
                      Отправить</base-button
                    >
                  </div>
                </form>
              </template>
              <!--/ END COMMENTS-->
            </div>

            <!-- RIGHT -->
            <div class="col-md-4">
              <div class="post-detail-sidebar">
                <!-- Designer info -->
                <div class="modal-user-meta white-bg-color">
                  <a class="float-left" href="#" title="avatar">
                    <img :src="design.user.photo_url" alt="author_avatar" />
                  </a>
                  <div class="modal-user-detail">
                    <h1 class="font-13 fw-500">
                      <a href="#"> {{ design.user.name }} </a>
                    </h1>
                    <p class="font-12 fw-300 mt-1">
                      <span class="shot-by">{{ design.user.tagline }}</span>
                    </p>
                    <p class="font-12 fw-300 mt-1">
                      {{ design.created_at_dates.created_at_human }}
                    </p>
                  </div>
                </div>
                <!-- End Designer info -->
                <!-- Designer Design Info -->
                <ul class="details-side-meta font-14 fw-400">
                  <design-like
                    :design="design"
                  />
                  <li class="d-table w-100 author-previews-border mt-1">
                    <div class="stats-txt d-table-cell w-100">
                      Больше работ от {{ design.user.name }}:
                    </div>
                  </li>
                </ul>
                <!-- End Designer Design Info -->
                <!-- Designer More Designs -->
                <div class="more-designs-outer pb-3">
                  <ul class="more-designs row">
                    <design-preview
                      v-for="preview in previewDesigns"
                      :key="preview.id"
                      :preview="preview"
                    />
                  </ul>
                </div>
                <!-- End Designer More Designs -->
                <!-- Designs Tags -->
                <div class="designs-tag-outer mt-3">
                  <h2 class="font-16 fw-500 mb-2">Tags</h2>
                  <div class="designs-tag font-14 fw-300">
                    <a href="#" title="3D">3D</a>
                    <a href="#" title="among trees">among trees</a>
                    <a href="#" title="birds">birds</a>
                    <a href="#" title="environment">environment</a>
                    <a href="#" title="forest">forest</a>
                    <a href="#" title="night">night</a>
                    <a href="#" title="stylized">stylized</a>
                    <a href="#" title="sunset">sunset</a>
                    <a href="#" title="survival">survival</a>
                  </div>
                </div>
                <!-- End Designs Tags -->
              </div>
            </div>
            <!--/ END RIGHT-->
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { Form } from 'vform'
export default {
  data() {
    return {
      form: new Form({
        body: '',
      }),
    }
  },
  async asyncData({ $axios, params, error }) {
    try {
      const design = (await $axios.$get(`/designs/slug/` + params.slug)).data

      const previewDesigns = (
        await $axios.$get(`/users/${design.user.id}/designs/preview`)
      ).data.filter((preview) => preview.id !== design.id)

      return { comments: design.comments, design, previewDesigns }
    } catch (e) {
      if (e.response.status === 404) {
        error({ statusCode: 404, message: 'Дизайн не был найден' })
      } else {
        error({ statusCode: 500, message: 'Произошла непредвиденная ошибка' })
      }
    }
  },
  methods: {
    handleDelete(id) {
      this.comments = this.comments.filter((comment) => comment.id !== id)
    },
    save() {
      this.form
        .post(`/designs/${this.design.id}/comments`)
        .then((res) => {
          this.form.reset()
          this.comments = [...this.comments, res.data.data]
        })
        .catch((e) => console.log(e))
    },
  },
}
</script>

<style scoped>
.author-previews-border {
  border-bottom: none;
}
</style>
