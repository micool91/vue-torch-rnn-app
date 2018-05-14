<template>
  <div class="container">
    <h1 v-if="error.statusCode === 404">Coś poszło nie tak...</h1>
    <h1 v-else>Coś poszło nie tak...</h1>
    <br>
    <img src="https://i.pinimg.com/originals/34/2d/17/342d173cca5bfaf320f2bccbe577e2dc.jpg" alt="Angery react">
    <br>
    <nuxt-link to="/">Strona główna</nuxt-link>
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'default' // you can set a custom layout for the error page
}
</script>