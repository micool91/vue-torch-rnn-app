<template>
  <header class="main-header">
      <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <div class="topnav" id="myTopnav">
  <nuxt-link class="company" to="/">Jakobowski.tk</nuxt-link>
  <div class="dropdown">
    <button class="dropbtn">Generowanie treści 
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <nuxt-link class="linkz" to="/trainedModels">Modele Treningowe</nuxt-link>
      <nuxt-link class="linkz" to="/samples">Sample</nuxt-link>
    </div>
  </div> 
  <nuxt-link class="linkz" to="/about">O projekcie</nuxt-link>
  <div class="dropdown">
    <button class="dropbtn">{{ userEmail }}
      <i class="fa fa-caret-down"></i>
    </button>
    <div class="dropdown-content">
      <nuxt-link class="linkz" to="/myTrainedModels">Modele Treningowe</nuxt-link>
      <nuxt-link class="linkz" to="/mySamples">Sample</nuxt-link>
      <nuxt-link v-if="isAuthenticated" class="linkz" to="/logout">Wyloguj</nuxt-link>
    </div>
  </div> 
  <nuxt-link v-if="!isAuthenticated" class="linkz" to="/login">Zaloguj</nuxt-link>
  <a href="javascript:void(0);" style="font-size:15px;" class="icon" @click="myFunction()">&#9776;</a>
</div>
  </header>
</template>

<script>
export default {
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
  },
  methods: {
    /* When the user clicks on the button, 
       toggle between hiding and showing the dropdown content */
    myFunction() {
      var x = document.getElementById("myTopnav");
      if (x.className === "topnav") {
        x.className += " responsive";
      } else {
        x.className = "topnav";
      }
    }
  }
};
</script>

<style scoped>
/* Add a black background color to the top navigation */
.topnav {
  background-color: #333;
  overflow: hidden;
}

/* Style the links inside the navigation bar */
.topnav a,
linkz {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

/* Add an active class to highlight the current page */
.nuxt-link-active {
  background-color: #4caf50;
  color: white;
}

.company {
  background-color: #024404;
  color: white;
}

/* Hide the link that should open and close the topnav on small screens */
.topnav .icon {
  display: none;
}

/* Dropdown container - needed to position the dropdown content */
.dropdown {
  float: left;
  overflow: hidden;
}

/* Style the dropdown button to fit inside the topnav */
.dropdown .dropbtn {
  font-size: 17px;
  border: none;
  outline: none;
  color: white;
  padding: 14px 16px;
  background-color: inherit;
  font-family: inherit;
  margin: 0;
}

/* Style the dropdown content (hidden by default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  min-width: 200px;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

/* Style the links inside the dropdown */
.dropdown-content a,
.dropdown-content linkz {
  float: none;
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  text-align: left;
}

/* Add a dark background on topnav links and the dropdown button on hover */
.topnav a:hover,
.topnav linkz:hover,
.dropdown:hover .dropbtn {
  background-color: #555;
  color: white;
}

/* Add a grey background to dropdown links on hover */
.dropdown-content a:hover,
.dropdown-content linkz:hover {
  background-color: #ddd;
  color: black;
}

/* Show the dropdown menu when the user moves the mouse over the dropdown button */
.dropdown:hover .dropdown-content {
  display: block;
}

/* When the screen is less than 600 pixels wide, hide all links, except for the first one ("Home"). Show the link that contains should open and close the topnav (.icon) */
@media screen and (max-width: 600px) {
  .topnav a:not(:first-child),
  .topnav linkz:not(:first-child) {
    display: none;
  }
  .topnav a.icon,
  .topnav linkz.icon {
    float: right;
    display: block;
  }
}

/* The "responsive" class is added to the topnav with JavaScript when the user clicks on the icon. This class makes the topnav look good on small screens (display the links vertically instead of horizontally) */
@media screen and (max-width: 600px) {
  .topnav.responsive {
    position: relative;
  }
  .topnav.responsive a.icon,
  .topnav.responsive linkz.icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a,
  .topnav.responsive linkz {
    float: none;
    display: block;
    text-align: left;
  }
  .topnav.responsive .dropdown {
    float: none;
  }
  .topnav.responsive .dropdown-content {
    position: relative;
  }
  .topnav.responsive .dropdown .dropbtn {
    display: block;
    width: 100%;
    text-align: left;
  }
}
</style>