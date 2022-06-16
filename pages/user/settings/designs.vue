<template>
  <div class="settings-block">
    <div class="setting-title font-16 fw-500">Дизайны</div>

    <div class="setting-body white-bg-color">
      <table class="table table-striped" v-if="!loading">
        <thead>
          <tr>
            <td></td>
            <td>Название</td>
            <td>Статус</td>
            <td>Действия</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="design in designs.data" :key="design.id">
            <td>
              <template v-if="design.images">
                <img
                  width="100"
                  :src="design.images.thumbnail"
                  class="w-100 mb-4"
                />
              </template>
            </td>
            <td>{{ design.title }}</td>
            <td>{{ design.is_live ? 'Опубликован' : 'Черновик' }}</td>
            <td>
              <nuxt-link
                :to="{ name: 'designs.edit', params: { id: design.id } }"
              >
                Редактировать
              </nuxt-link>
            </td>
          </tr>
        </tbody>
      </table>
      <base-spinner v-else />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      designs: [],
    }
  },
  methods: {
    async fetchUserDesigns() {
      try {
        const { data } = await this.$axios.get(
          `/users/${this.$auth.user.data.id}/designs`
        )
        this.designs = data
        this.loading = false
      } catch (error) {
        console.log(error.response)
      }
    },
  },

  created() {
    this.fetchUserDesigns()
  },
}
</script>

<style></style>
