<template>
  <footer class="fixed-bottom mt-10" style="margin-top:1050px">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-4 hide-when-mobile">
          <div class="footer-links font-12 fw-300">
            <a href="#">Конфиденциальность</a>
            <span>/</span>
            <a href="#">Условия и положения</a>
          </div>
        </div>
        <div class="col-md-4 text-center">
          <p class="font-14 fw-300">2022 © Муратов Илья</p>
        </div>
        <div class="col-md-4 text-right">
          <div class="footer-social">
            <a
              href="https://github.com/IlyaMur/auction_app_api"
              title="Facebook"
            >
              <i class="fab fa-github-square"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {}
</script>

<style>
@media screen and (max-width: 770px) {
  .fixed-bottom {
    max-height: 50px;
    z-index: 1 !important;
  }
  .hide-when-mobile {
    display: none !important;
  }
}
</style>
