<template>
<form class="logowanie" method="post" @submit.prevent="postNow">
  <div class="container">
      <p>Zaloguj się do systemu.</p>
    <label for="uname"><b>Login:</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required v-model="uname">

    <label for="psw"><b>Hasło:</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required v-model="psw">
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
      psw: ""
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
            headers: { "Content-Type": "application/json" }
          }
        )
        .then(response => {
          console.log("response:", response);

          if (response.status === 200) {
            const auth = {
              accessToken: response.data.token
            };
            this.$store.commit("update", auth); // mutating to store for client rendering
            Cookie.set("auth", auth); // saving token in cookie for server rendering
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
.links {
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
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
