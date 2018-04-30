<template>
  <nuxt-link :to="'/trainedModels/newTrainedModel'">
    <article class="newTrainedModel">
          <h2>Dodaj nowy model treningowy >>></h2>
    </article>
  </nuxt-link>
</template>


<script>
export default {
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

.newTrainedModel {
  box-sizing: border-box;
  width: 280px;
  height: 500px;
  padding: 8px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #aaa;
  margin: 10px;
  background-color: #41B883;
}
</style>

