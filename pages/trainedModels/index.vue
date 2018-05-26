<template>
  <section class="trainedModels">
      <div v-if="isAuthenticated"><NewTrainedModel/></div>
      <TrainedModel 
      v-for="model in data.trainedModels"
      :key="model.id"
      :pathImage="model.pathImage"
      :name="model.name"
      :author="model.author"
      :genre="model.genre"
      :description="model.description"
      :id="model._id"
      :pathT7="model.pathT7"
      :pathJson="model.pathJson"
      :numLayers="model.numLayers"
      :rnnSize="model.rnnSize"
      :usunVisible="'1'"
      />
  </section>
</template>

<script>
import TrainedModel from "@/components/TrainedModel";
import NewTrainedModel from "@/components/NewTrainedModel";

export default {
  components: {
    TrainedModel,
    NewTrainedModel
  },
  computed: {
    isAuthenticated() {
      if (this.$store.getters.isAuthenticated) {
        return this.$store.getters.isAuthenticated;
      } else {
        return false;
      }
    }
  },
  async asyncData({ app }) {
    const data = await app.$axios.$get(process.env.apiURL + "trainedModels/");
    console.log(data);
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

