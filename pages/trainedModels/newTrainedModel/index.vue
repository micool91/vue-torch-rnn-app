<template>
<form class="" method="post" @submit.prevent="postNow">
  <a>Nazw:</a>
  <input type="text" name="" value="" v-model="name"><br>
  <a>Autor:</a>
  <input type="text" name="" value="" v-model="author"><br>
  <a>Gatunek:</a>
  <input type="text" name="" value="" v-model="genre"><br>

  <div class="choose-file">
    <label for="file">Plik T7 (*.t7)</label>
    <input type="file" id="pathT7" name="pathT7">
  </div>
  <div class="choose-file">
    <label for="file">Plik JSON (*.json)</label>
    <input type="file" id="pathJson" name="pathJson">
  </div>

  <a>Liczba warstw sieci:</a>
  <input type="text" name="" value="" v-model="numLayers"><br>
  <a>Wielkość sieci (?):</a>
  <input type="text" name="" value="" v-model="rnnSize"><br>

  <button type="submit" name="button">Submit</button>
</form>


</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      name: "",
      author: "",
      genre: "",
      pathT7: "",
      pathJson: "",
      numLayers: "",
      rnnSize: "",
      show: false
    };
  },

  methods: {
    postNow() {
      var data = new FormData();
      data.append("name", this.name);
      data.append("author", this.author);
      data.append("genre", this.genre);
      data.append("numLayers", this.numLayers);
      data.append("rnnSize", this.rnnSize);
      data.append("pathT7", document.getElementById("pathT7").files[0]);
      data.append("pathJson", document.getElementById("pathJson").files[0]);
      axios
        .post(
          `http://localhost:8000/trainedModels/`,
         data,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then(response => {
            console.log(response);
        })
        .catch(e => {
          this.errors.push(e);
        });
    }
  }
};
</script>


<style scoped>
input[type="text"] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}

input[type="text"]:focus {
  border: 3px solid #555;
}
</style>