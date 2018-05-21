<template>
  
    <article class="card card-1">
          <div class="thumbnail" :style="{ backgroundImage: 'url(' + apiURL + 'uploads/' + pathImage + ')'}"></div>
          <h3>Nazwa:</h3>
          <h1>{{ name }}</h1>
          <h3>Autor:</h3>
          <h2>{{ author }}</h2>
          <h3>Gatunek:</h3>
          <p>{{ genre }}</p>
          <h3>Ilość warstw sieci LSTM:</h3>
          <p>{{ numLayers }}</p>
          <h3>Ilość węzłów sieci LSTM:</h3>
          <p>{{ rnnSize }}</p>
          <div class="links">
          <nuxt-link :to="'/trainedModels/' + id">
            <button class="button--green">Wybierz</button>
          </nuxt-link>
          <button v-if="usunVisible" class="button--grey" @click="deleteNow">Usuń</button>
          </div>
    </article>
  
</template>


<script>
import axios from "axios";

export default {
  data() {
    let URL = process.env.apiURL;
    return {
      apiURL: URL
    };
  },
  computed: {
    userEmail() {
      return this.$store.getters.userEmail;
    },
    userToken() {
      return this.$store.getters.userToken;
    }
  },
  props: [
    "name",
    "author",
    "genre",
    "description",
    "id",
    "pathImage",
    "pathT7",
    "pathJson",
    "numLayers",
    "rnnSize",
    "usunVisible"
  ],
  methods: {
    deleteNow() {
      console.log(this.token);
      let config = {
        headers: { Authorization: "bearer " + this.userToken }
      };
      console.log(config);
      axios
        .delete(process.env.apiURL + `trainedModels/` + this.id, config)
        .then(response => {
          console.log("response:", response);
          this.statusCode = response.status;

          if (response.status === 200) {
            this.$router.go();
          } else {
            this.$router.push("/");
          }
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 600px;
  margin: 1rem;
  position: relative;
  width: 400px;
  border: 1px solid #949494;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.card-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card-1:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
}

.thumbnail {
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 300px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}

.links {
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
}

h1 { 
    display: block;
    font-size: 2em;
    margin-bottom: 0.17em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
    text-align: left;
    margin-left: 60px;
}

h2 {
    display: block;
    font-size: 1.5em;
    margin-top: 0.10em;
    margin-bottom: 0.13em;
    margin-left: 0;
    margin-right: 0;
    font-weight: bold;
    text-align: left;
    margin-left: 60px;
}

h3 { 
    display: block;
    font-size: 0.87em;
    margin-top: 0em;
    margin-bottom: 0em;
    margin-left: 40px;
    margin-right: 0;
    font-weight: normal;
    font-style: italic;
    color:#3b8070;
}

p {
    text-align: left;
    font-size: 1.4em;
    margin-left: 60px;
}

</style>

