<template>
  <section class="authentication">
    <div class="auth-body text-center">
      <h1 class="text-uppercase fw-500 mb-4 text-center font-18">
        <i class="fas fa-exclamation-triangle"></i>
        Ошибка {{ error.statusCode }}
      </h1>
      <p>{{ error.message }}</p>
      <p class="font-14 fw-400 text-center mt-4">
        <a href="/">На главную</a>
      </p>
    </div>
  </section>
</template>

<script>
export default {
  props: ['error'],
}
</script>

<style></style>
