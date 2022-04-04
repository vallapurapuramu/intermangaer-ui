<template>
    <b-container fluid class="container">
    
    
    <h4 style="text-align:center">Welcome to InternManager Application Registration using Github</h4>
    
    <div class="register">
     <h4 class="mt-3 text-center">Login With Githhub</h4>
     <hr class="mb-0" />

      <div class="content-container">
      <h2>Sorry User,</h2>
            <h4>We tried implementing login with Github using Auth0. But we couldnt able to do it  </h4>
            <p>
            <ul>
             <li>Inorder to process the request we required personal data of the user so we have used through registeration page</li>
              <li>We classify the there dashboard based upon the role which is not possible when considering with github authorization we can't do that .</li>
              <li>We have implement password encryption and decryption so there is no need to worry about the security</li>
              <li>while we are successful in implementing the functionality using Vue.js and Adonis.js libraries </li>
              </ul>
              
            </p>


            
      
      <h4>Test Credentails</h4>
      <pre>
      <p><u>Faculty Credentails</u></p>
      <b>Username:</b> faculty@gmail.com
      <b>Password:</b> 1234
      <p><u>Student Credentails</u></p>
      <b>Username:</b> student@gmail.com
      <b>Password:</b> 1234

      </pre>
      </div>
      <div class="btn-center">
      <a class="linkbtn" href="login#/login">Login <font-awesome-icon icon="user-plus" class="m-t-4" /></a>
</div>
    </div>
  
    </b-container>
   
</template>



<style scoped>
.register {
  border: 1px solid #ccc;
  border-radius: 10px;
  margin-bottom: 69px;
}

.m-t-4 {
  margin-top: 4px;
}

a.linkbtn {
    color: white;
    background: #007bff;
    padding: 6px;
    margin: 10px;
    border-radius: 4px;
}

.top-30 {
  margin-top: 10%;
  margin-bottom: 25px;
}
@media (min-width: 1025px) and (max-width: 1200px) {
  .top-30 {
    margin-bottom: 60px;
  }
}
</style>