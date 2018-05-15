<template>
  
    <article class="card card-1">
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


.card {
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 600px;
  margin: 1rem;
  position: relative;
  width: 400px;
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
</style>

