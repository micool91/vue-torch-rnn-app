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
      :showDelete="'1'"
      />
  </section>
</template>

<script>
import Sample from "@/components/Sample";

export default {
  middleware: "authenticated",
  components: {
    Sample
  },
  async asyncData({ app }) {
    const data = await app.$axios.$get(
      process.env.apiURL + "samples/my/samples/",
      {
        headers: { Authorization: "bearer " + app.store.getters.userToken }
      }
    );
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

