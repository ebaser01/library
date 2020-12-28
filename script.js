mymodal = document.getElementById('mymodal');

body = document.getElementsByTagName('body')[0];


document.getElementById('add-button').addEventListener('click', function(){

    mymodal.style.display = 'block';

})

window.onmousedown = function(event){
    if(event.target == mymodal){
        mymodal.style.display = 'none';
        
    }
}

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyACulQsS6spGz1Ap3XCEyY5RCdFm5wY9TY",
    authDomain: "form1-4b490.firebaseapp.com",
    projectId: "form1-4b490",
    storageBucket: "form1-4b490.appspot.com",
    messagingSenderId: "37546936438",
    appId: "1:37546936438:web:d665a334d9dd92b88d7757",
    measurementId: "G-0JWN70S8E9"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
