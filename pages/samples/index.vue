<template>
  <section class="samples">
      <Sample 
      v-for="s in data.samples"
      :key="s.id"
      :modelName="s.trainedModel.name"
      :temperature="s.temperature"
      :textLength="s.textLength"
      :text="s.text"
      :id="s._id"
      />
  </section>
</template>

<script>
import Sample from "@/components/Sample";

export default {
  components: {
    Sample
  },
  async asyncData({ app }) {
    const data = await app.$axios.$get(process.env.apiURL + "samples/");
    data.samples.forEach(element => {
      if (element.trainedModel === null) {
        element.trainedModel = { name: "Model został wcześniej usunięty" };
      }
    });
    return { data };
  }
};
</script>


<style scoped>
.samples {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  text-decoration-color: black;
}
</style>

