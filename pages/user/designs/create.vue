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
                <div class="text-success caption-sm mt-2" v-if="uploading">
                  <i class="fas fa-spinner fa-spin"></i>
                </div>
              </div>
            </div>
            <div class="upload-para mt-2">
              <p class="font-14 fw-400">
                Минимальное разрешение: 800 x 600px. <br />
                Максимальный размер: 2 мегабайта. <br />
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
        statusFileType: '<p>Некорректный формат файла, разрешены: $0.</p>',
        statusFileSize:
          '<p>Файл слишком большой, максимальный размер: $0 MB.</p>',
        statusImageTooSmall:
          '<p>Изображение слишком маленькое, минимальный размер: $0 px</p>',
        serviceFormat: 'file',
        service: this.slimService,
        post: 'output',
        defaultInputName: 'image',
        minSize: '800,600',
        label: 'Выберите изображение...',
        maxFileSize: 2,
      },
      uploading: false,
      error: '',
    }
  },

  methods: {
    slimService(blobs, progress, success, failure, slim) {
      const formData = new FormData()
      formData.append('image', blobs[0], blobs[0].name)
      this.uploading = true

      this.$axios
        .post('/designs', formData)
        .then((res) => {
          setTimeout(() => {
            this.$router.push({
              name: 'designs.edit',
              params: { id: res.data.data.id },
            })
          }, 2000)
        })
        .catch((err) => {
          const message = err.response.data.errors
          this.error = message[Object.keys(message)[0]][0]
          failure(500)
        })
        .finally(() => (this.uploading = false))
    },
  },
}
</script>

<style></style>
