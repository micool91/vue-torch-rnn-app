<template>
<div class="container">
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
      show: false
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
        .post(`http://207.154.236.217:80/trainedModels/`, data, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: "bearer " + this.userToken
          }
        })
        .then(response => {
          console.log("response:", response);

          if (response.status === 201) {
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
</style>