<template>
  <section class="trainedModels">
      <NewTrainedModel/>
      <TrainedModel 
      v-for="model in data.trainedModels"
      :key="model.id"
      :pathImage="model.pathImage"
      :name="model.name"
      :author="model.author"
      :description="model.description"
      :id="model._id"
      :pathT7="model.pathT7"
      :pathJson="model.pathJson"
      :numLayers="model.numLayers"
      :rnnSize="model.rnnSize"
      :usunVisible="'1'"
      />
      <p>Token: {{ $store.state.auth.accessToken }}</p>
  </section>
</template>

<script>
import TrainedModel from "@/components/TrainedModel";
import NewTrainedModel from "@/components/NewTrainedModel";

export default {
  middleware: "authenticated",
  computed: {
    userEmail() {
      return this.$store.getters.userEmail;
    }
  },
  components: {
    TrainedModel,
    NewTrainedModel
  },
  async asyncData({ app }) {
    const data = await app.$axios.$get("http://localhost:8000/trainedModels/my/models", {
      headers: { Authorization: "bearer " + app.store.getters.userToken }
    });
    return { data };
  }
};
</script>


<style scoped>
.trainedModels {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
  text-decoration-color: black;
}
</style>

