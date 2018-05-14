<template>
<form class="logowanie" method="post" @submit.prevent="postNow">
  <div class="container">
    <label for="uname"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required v-model="uname">

    <label for="psw"><b>Password</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required v-model="psw">

    <button type="submit">Login</button>
    <label>
      <input type="checkbox" checked="checked" name="remember"> Remember me
    </label>
  </div>

  <div class="container" style="background-color:#f1f1f1">
    <button type="button" class="cancelbtn">Cancel</button>
    <span class="psw">Forgot <a href="#">password?</a></span>
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
          `http://localhost:8000/user/login`,
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

</style>
