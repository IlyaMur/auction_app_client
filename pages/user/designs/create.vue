<template>
  <div>
    <section class="hero text-center bg-secondary text-white">
      <div class="container">
        <h1 class="font-28 fw-600 text-uppercase">Загрузка дизайна</h1>
      </div>
    </section>
    <div class="upload-shot">
      <div class="container">
        <div class="row justify-content-center align-items-center text-center">
          <div class="col-md-6">
            <div class="card bg-white shadow-sm">
              <div class="d-flex flex-column justify-content-center p-1">
                <div class="alert alert-danger" v-if="error">
                  <p>Во время загрузки произошла ошибка</p>
                  <p>{{ error }}</p>
                </div>
                <slim-cropper :options="slimOptions">
                  <input type="file" name="image" />
                </slim-cropper>
              </div>
            </div>
            <div class="text-success caption-sm mt-2" v-if="uploading">
              <i class="fa fa-spinner fa-spin"></i>
            </div>
            <div class="upload-para mt-2">
              <p class="font-14 fw-400">
                JPG, GIF или PNG. <br />
                <strong>800 × 600</strong> - минимальное разрешение.<br />
                <strong>2 мегабайта</strong> - максимальный размер.
              </p>
              <p class="font-12 fw-300">
                Мы поможем вам обрезать изображение перед загрузкой.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Slim from '~/components/slim/slim'

export default {
  middleware: ['auth'],
  components: {
    'slim-cropper': Slim,
  },
  data() {
    return {
      slimOptions: {
        label: 'Перетяните сюда изображение',
        buttonCancelLabel: 'Отменить',
        buttonConfirmLabel: 'Подтвердить',
      },
      uploading: false,
      error: '',
    }
  },
  methods: {},
}
</script>

<style></style>
