<template>
  <client-only>
    <gmap-autocomplete
      :options="{ types: ['(cities)'] }"
      :selectFirstOnEnter="true"
      @place_changed="handleChange"
    >
      <template v-slot:input="slotProps">
        <input
          ref="input"
          :value="formatted_address"
          class="form-control"
          @listeners="slotProps.listeners"
          @attrs="slotProps.attrs"
        />
      </template>
    </gmap-autocomplete>
  </client-only>
</template>

<script>
export default {
  data() {
    return {
      formatted_address: '',
    }
  },
  methods: {
    handleChange(place) {
      console.log(place)
    },
  },
}
</script>

<style></style>
