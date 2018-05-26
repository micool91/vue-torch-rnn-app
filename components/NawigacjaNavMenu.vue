<template>
  <ul class="Menu">
    <li class="Menu__Item">
      <NawigacjaNavMenuDropdown/>
    </li>
    <li class="Menu__Item">
      <nuxt-link class="Menu__Item__Link" to="/about">
        O projekcie
      </nuxt-link>
    </li>
    <li v-if="!isAuthenticated" class="Menu__Item">
      <nuxt-link class="Menu__Item__Link" to="/login">
        Zaloguj
      </nuxt-link>
    </li>
    <li v-if="!isAuthenticated" class="Menu__Item">
      <nuxt-link class="Menu__Item__Link" to="/register">
        Zarejestruj się
      </nuxt-link>
    </li>
    <li v-if="isAuthenticated" class="Menu__Item">
      <NawigacjaMoje/>
    </li>
  </ul>
</template>

<script>
import NawigacjaNavMenuDropdown from "~/components/NawigacjaNavMenuDropdown.vue";
import NawigacjaMoje from "~/components/NawigacjaMoje.vue";
export default {
  components: {
    NawigacjaNavMenuDropdown,
    NawigacjaMoje
  },
  computed: {
    userEmail() {
      return this.$store.getters.userEmail;
    },
    userToken() {
      return this.$store.getters.userToken;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  }
};
</script>

<style lang="scss" scoped>
.Menu {
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: space-between;
  @media (min-width: 991px) {
    flex: 1;
    flex-wrap: nowrap;
    padding-left: 15px;
  }
  &__Item {
    width: 100%;
    display: flex;
    border-bottom: 1px solid #dbdfe1;
    @media (min-width: 991px) {
      border-bottom: none;
    }
    &:last-child {
      border-bottom: none;
    }
    &__Link {
      height: 60px;
      display: flex;
      width: 100%;
      align-items: center;
      justify-content: center;
      color: #35495e;
      font-size: 16px;
      text-decoration: none;
      letter-spacing: 0.5px;
      &:hover {
        color: #41b883;
      }
      @media (min-width: 991px) {
        height: 79px;
      }
    }
    .nuxt-link-active,
    .nuxt-link-active:hover {
      color: #41b883;
    }
  }
}
</style>