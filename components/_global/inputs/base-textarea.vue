<template>
  <div>
    <textarea
      :readonly="readonly"
      :rows="rows"
      class="form-control form-control-lg font-14 fw-300"
      :placeholder="placeholder"
      :class="{ 'is-invalid': form.errors.has(field) }"
      @input="handleInput"
      :value="value"
    />

    <has-error :form="form" :field="field"></has-error>
  </div>
</template>

<script>
export default {
  methods: {
    handleInput(e) {
      this.$emit('input', e.target.value)
    },
  },
  props: {
    form: {
      type: Object,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    readonly: {
      type: Boolean,
      required: false,
    },
    value: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    rows: {
      type: Number,
      default: 3,
    },
  },
}
</script>

<style></style>
