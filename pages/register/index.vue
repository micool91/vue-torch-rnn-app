<template>
<form class="logowanie" method="post" @submit.prevent="postNow">
  <div class="container">
      <p>Zarejestruj się w systemie.</p>
    <label for="uname"><b>Email:</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required v-model="uname">

    <label for="psw"><b>Hasło:</b></label>
    <input type="password" placeholder="Enter Password" name="psw" required v-model="psw">
    <div class="zlyLogin">
    <p v-if="stan===`1`">Nieprawidłowy adres email lub hasło.</p>
    </div>
    <div class="links">
    <button class="button--green" type="submit">Zarejestruj</button>
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
          process.env.apiURL + `user/signup`,
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

          if (response.status === 201) {
            this.$router.push("/");
          }
          this.stan = "1";
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

.zlyLogin {
  justify-content: center;
  align-items: center;
  text-align: center;
  margin-bottom: 20px;
  color: red;
}
</style>
