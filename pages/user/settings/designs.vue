<template>
  <div class="settings-block">
    <div class="setting-title font-16 fw-500">Дизайны</div>

    <div class="setting-body white-bg-color">
      <table class="table table-striped">
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
                <nuxt-img
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
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      designs: [],
    }
  },
  methods: {
    async fetchUserDesigns() {
      const { data } = await this.$axios.get(
        `/users/${this.$auth.user.id}/designs`
      )

      this.designs = data
    },
  },

  created() {
    this.fetchUserDesigns()
  },
}
</script>

<style></style>
