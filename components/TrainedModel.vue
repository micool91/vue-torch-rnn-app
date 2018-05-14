<template>
  
    <article class="trainedModel">
          <div class="thumbnail" :style="{ backgroundImage: 'url(http://localhost:8000/uploads/' + pathImage + ')'}"></div>
          <h2>{{ name }}</h2>
          <h1>{{ author }}</h1>
          <p>{{ genre }}</p>
          <p>{{ id }}</p>
          <p>{{ pathT7 }}</p>
          <p>{{ pathJson }}</p>
          <p>{{ pathImage }}</p>
          <p>{{ numLayers }}</p>
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
    return {
      statusCode: 11
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
        .delete(`http://localhost:8000/trainedModels/` + this.id, config)
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
a {
  text-decoration: none;
  color: black;
}

.trainedModel {
  box-sizing: border-box;
  width: 400px;
  height: 600px;
  /* padding: 8px; */
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #aaa;
  margin: 10px;
  border-radius: 15px;
}

.links {
  padding: 15px;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.thumbnail {
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 300px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
}
</style>

