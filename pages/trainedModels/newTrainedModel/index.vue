<template>
<form class="" method="post" @submit.prevent="postNow">
  <a>Nazwa:</a>
  <input type="text" name="" value="" v-model="name"><br>
  <a>Autor:</a>
  <input type="text" name="" value="" v-model="author"><br>
  <a>Gatunek:</a>
  <input type="text" name="" value="" v-model="genre"><br>
  <a>Opis:</a>
  <textarea name="" style="width:1000px; height:300px" value="" v-model="description"></textarea><br>

  <div class="choose-file">
    <label for="file">Plik T7 (*.t7)</label>
    <input type="file" id="pathT7" name="pathT7">
  </div>
  <div class="choose-file">
    <label for="file">Plik JSON (*.json)</label>
    <input type="file" id="pathJson" name="pathJson">
  </div>
  <div class="choose-file">
    <label for="file">Plik JPEG lub PNG (*.jpeg / *.png)</label>
    <input type="file" id="pathImage" name="pathImage">
  </div>

  <a>Liczba warstw sieci:</a>
  <input type="text" name="" value="" v-model="numLayers"><br>
  <a>Wielkość sieci (?):</a>
  <input type="text" name="" value="" v-model="rnnSize"><br>

  <button class="button--green" type="submit" name="button">Submit</button>
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
      description: "",
      pathImage: "",
      pathT7: "",
      pathJson: "",
      numLayers: "",
      rnnSize: "",
      show: false
    };
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
        .post(
          `http://localhost:8000/trainedModels/`,
         data,
          { headers: { "Content-Type": "multipart/form-data" } }
        )
        .then(response => {
            console.log('response:', response);
            
            if (response.status === 201) {
                self.$router.push('/trainedModels');
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