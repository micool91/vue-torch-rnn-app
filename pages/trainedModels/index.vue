<template>
  <section class="trainedModels">
      <NewTrainedModel/>
      <TrainedModel 
      v-for="model in data.trainedModels"
      :key="model.id"
      :name="model.name"
      :author="model.author"
      :id="model._id"
      :pathT7="model.pathT7"
      :pathJson="model.pathJson"
      :numLayers="model.numLayers"
      :rnnSize="model.rnnSize"
      />
  </section>
</template>

<script>
import TrainedModel from "@/components/TrainedModel";
import NewTrainedModel from "@/components/NewTrainedModel";

export default {
  components: {
    TrainedModel, NewTrainedModel
  },
  async asyncData({ app }) {
  const data = await app.$axios.$get('http://localhost:8000/trainedModels/')
  return { data }
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

