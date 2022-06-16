<template>
  <li class="d-table w-100">
    <div class="stats-txt d-table-cell w-50">
      <div v-if="!loading">
        <a href="" @click.prevent="likeDesign" v-if="$auth.loggedIn">
          <template v-if="current_user_likes">
            <span>
              <i class="fas fa-thumbs-down fa-2x text-danger"></i>
            </span>
            Не нравится
          </template>
          <template v-else>
            <span>
              <i class="fas fa-thumbs-up fa-2x text-success"></i>
            </span>
            Нравится
          </template>
        </a>
      </div>
      <div v-show="loading">
        <i class="fas fa-spinner fa-spin"></i>
      </div>
    </div>
    <div v-if="!loading" class="stats-num d-table-cell w-50 text-right">
      {{ total_likes }} лайков
    </div>
  </li>
</template>

<script>
export default {
  props: {
    design: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: true,
      current_user_likes: false,
      total_likes: 0,
    }
  },

  methods: {
    checkIfCurrentUserLikes() {
      this.$axios
        .$get(`/designs/${this.design.id}/liked`)
        .then((res) => {
          this.current_user_likes = res.liked
          this.loading = false
        })
        .catch((e) => console.log(e))
    },
    likeDesign() {
      this.$axios.$post(`/designs/${this.design.id}/like`).then((res) => {
        this.current_user_likes = !this.current_user_likes
        this.total_likes = res.total
      })
    },
  },
  beforeMount() {
    this.checkIfCurrentUserLikes()
    this.total_likes = this.design.likes_count
  },
}
</script>
