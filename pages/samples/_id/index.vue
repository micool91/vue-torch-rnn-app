<template>
  <section class="single-model">
      <h2>{{ sampleById.sample.trainedModel.name }}</h2>
      <p>Temperatura:</p>
      <h1>{{ sampleById.sample.temperature }}</h1>
      <p>Długość tekstu:</p>
      <p>{{ sampleById.sample.textLength }}</p>
      <p>Wygenerowany tekst:</p>
      <div class="tekst">
        <p v-for="t in sampleById.sample.text" :key="t">{{ t }}</p>
      </div>
  </section>

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      trainedModel: "",
      temperature: 90,
      textLength: 500,
      generatedSample: ""
    };
  },
  async asyncData(context) {
    const sampleById = await context.app.$axios.$get(
      "http://localhost:8000/samples/" + context.params.id
    );
    console.log(sampleById);
    return { sampleById };
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

.model-image {
  width: 100%;
}

.tekst {
  text-align: left;
}

.tekst p {
    margin: 15px;
}
</style>
