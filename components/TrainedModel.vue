<template>
  <nuxt-link :to="'/trainedModels/' + id">
    <article class="trainedModel">
          <h2>{{ name }}</h2>
          <h1>{{ author }}</h1>
          <p>{{ id }}</p>
          <p>{{ pathT7 }}</p>
          <p>{{ pathJson }}</p>
          <p>{{ numLayers }}</p>
          <p>{{ rnnSize }}</p>
    </article>
  </nuxt-link>
</template>


<script>
export default {
  props: ["name", "author", "id", "pathT7", "pathJson", "numLayers", "rnnSize"]
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: black;
}

.trainedModel {
  box-sizing: border-box;
  width: 280px;
  height: 300px;
  padding: 8px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #aaa;
  margin: 10px;
}
</style>

