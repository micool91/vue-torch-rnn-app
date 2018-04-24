<template>
  <section class="single-model">
      <h2>{{ singleModel.trainedModel.name }}</h2>
      <h1>{{ singleModel.trainedModel.author }}</h1>
      <p>{{ singleModel.trainedModel.pathT7 }}</p>
  </section>
</template>

<script>
export default {
  async asyncData(context) {
    const singleModel = await context.app.$axios.$get(
      "http://localhost:8000/trainedModels/" + context.params.id
    );
    return { singleModel };
  }
};
</script>


<style scoped>
.single-model {
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 30px;
}

.recipe-image {
  width: 100%;
}
</style>
