<template>
  <nuxt-link
    style="all: unset; cursor: pointer"
    :to="{
      name: 'users.profile',
      params: { name: design.user.username },
    }"
  >
    <li class="clearfix">
      <div class="comment-thumb float-left">
        <span v-if="comment.user">
          <img :src="comment.user.photo_url" />
        </span>
      </div>
      <nuxt-link
        :to="{ name: 'users.profile', params: { name: comment.user.username } }"
        title="user"
        style="all: unset"
      >
        <div class="comment-meta">
          <h3 class="font-16 fw-500 mb-2 d-flex justify-content-between">
            {{ comment.user.name }}
            <span v-if="design.user.id === comment.user.id">
              <span style="color: black; font-size: 0.8rem">Автор</span>
            </span>
          </h3>
          <p class="font-14 fw-300 mb-2">{{ comment.body }}</p>
          <span class="font-14 fw-300 d-flex justify-content-between">
            <a href="#">{{ comment.created_at_dates.created_at_human }}</a>
            <span v-if="canDelete">
              <a href="#" @click.prevent="destroyComment" class="text-danger"
                >Удалить</a
              >
            </span>
          </span>
        </div>
      </nuxt-link>
    </li>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    design: {
      type: Object,
      required: true,
    },
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    destroyComment() {
      this.$axios
        .delete(`/comments/${this.comment.id}`)
        .then((res) => this.$emit('deleted', this.comment.id))
        .catch((e) => console.log(e))
    },
  },
  computed: {
    canDelete() {
      // only comment's author or design's author can delete a comment
      const currentUser = this.$auth.user?.data.id
      return (
        this.$auth.loggedIn &&
        (currentUser === this.comment.user.id ||
          currentUser === this.design.user.id)
      )
    },
  },
}
</script>
