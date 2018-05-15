<template>
  <section class="single-model">
      <h2>{{ singleModel.trainedModel.name }}</h2>
      <h1>{{ singleModel.trainedModel.author }}</h1>
      <p>Gatunek:</p>
      <p>{{ singleModel.trainedModel.genre }}</p>
      <div>
          <img class="model-image" :src="'http://localhost:8000/uploads/' + singleModel.trainedModel.pathImage" :alt="singleModel.trainedModel.name">
      </div>
      <p>{{ singleModel.trainedModel.pathT7 }}</p>
      <p>Opis: </p>
      <p v-for="d in singleModel.trainedModel.description" :key="d">{{ d }}</p>

      <form v-if="isAuthenticated" class="" method="post" @submit.prevent="generateNow">
          <p>Temperatura:</p>
  {{ temperature/100 }} <input type="range" name="" min="0" max="100" v-model="temperature">
  <p>Długość tekstu do wygenerowania:</p>
  {{ textLength }} <input type="range" name="" min="0" max="5000" v-model="textLength">
  <br>
   <button class="button--green" type="submit" name="button">Generuj</button>
</form>
<p v-if="generatedSample!==''">działa</p>

<div class="tekst" v-if="generatedSample.text">
    <p v-for="sample in generatedSample.text"
    :key="sample">{{ sample }}</p>
</div>

    <Sample 
      v-for="s in samplesByModel.samples"
      :key="s.id"
      :modelName="s.trainedModel.name"
      :temperature="s.temperature"
      :textLength="s.textLength"
      :text="s.text"
      :id="s._id"
    />
      <p>{{ userEmail }}</p>
  </section>
</template>

<script>
import axios from "axios";
import Sample from "@/components/Sample";

export default {
  components: {
    Sample
  },
  computed: {
    userEmail() {
      return this.$store.getters.userEmail;
    },
    userToken() {
      return this.$store.getters.userToken;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },
  data() {
    return {
      trainedModel: "",
      temperature: 90,
      textLength: 500,
      generatedSample: ""
    };
  },
  methods: {
    generateNow() {
      console.log("temperature:", this.temperature / 100);
      console.log("textLength:", this.textLength);
      console.log("pathT7:", this.singleModel.trainedModel.pathT7);
      console.log("pathJson:", this.singleModel.trainedModel.pathJson);
      console.log("modelID:", this.singleModel.trainedModel._id);
      console.log(this.userToken);

      //   const tokenParts = this.token.split(".");
      //   const encodedPayload = tokenParts[1];
      //   const rawPayload = atob(encodedPayload);
      //   this.user = JSON.parse(rawPayload);
      console.log(this.userEmail + ": " + this.userToken);
      let config = {
        headers: { Authorization: "bearer " + this.userToken }
      };

      axios
        .post(
          `http://localhost:8000/samples/`,
          {
            pathT7: this.singleModel.trainedModel.pathT7,
            temperature: this.temperature / 100,
            textLength: this.textLength,
            pathJson: this.singleModel.trainedModel.pathJson,
            trainedModelId: this.singleModel.trainedModel._id
          },
          config
        )
        .then(response => {
          console.log("response:", response);
          if (response.status === 201) {
            console.log("udało się!");
            this.generatedSample = response.data.generatedSample;
          } else {
            console.log("NIE udało się!");
          }
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  },
  async asyncData(context) {
    const singleModel = await context.app.$axios.$get(
      "http://localhost:8000/trainedModels/" + context.params.id
    );
    const samplesByModel = await context.app.$axios.$get(
      "http://localhost:8000/samples/byModel/" + context.params.id
    );
    return { singleModel, samplesByModel };
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
  box-sizing: border-box;
  width: 90%;
  padding: 8px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #aaa;
  margin: 10px;
  text-align: left;
}

p {
  margin: 15px;
}
</style>
