<template>
  <div id="app">
  	
  	  <Login-page></Login-page>
      
  </div>
</template>

<script>
import Login from "./pages/Login.vue"
     export default{
     	 data(){
     	 	 return {
     	 	 	
     	 	 }
		  },
		  components: {
			  "Login-page" : Login

	      }
	 }
	 
</script>

<style scoped>


</style>
