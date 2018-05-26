<template>
  <section class="zasobnik">
    <div class="cardPadding cardPadding-1">
      <logo/>
      <h1 class="title">
        Jakobowski.app
      </h1>
      <h2 class="subtitle">
        Generowanie treści przy pomocy sieci LSTM
      </h2>
      <div class="odnosniki">
        <a href="https://github.com/micool91/vue-torch-rnn-app" target="_blank" class="button--green">Źródła GitHub</a>
        <a href="https://bitbucket.org/mjakobowski/magisterka/src/master/" target="_blank" class="button--grey">Repozytorium pracy magisterskiej</a>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  }
}
</script>

<style>
.zasobnik
{
  min-height: 50vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.title
{
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; /* 1 */
  display: block;
  font-weight: 300;
  font-size: 42px;
  color: #35495e;
  letter-spacing: 1px;
}
.subtitle
{
  font-weight: 300;
  font-size: 30px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.odnosniki
{
  padding-top: 15px;
}

.cardPadding {
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  margin: 1rem;
  position: relative;
  width: 98%;
  padding: 30px;
}

.cardPadding-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>
