<template>
  <footer class="Footer">
    <!-- <div class="Footer__Links container">
      Links
    </div> -->
    <div class="Footer__Author container">
      © 2018 
      <a href="mailto:michal.jakobowski@outlook.com" target="_blank">Michał Jakóbowski</a> - <a href="https://inf.ug.edu.pl/" target="_blank">Instytut Informatyki UG</a>
    </div>
  </footer>
</template>

<style lang="scss" scoped>
.Footer
{
  &__Links
  {
    text-align: center;
    background-color: #35495E;
    color: #eee;
    padding: 15px;
    letter-spacing: 0.5px;
  }
  &__Author
  {
    width: 100%;
    background-color: darken(#35495E, 10%);
    margin: 0;
    font-size: 14px;
    text-align: center;
    padding: 15px;
    color: #9aabb1;
    letter-spacing: 0.5px;
    font-weight: 400;
    a
    {
      text-decoration: none;
      color: #9aabb1;
      &:hover
      {
        color: #41b883;
        text-decoration: underline;
      }
    }
  }
}
</style>