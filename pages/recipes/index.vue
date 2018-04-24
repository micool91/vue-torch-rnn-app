<template>
  <section class="recepies">
      <Recipe 
      v-for="recipe in recipes"
      :key="recipe.id"
      :thumbnail="recipe.thumbnail"
      :title="recipe.title"
      :id="recipe.id"
      :previewText="recipe.previewText"/>
  </section>
</template>

<script>
import Recipe from "@/components/Recipe";

export default {
  components: {
    Recipe
  },
  asyncData() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          recipes: [
            {
              id: "1",
              title: "Delicous Pizza",
              previewText: "Awesome pizza!",
              thumbnail:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Good_Food_Display_-_NCI_Visuals_Online.jpg/1200px-Good_Food_Display_-_NCI_Visuals_Online.jpg"
            },
            {
              id: "2",
              title: "Delicous Worms",
              previewText: "Awesome ROBAKI!",
              thumbnail: "https://s.hswstatic.com/gif/bugs-eat-1.jpg"
            }
          ]
        });
      }, 1500);
    });
  }
};
</script>


<style scoped>
.recipes {
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  align-items: center;
}
</style>

