<template>
  
    <article class="sample">
          <h2>{{ modelName }}</h2>
          <p>Temperatura testu:</p>
          <p>{{ temperature }}</p>
          <p>Długość tekstu:</p>
          <p>{{ textLength }}</p>
          <p>Fragment tekstu:</p>
          <p>{{ text[0] }}</p>
          <p>{{ text[1] }}</p>
          <p>{{ text[2] }}</p>
          <p>{{ text[3] }}</p>
          <p>{{ text[4] }}</p>
          <p>{{ text[5] }}</p>
          <p>{{ text[6] }}</p>
          <div class="links">
          <nuxt-link :to="'/samples/' + id">
            <button class="button--green">Czytaj dalej</button>
          </nuxt-link>
          <button class="button--grey" @click="deleteNow">Usuń</button>
          </div>
    </article>
  
</template>


<script>
import axios from "axios";

export default {
  data() {
    return {
      statusCode: 0
    };
  },
  props: ["id", "modelName", "textLength", "temperature", "text"],
  methods: {
    deleteNow() {
      axios
        .delete(`http://localhost:8000/samples/` + this.id)
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

.sample {
  box-sizing: border-box;
  width: 90%;
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

p {
    margin: 15px;
}
</style>

