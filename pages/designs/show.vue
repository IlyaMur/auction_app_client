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
                  <div>
                    <!-- all props & events -->
                    <vue-easy-lightbox
                      escDisabled
                      moveDisabled
                      :visible="visible"
                      :imgs="design.images.large"
                      :index="0"
                      @hide="handleHide"
                    >
                    </vue-easy-lightbox>
                  </div>

                  <img @click="show" :src="design.images.large" alt="Image" />
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
                  <nuxt-link
                    class="float-left"
                    :to="{name: 'users.profile', params: {name: design.user.username}}"
                    title="avatar"
                  >
                    <img :src="design.user.photo_url" alt="author_avatar" />
                  </nuxt-link>
                  <div class="modal-user-detail">
                    <h1 class="font-13 fw-500">
                      <nuxt-link :to="{name: 'users.profile', params: {name: design.user.username}}"> {{ design.user.name }} </nuxt-link>
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
                  <design-like :design="design" />
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
                  <div
                    class="designs-tag font-14 fw-300"
                    v-if="design.tag_list"
                  >
                    <a
                      v-for="(tag, i) in design.tag_list.tags"
                      :key="`tag-${i}`"
                      :href="`/tags/${design.tag_list.normalized[i]}`"
                    >
                      {{ tag }}</a
                    >
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
      visible: false,
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
    show() {
      this.visible = true
    },
    handleHide() {
      this.visible = false
    },
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
