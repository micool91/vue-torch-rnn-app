<template>
  <nuxt-link :to="'/trainedModels/newTrainedModel'">
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" integrity="sha384-DNOHZ68U8hZfKXOrtjWvjxusGo9WQnrNx2sqG0tfsghAvtVlRW3tvkXWZh58N9jp" crossorigin="anonymous">
    <article class="card card-1">
        <br><br><br><br><br><br><br><br><br>
        <i class="fas fa-book"></i>
        <br><br>
          <h2>Dodaj nowy model treningowy</h2>
    </article>
  </nuxt-link>
</template>


<script>
export default {};
</script>

<style scoped>
.card {
  background: #fff;
  border-radius: 2px;
  display: inline-block;
  height: 600px;
  margin: 1rem;
  position: relative;
  width: 400px;
  border-top-left-radius: 15px;
  border-top-right-radius: 15px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-align: center;
}

i {
    font-size: 100px;
}

.card-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.card-1:hover {
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  color: #fff;
  background-color: #3b8070;
}
</style>

