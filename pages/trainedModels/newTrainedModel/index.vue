<template>
<div class="container">
<div v-if="stan===`1`" class="card card-1">
<center><br><br><br>
<div class="loader" id="loader"></div>
<div class="loader" id="loader2"></div>
<div class="loader" id="loader3"></div>
<div class="loader" id="loader4"></div>
	<!--Delete the "loader3" and "loader4" divs for a 2-layer loader-->
	<!--You can also change the animation durations or delays, that looks also pretty cool -->
<span id="text">ZAPISYWANIE...</span><br></center>
</div>

<form class="" method="post" @submit.prevent="postNow">
  <a>Nazwa:</a>
  <input type="text" name="" value="" v-model="name"><br>
  <a>Autor:</a>
  <input type="text" name="" value="" v-model="author"><br>
  <a>Gatunek:</a>
  <input type="text" name="" value="" v-model="genre"><br>
  <a>Opis:</a>
  <textarea name="" value="" v-model="description"></textarea><br>
 <div class="container2">
  <div class="custom-file-upload">
    <label for="pathT7">Plik T7 (*.t7): </label>
    <input type="file" id="pathT7" name="pathT7">
  </div>
  <div class="custom-file-upload">
    <label for="pathJson">Plik JSON (*.json): </label>
    <input type="file" id="pathJson" name="pathJson">
  </div>
  <div class="custom-file-upload">
    <label for="pathImage">Plik JPEG lub PNG (*.jpeg / *.png): </label>
    <input type="file" id="pathImage" name="pathImage">
  </div>
</div>
<br>
  <a>Liczba warstw sieci:</a>
  <input type="text" name="" value="" v-model="numLayers"><br>
  <a>Wielkość sieci (?):</a>
  <input type="text" name="" value="" v-model="rnnSize"><br>

  <button class="button--green" type="submit" name="button">Wyślij</button>
</form>
</div>


</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      author: "",
      genre: "",
      description: "",
      pathImage: "",
      pathT7: "",
      pathJson: "",
      numLayers: "",
      rnnSize: "",
      show: false,
      stan: "0"
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
  methods: {
    postNow() {
      this.stan = "1"
      let self = this;
      var data = new FormData();
      data.append("name", this.name);
      data.append("author", this.author);
      data.append("genre", this.genre);
      data.append("description", this.description);
      data.append("numLayers", this.numLayers);
      data.append("rnnSize", this.rnnSize);
      data.append("pathImage", document.getElementById("pathImage").files[0]);
      data.append("pathT7", document.getElementById("pathT7").files[0]);
      data.append("pathJson", document.getElementById("pathJson").files[0]);
      axios
        .post(process.env.apiURL + `trainedModels/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "bearer " + this.userToken
          }
        })
        .then(response => {
          console.log("response:", response);

          if (response.status === 201) {
            this.stan = "0"
            self.$router.push("/trainedModels");
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

textarea {
  min-height: 150px;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  text-align: left;
  margin: auto;
  width: 90%;
  border: 1px solid green;
  padding: 10px;
}

.container2 {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  text-align: left;
  margin: auto;
  width: 75%;
  border: 1px solid green;
  padding: 10px;
}

.custom-file-upload {
  display: inline-block;
  padding: 6px 12px;
  cursor: pointer;
  min-width: 80%;
  margin: auto;
}




.loader{
	border:3px solid #3B8070;
	width:200px;
	height:200px;
	border-radius:50%; 
	border-left-color: transparent;
  border-right-color: transparent;
	animation:rotate 2s cubic-bezier(0.26, 1.36, 0.74,-0.29) infinite;
}
#loader2{
	border:3px solid #3bc9db;
	width:220px;
	height:220px;
	position:relative;
	top:-216px;
	border-left-color: transparent;
  border-right-color: transparent;
	animation:rotate2 2s cubic-bezier(0.26, 1.36, 0.74,-0.29) infinite;
}
#loader3{
	border:3px solid #3B8070;
	width:240px;
	height:240px;
	position:relative;
	top:-452px;
	border-left-color: transparent;
  border-right-color: transparent;
	animation:rotate 2s cubic-bezier(0.26, 1.36, 0.74,-0.29) infinite;
}
#loader4{
	border:3px solid #3bc9db;
	width:260px;
	height:260px;
	position:relative;
	top:-708px;
	border-left-color: transparent;
  border-right-color: transparent;
	animation:rotate2 2s cubic-bezier(0.26, 1.36, 0.74,-0.29) infinite;
}
@keyframes rotate{
	0%{transform:rotateZ(-360deg)}
	100%{transform:rotateZ(0deg)}
}
@keyframes rotate2{
	0%{transform:rotateZ(360deg)}
	100%{transform:rotateZ(0deg)}
}
#text{
	color:35495E;
	font-family:Arial;
	font-size:20px;
	position:relative;
	top:-857px;
}
</style>