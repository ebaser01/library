
  // Set the configuration for your app
  // TODO: Replace with your project's config object
  var config = {
    apiKey: "AIzaSyACulQsS6spGz1Ap3XCEyY5RCdFm5wY9TY",
    authDomain: "form1-4b490.firebaseapp.com",
    databaseURL: "https://form1-4b490-default-rtdb.firebaseio.com/",
    storageBucket: "form1-4b490.appspot.com"
  };
  firebase.initializeApp(config);
  var ui = new firebaseui.auth.AuthUI(firebase.auth());
  // Get a reference to the database service
  
  
var messagesRef = firebase.database().ref('messages');



var uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      
      return false;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

// The start method will wait until the DOM is loaded.
ui.start('#firebaseui-auth-container', uiConfig);

mymodal = document.getElementById('mymodal');
lib = document.getElementById('lib');
const login = document.getElementById('login');


document.getElementById('add-button').addEventListener('click', function(){

    mymodal.style.display = 'block';

})

document.getElementById('addForm').addEventListener('submit',submitForm);

function submitForm(e){
  e.preventDefault();

  
  var title = getInputVal('title');
  var author = getInputVal('author');
  var pageNumber = getInputVal('pageNumber');
  var read = getInputVal('read');

  saveMessage(title,author,pageNumber,read);
  updateDisplay();
  
}

function getInputVal(id){
  return document.getElementById(id).value;
}

function saveMessage(title,author,pageNumber,read){
  var newMessageRef = messagesRef.push();
  newMessageRef.set({
    title: title,
    author:author,
    pageNumber:pageNumber,
    read:read
  });
}

window.onmousedown = function(event){
    if(event.target == mymodal){
        mymodal.style.display = 'none';
    }  
    
}

function updateDisplay(){
  lib.innerHTML = '';
  messagesRef.on("value", function(snapshot){
    
    snapshot.forEach(function (childSnapshot){

        var data = childSnapshot.val();
        
        var newBook = bookSkeleton;
        newBook.querySelector('.cardAuthor').innerHTML = data.author;
        newBook.querySelector('.cardTitle').innerHTML = data.title;
        newBook.querySelector('.cardpageNum').innerHTML = data.pageNumber;
        newBook.querySelector('.cardRead').innerHTML = data.read;
        lib.appendChild(newBook.cloneNode(true));
       
    })
  })

}

const bookSkeleton = document.createElement('div');
bookSkeleton.className = 'book';
const authorName = document.createElement('p');
authorName.className = 'cardAuthor';
const pTitle = document.createElement('p');
pTitle.className = 'cardTitle';
const pageNum = document.createElement('p');
pageNum.className = 'cardpageNum';
const readStatus = document.createElement('p');
readStatus.className = 'cardRead';
bookSkeleton.appendChild(pTitle);
bookSkeleton.appendChild(authorName);
bookSkeleton.appendChild(pageNum);
bookSkeleton.appendChild(readStatus);
console.log(bookSkeleton)



