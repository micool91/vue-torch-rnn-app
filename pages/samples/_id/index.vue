<template>
  <section>
      <div class="card card-1">
      <h3>Nazwa modelu:</h3>
      <h1>{{ sampleById.sample.trainedModel.name }}</h1>
      <h3>Temperatura:</h3>
      <h2>{{ sampleById.sample.temperature }}</h2>
      <h3>Długość tekstu:</h3>
      <h2>{{ sampleById.sample.textLength }}</h2>
      <br>
      <h3>Kliknij ► aby syntezator mowy przeczytał wskazany akapit.</h3>
      </div>
      <div class="card card-1">
      <h3>Wygenerowany tekst:</h3>
      <p v-for="t in sampleById.sample.text" :key="t"><button class="button--green" @click="przeczytajNow(t)">►</button> {{ t }}</p>
      </div>

<audio>
  <source class="track" src="" type="audio/mpeg">
</audio>

        <script src="https://code.jquery.com/jquery-3.2.1.min.js"
  integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4="
  crossorigin="anonymous"></script>
  <script src="https://sdk.amazonaws.com/js/aws-sdk-2.132.0.min.js"></script>
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
  methods: {
    przeczytajNow(inputText) {
      AWS.config.accessKeyId = process.env.accessKeyId;
      AWS.config.secretAccessKey = process.env.secretAccessKey;
      AWS.config.region = 'eu-central-1';

      var polly = new AWS.Polly();

      //let inputText = this.sampleById.sample.text.join(" ");

      var params = {
        OutputFormat: "mp3",
        Text: inputText,
        TextType: "text",
        VoiceId: "Ewa"
      };

      polly.synthesizeSpeech(params, function(err, data) {
        if (err) {
          // an error occurred
          console.log(err, err.stack);
        } else {
          var uInt8Array = new Uint8Array(data.AudioStream);
          var arrayBuffer = uInt8Array.buffer;
          var blob = new Blob([arrayBuffer]);

          var audio = $("audio");
          var url = URL.createObjectURL(blob);
          audio[0].src = url;
          audio[0].play();
        }
      });
    }
  },
  async asyncData(context) {
    const sampleById = await context.app.$axios.$get(
      process.env.apiURL + "samples/" + context.params.id
    );
    console.log(sampleById);
    return { sampleById };
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
  width: 98%;
  padding: 30px;
}

.card-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

h1 {
  display: block;
  font-size: 2em;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
  text-align: left;
}

h2 {
  display: block;
  font-size: 1.5em;
  margin-top: 0.1em;
  margin-top: 0.1em;
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

p {
  padding: 10px;
  font-size: 1.2em;
}

.model-image {
  width: 100%;
}

.button--green {
  border-radius: 50%;
  padding: 5px;
}
</style>
