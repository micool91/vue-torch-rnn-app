<template>
  
    <article class="card card-1">
        <br>
        <div class="naglowek">
          <h3>Nazwa modelu:</h3>
          <h1>{{ modelName }}</h1>
          <h3>Temperatura tekstu:</h3>
          <p>{{ temperature }}</p>
          <h3>Długość tekstu:</h3>
          <p>{{ textLength }}</p>
          <h3>Fragment tekstu:</h3>
        </div>
          <blockquote>
          <p>{{ text[0] }}</p>
          <p>{{ text[1] }}</p>
          <p>{{ text[2] }}</p>
          <p>{{ text[3] }}</p>
          <p>{{ text[4] }}</p>
          <p>{{ text[5] }}</p>
          <p>{{ text[6] }}</p>
          <p>{{ text[7] }}</p>
          <p>{{ text[8] }}</p>
          <p>{{ text[9] }}</p>
          </blockquote>
          <div class="links">
          <nuxt-link :to="'/samples/' + id">
            <button class="button--green">Czytaj dalej</button>
          </nuxt-link>
          <button v-if="showDelete" class="button--grey" @click="deleteNow">Usuń</button>
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
  computed: {
    userEmail() {
      return this.$store.getters.userEmail;
    },
    userToken() {
      return this.$store.getters.userToken;
    }
  },
  props: ["id", "modelName", "textLength", "temperature", "text", "showDelete"],
  methods: {
    deleteNow() {
      let config = {
        headers: { Authorization: "bearer " + this.userToken }
      };
      axios
        .delete(process.env.apiURL + `samples/` + this.id, config)
        .then(response => {
          console.log("response:", response);

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
  margin: 1rem;
  position: relative;
  width: 90%;
}

.card-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.links {
  padding-top: 15px;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
}

.thumbnail {
  background-position: center;
  background-size: cover;
  width: 100%;
  height: 200px;
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

blockquote {
  background: #f9f9f9;
  border-left: 10px solid #ccc;
  margin: 1.5em 10px;
  padding: 0.5em 10px;
  quotes: "\201C" "\201D" "\2018" "\2019";
  text-align: left;
}
blockquote:before {
  color: #ccc;
  font-size: 4em;
  line-height: 0.1em;
  content: "\201C";
  margin-right: 0.25em;
  vertical-align: -0.4em;
}

p {
  font-size: 1.2em;
}

.naglowek {
  text-align: left;
  margin-left: 10%;
}
</style>

