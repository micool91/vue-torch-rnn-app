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
          <button class="button--grey" @click="deleteNow">Usuń</button>
          </div>
          <div>{{ statusCode }}</div>
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
    "rnnSize"
  ],
  methods: {
    deleteNow() {
      axios
        .delete(`http://localhost:8000/trainedModels/` + this.id)
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
  width: 280px;
  height: 500px;
  padding: 8px;
  border: 1px solid #ccc;
  box-shadow: 0 2px 2px #aaa;
  margin: 10px;
}

.links {
  padding-top: 15px;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.thumbnail {
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 200px;
}
</style>

