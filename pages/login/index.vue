<template>
<form class="logowanie" method="post" @submit.prevent="postNow">
  <div class="container">
      <p>Zaloguj się do systemu.</p>
    <label for="uname"><b>Login:</b></label>
    <input type="text" placeholder="Wpisz email" name="uname" required v-model="uname">

    <label for="psw"><b>Hasło:</b></label>
    <input type="password" placeholder="Wpisz hasło" name="psw" required v-model="psw">
    <div class="zlyLogin">
    <p v-if="stan===`1`">Nieprawidłowy login lub hasło :-(</p>
    </div>
    <div class="links">
    <button class="button--green" type="submit">Login</button>
    </div>
  </div>
</form>
</template>



<script>
import axios from "axios";
import Cookie from "js-cookie";

export default {
  middleware: "notAuthenticated",
  data() {
    return {
      uname: "",
      psw: "",
      stan: "0"
    };
  },
  methods: {
    postNow() {
      axios
        .post(
          process.env.apiURL + `user/login`,
          {
            email: this.uname,
            password: this.psw
          },
          {
            headers: { "Content-Type": "application/json" },
            validateStatus: function(status) {
              return true; // default
            }
          }
        )
        .then(response => {
          console.log("response:", response);
          if (response.status === 401) {
            this.stan = `1`;
          }
          if (response.status === 200) {
            const auth = {
              accessToken: response.data.token
            };
            this.$store.commit("update", auth); // mutating to store for client rendering
            Cookie.set("auth", auth); // saving token in cookie for server rendering
            this.$router.push("/");
          } else {
            this.stan = `1`;
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
.links {
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
}

.zlyLogin {
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  color: red;
}

input[type="text"],
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type="password"],
select,
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

textarea {
  min-height: 150px;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  text-align: left;
  margin: auto;
  width: 320px;
  border: 1px solid green;
  padding: 20px;
}

p {
  text-align: center;
  padding: 20px;
}
</style>
