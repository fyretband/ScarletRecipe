<script>
import { mapActions, mapState, mapWritableState } from 'pinia';
import { RouterLink } from 'vue-router'
import { useRecipeStore } from '../stores/counter';
export default {
  name: 'Navbar',
  data() {
    return {
      searchQuery: ''
    }
  },
  created() {
    this.checkState()
  },
  computed: {
    ...mapState(useRecipeStore, ['isLoggedIn']),
   
  },
  methods: {
    ...mapActions(useRecipeStore, ['handleLogout', 'filteredCategory', 'findByLetter','checkState','sendDonation']),
    handleSearch(letter) {
      this.findByLetter(letter);
      console.log('uda masuk ya')
    },
    
    
  }
}
</script>

<template>


<nav class="navbar navbar-inverse .navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>                        
      </button>
      <a @click.prevent="sendDonation()" class="navbar-brand" >Donate</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <li class=""><a href="/">Home</a></li>
        <li v-if="isLoggedIn">
        <a href="/recipe"> My Recipe</a>
          </li>
        <li v-if="isLoggedIn"><a href="/recipe/add">Create Your Own Recipe</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><form class="form-inline">
          <input v-model="searchQuery" class="form-control mr-sm-2" type="search" placeholder="Search Any Recipe">
          <button  @click.prevent="handleSearch(searchQuery)" class="searchbtn btn my-2 my-sm-0" type="submit">Search</button>
        </form></li>
        <li><a v-if="!isLoggedIn" href="/register"><span class="glyphicon glyphicon-user"></span> Sign Up</a></li>
        <li v-if="!isLoggedIn"><a href="/login"><span class="glyphicon glyphicon-log-in"></span> Login</a></li>
        <li><a @click.prevent="handleLogout" href="/login"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li>
      </ul>
    </div>
  </div>
</nav>
</template>
<style scoped>
 .navbar{
  background-color: transparent;
  border: 0;
  -webkit-box-shadow: none;
  box-shadow: none;
}

.navbar-inverse .navbar-brand {
    color: grey;
    font-size: large;
}

.navbar-inverse .navbar-brand:hover {
    color: #256b25;
    font-weight: bold;
}
/* toggle icon */
.navbar-inverse .navbar-toggle .icon-bar{
  background-color: grey;
}

/* toggle icon */
.navbar-inverse .navbar-toggle ,.navbar-inverse .navbar-toggle:focus {
  background-color: transparent;
  border-color: grey;
}

.navbar-inverse .navbar-toggle:hover{
  background-color: transparent;
  border-color: #a9e8a9;
}


/* collapse border */
.navbar-inverse .navbar-collapse, .navbar-inverse .navbar-form {
    border-color: grey;
}

/*navbar font color*/
.navbar-nav>li>a{
  color: grey;
  font-size: medium;
}

.navbar-nav>.active>a, .navbar-nav>.open>a {
    color: #256b25;
    background-color: transparent;
    font-weight: bold;
}

.navbar-nav>.active>a:focus{
  color: #256b25;
  background-color: transparent;
  font-weight: bold;
}

.navbar-nav>.active>a:hover {
    color:white;
    background-color: hsl(86, 85%, 95%);
}

.navbar-inverse .navbar-nav > li > a:hover, .navbar-inverse .navbar-nav > li > a:focus {
    color: #256b25;
    font-weight: bold;
}

.navbar-inverse .navbar-nav>.open>a, .navbar-inverse .navbar-nav>.open>a:focus, .navbar-inverse .navbar-nav>.open>a:hover {
    color: #256b25;
    background-color: transparent;
    font-weight: bold;
}

.dropdown-menu{
  border: none;
}


li.dropdown.open>ul.dropdown-menu>li>a{
  color: grey;
}

li.dropdown.open>ul.dropdown-menu>li>a:hover{
  color: #256b25;
  font-weight: bold;
  background-color: white;
}

li.dropdown.open>ul.dropdown-menu>li>a:focus, li.dropdown.open>ul.dropdown-menu>li>a:active{
  color: #256b25;
  font-weight: bold;
  background-color: white;
}

.form-inline {
  display: inline-block;
  padding: 10px;
}

.searchbtn{
  background-color: grey;
  color: white;
}

.searchbtn:hover{
  background-color: white;
  color: #256b25;
  font-weight: bold;
}
</style>