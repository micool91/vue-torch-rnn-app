<template>
  <section>
    <div class="card card-1">
             <div>
          <img class="model-image" :src="apiURL + 'uploads/' + singleModel.trainedModel.pathImage" :alt="singleModel.trainedModel.name">
      </div>
      <h3>Nazwa modelu:</h3>
      <h1>{{ singleModel.trainedModel.name }}</h1>
      <h3>Autor:</h3>
      <h2>{{ singleModel.trainedModel.author }}</h2>
      <h3>Gatunek:</h3>
      <p>{{ singleModel.trainedModel.genre }}</p>
 
      <h3>Opis: </h3>
      <p v-for="d in singleModel.trainedModel.description" :key="d">{{ d }}</p>
    </div>

      <form class="card card-1" method="post" @submit.prevent="generujBezZapisu">
<div class="links">
          <p>Temperatura: {{ temperature/100 }}</p>
  <input type="range" class="slider" name="" min="0" max="100" v-model="temperature">
  <p>Długość tekstu do wygenerowania: {{ textLength }}</p>
  <input type="range" class="slider" name="" min="0" max="8000" v-model="textLength">
  <br>
   </div>
  <div class="links">
   <button v-if="isAuthenticated" class="button--green" type="submit" name="button" @click="generateNow">Generuj i zapisz</button>
   <button class="button--grey" type="" name="button2" @click="generujBezZapisu">Generuj bez zapisywania</button>
   </div>
</form>

<div v-if="stan===`1`" class="card card-1">
<center><br><br><br>
<div class="loader" id="loader"></div>
<div class="loader" id="loader2"></div>
<div class="loader" id="loader3"></div>
<div class="loader" id="loader4"></div>
	<!--Delete the "loader3" and "loader4" divs for a 2-layer loader-->
	<!--You can also change the animation durations or delays, that looks also pretty cool -->
<span id="text">GENEROWANIE...</span><br></center>
</div>


<div class="card card-1" v-if="generatedSample.text">
    <p v-for="sample in generatedSample.text"
    :key="sample" class="subtitle">{{ sample }}</p>
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
      if (this.$store.getters.userEmail) {
        return this.$store.getters.userEmail;
      } else {
        return 0;
      }
    },
    userToken() {
      if (this.$store.getters.userToken) {
        return this.$store.getters.userToken;
      } else {
        return 0;
      }
    },
    isAuthenticated() {
      if (this.$store.getters.isAuthenticated) {
        return this.$store.getters.isAuthenticated;
      } else {
        return false;
      }
    },
    apiURL() {
      return process.env.apiURL;
    }
  },
  data() {
    return {
      trainedModel: "",
      temperature: 97,
      textLength: 2500,
      generatedSample: "",
      stan: "0"
    };
  },
  methods: {
    generateNow() {
      console.log("temperature:", this.temperature / 100);
      console.log("textLength:", this.textLength);
      console.log("pathT7:", this.singleModel.trainedModel.pathT7);
      console.log("pathJson:", this.singleModel.trainedModel.pathJson);
      console.log("modelID:", this.singleModel.trainedModel._id);
      //console.log(this.userToken);

      //   const tokenParts = this.token.split(".");
      //   const encodedPayload = tokenParts[1];
      //   const rawPayload = atob(encodedPayload);
      //   this.user = JSON.parse(rawPayload);
      //console.log(this.userEmail + ": " + this.userToken);
      let config = {
        headers: { Authorization: "bearer " + this.userToken }
      };
      this.stan = "1";
      axios
        .post(
          process.env.apiURL + `samples/`,
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
            this.stan = "0";
            console.log("udało się!");
            this.generatedSample = response.data.generatedSample;
          } else {
            this.stan = "2";
            console.log("NIE udało się!");
          }
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    generujBezZapisu() {
      this.generatedSample = ``;
      this.stan = "1";
      console.log(process.env.apiURL + `samples/without/save`);
      axios
        .post(process.env.apiURL + `samples/without/save`, {
          pathT7: this.singleModel.trainedModel.pathT7,
          temperature: this.temperature / 100,
          textLength: this.textLength,
          pathJson: this.singleModel.trainedModel.pathJson,
          trainedModelId: this.singleModel.trainedModel._id
        })
        .then(response => {
          console.log("response:", response);
          if (response.status === 201) {
            this.stan = "0";
            console.log("udało się!");
            this.generatedSample = response.data.generatedSample;
          } else {
            this.stan = "2";
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
      context.env.apiURL + "trainedModels/" + context.params.id
    );
    const samplesByModel = await context.app.$axios.$get(
      context.env.apiURL + "samples/byModel/" + context.params.id
    );
    return { singleModel, samplesByModel };
  }
};
</script>


<style scoped>
.card {
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  margin: 1rem;
  position: relative;
  width: 90%;
  padding: 20px;
}

.card-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.model-image {
  display: block;
  margin-left: auto;
  margin-right: 20px;
  max-width: 50%;
  float: left;
}

h1 {
  display: block;
  font-size: 2em;
  margin-left: 0;
  margin-right: 0;
  margin-bottom: 10px;
  font-weight: bold;
  text-align: left;
}

h2 {
  display: block;
  font-size: 1.5em;
  margin-top: 0.1em;
  margin-bottom: 10px;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
  text-align: left;
}

h3 {
  display: block;
  font-size: 0.87em;
  margin-top: 0.2em;
  margin-bottom: 0em;
  margin-right: 0;
  font-weight: normal;
  font-style: italic;
  color: #3b8070;
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

.links {
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
}

.slider {
  -webkit-appearance: none;
  width: 75%;
  height: 15px;
  border-radius: 5px;
  background: #d3d3d3;
  outline: none;
  opacity: 0.7;
  -webkit-transition: 0.2s;
  transition: opacity 0.2s;
}

.slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}

.slider::-moz-range-thumb {
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #4caf50;
  cursor: pointer;
}

@media screen and (max-width: 600px) {
  .model-image {
    width: 100%;
  }
}

.loader {
  border: 3px solid #3b8070;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: rotate 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite;
}
#loader2 {
  border: 3px solid #3bc9db;
  width: 220px;
  height: 220px;
  position: relative;
  top: -216px;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: rotate2 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite;
}
#loader3 {
  border: 3px solid #3b8070;
  width: 240px;
  height: 240px;
  position: relative;
  top: -452px;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: rotate 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite;
}
#loader4 {
  border: 3px solid #3bc9db;
  width: 260px;
  height: 260px;
  position: relative;
  top: -708px;
  border-left-color: transparent;
  border-right-color: transparent;
  animation: rotate2 2s cubic-bezier(0.26, 1.36, 0.74, -0.29) infinite;
}
@keyframes rotate {
  0% {
    transform: rotateZ(-360deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
@keyframes rotate2 {
  0% {
    transform: rotateZ(360deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
#text {
  color: 35495e;
  font-family: Arial;
  font-size: 20px;
  position: relative;
  top: -857px;
}

.subtitle {
  font-weight: 300;
  font-size: 20px;
  color: #2b3547;
  word-spacing: 5px;
  padding-bottom: 15px;
}
</style>
